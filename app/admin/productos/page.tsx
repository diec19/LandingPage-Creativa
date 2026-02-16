'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { ImportExcelModal } from '@/components/admin/ImportExcelModal';
import { Pagination } from '@/components/Pagination';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowLeft,
  Upload,
  X,
  Check,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Página de Gestión de Productos
 * CRUD completo con subida de imágenes, importación masiva y paginación
 */
function ProductosContent() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    stock: true,
    image: '',
    discount_percentage: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('display_order');

      if (error) throw error;
      const cats = data?.map((c: any) => c.name) || [];
      setCategories(['Todos', ...cats]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image;

      // Subir imagen si hay una nueva
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = {
        ...formData,
        image: imageUrl,
      };

      if (editingProduct) {
        // Actualizar producto existente
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        alert('✅ Producto actualizado correctamente');
      } else {
        // Crear nuevo producto
        const { error } = await supabase.from('products').insert([productData]);

        if (error) throw error;
        alert('✅ Producto creado correctamente');
      }

      loadProducts();
      closeModal();
    } catch (error: any) {
      console.error('Error saving product:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || '',
      stock: product.stock,
      image: product.image || '',
      discount_percentage: product.discount_percentage || 0,
    });
    setImagePreview(product.image || '');
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (error) throw error;
      alert('✅ Producto eliminado');
      loadProducts();
    } catch (error: any) {
      alert('❌ Error: ' + error.message);
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[1] || '', // Primera categoría después de "Todos"
      price: 0,
      description: '',
      stock: true,
      image: '',
      discount_percentage: 0,
    });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview('');
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'Todos' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Calcular productos de la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Resetear a página 1 al cambiar búsqueda o filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-6 h-6 text-logo-purple" />
                  Gestión de Productos
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredProducts.length} productos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-logo-green to-logo-green-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FileSpreadsheet className="w-5 h-5" />
                Importar Excel
              </button>
              <button
                onClick={openNewProductModal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-logo-purple to-logo-purple-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Nuevo Producto
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Búsqueda y filtros */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-logo-purple focus:outline-none transition-colors duration-300"
              />
            </div>

            {/* Filtro categoría */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-logo-purple focus:outline-none transition-colors duration-300"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de productos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-logo-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No hay productos</p>
            <button
              onClick={openNewProductModal}
              className="mt-4 text-logo-purple hover:underline"
            >
              Agregar el primero
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-gray-100"
              >
                {/* Imagen */}
                <div className="aspect-square bg-gray-100 relative">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  {/* Badge de stock */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                      product.stock
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {product.stock ? 'Disponible' : 'Sin Stock'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-logo-purple bg-logo-purple/10 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-2xl font-bold text-logo-purple mb-4">
                    ${product.price.toLocaleString('es-AR')}
                  </p>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginación */}
        {!loading && filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            className="mt-8"
          />
        )}
      </main>

      {/* Modal de crear/editar producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Producto *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-logo-purple focus:outline-none transition-colors duration-300"
                    placeholder="Ej: Cuaderno Tapa Dura A4"
                  />
                </div>
              </div>

              {/* Categoría y Precio */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-logo-purple focus:outline-none transition-colors duration-300"
                    >
                      {categories
                        .filter((c) => c !== 'Todos')
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-logo-purple focus:outline-none transition-colors duration-300"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-logo-purple focus:outline-none transition-colors duration-300"
                  placeholder="Descripción breve del producto..."
                />
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.checked })
                    }
                    className="w-5 h-5 text-logo-purple rounded focus:ring-2 focus:ring-logo-purple"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Producto disponible en stock
                  </span>
                </label>
              </div>

              {/* Descuento/Oferta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descuento (% OFF) - Opcional
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount_percentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount_percentage: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300"
                    placeholder="0"
                  />
                  <span className="text-gray-600">% de descuento</span>
                  {formData.discount_percentage > 0 && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                      🔥 EN OFERTA
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Los productos con descuento aparecen en el slider de ofertas de la home
                </p>
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen del Producto
                </label>

                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                        setFormData({ ...formData, image: '' });
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-logo-purple transition-colors duration-300">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Click para subir imagen</p>
                    <p className="text-sm text-gray-400">PNG, JPG hasta 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-logo-purple to-logo-purple-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      {editingProduct ? 'Actualizar' : 'Crear'} Producto
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Importación Excel */}
      <ImportExcelModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSuccess={() => {
          loadProducts();
          setShowImportModal(false);
        }}
      />
    </div>
  );
}

export default function Productos() {
  return (
    <ProtectedRoute>
      <ProductosContent />
    </ProtectedRoute>
  );
}
