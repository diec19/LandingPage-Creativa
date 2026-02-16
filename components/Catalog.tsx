'use client';

import { useState, useEffect } from 'react';
import { Search, MessageCircle, Tag, Package } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { Pagination } from './Pagination';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/lib/supabase';

/**
 * Componente Catalog - Catálogo de productos con precios
 * Incluye búsqueda, filtros por categoría, paginación y botón de consulta por WhatsApp
 * Conectado a Supabase para mostrar productos reales
 */
export function Catalog() {
  const [whatsappNumber, setWhatsappNumber] = useState('3764895527');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadSettings();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
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
      const cats = data?.map((c: Category) => c.name) || [];
      setCategories(['Todos', ...cats]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'whatsapp_number')
        .single();

      if (error) throw error;
      if (data?.value) setWhatsappNumber(data.value);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calcular productos de la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Resetear a página 1 al cambiar búsqueda o filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Función para generar mensaje de WhatsApp personalizado
  const generateWhatsAppMessage = (productName: string, productPrice: number) => {
    return encodeURIComponent(
      `Hola! Me interesa el producto:\n📦 ${productName}\n💰 Precio: $${productPrice.toLocaleString('es-AR')}\n\n¿Está disponible?`
    );
  };

  // Formatear precio en pesos argentinos
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const calculateDiscount = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  return (
    <section id="catalogo" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-logo-green/10 rounded-full mb-4">
            <Package className="w-5 h-5 text-logo-green" />
            <span className="text-sm font-medium text-logo-green-dark">Catálogo Online</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-logo-purple mb-4">
            Nuestros Productos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorá nuestro catálogo y consultá por WhatsApp
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-logo-green via-turquoise-400 to-logo-purple mx-auto rounded-full"></div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="mb-8 space-y-4">
          {/* Buscador */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-logo-green focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-logo-purple text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de productos */}
        <p className="text-center text-gray-600 mb-6">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>

        {/* Grid de productos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-logo-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">
              {searchTerm || selectedCategory !== 'Todos' 
                ? 'No se encontraron productos que coincidan con tu búsqueda'
                : 'No hay productos disponibles en este momento'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
              }}
              className="mt-4 px-6 py-2 bg-logo-purple text-white rounded-full hover:bg-logo-purple-dark transition-colors duration-300"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-logo-green animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Imagen del producto */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Badge de OFERTA */}
                  {product.discount_percentage && product.discount_percentage > 0 && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-10">
                      -{product.discount_percentage}% OFF
                    </div>
                  )}
                  
                  {/* Badge de stock */}
                  {product.stock ? (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Disponible
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Sin Stock
                    </div>
                  )}
                  {/* Badge de categoría */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-logo-purple text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {product.category}
                  </div>
                </div>

                {/* Información del producto */}
                <div className="p-4">
                  {/* Nombre */}
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  {/* Descripción */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description || 'Sin descripción'}
                  </p>

                  {/* Precio */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Precio</p>
                      {product.discount_percentage && product.discount_percentage > 0 ? (
                        <div>
                          <p className="text-sm text-gray-400 line-through">
                            {formatPrice(product.price)}
                          </p>
                          <p className="text-2xl font-bold text-red-600">
                            {formatPrice(calculateDiscount(product.price, product.discount_percentage))}
                          </p>
                          <p className="text-xs text-green-600 font-medium">
                            Ahorrás {formatPrice(product.price - calculateDiscount(product.price, product.discount_percentage))}
                          </p>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold text-logo-purple">
                          {formatPrice(product.price)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Botón de consulta por WhatsApp */}
                  <WhatsAppButton
                    phoneNumber={whatsappNumber}
                    message={generateWhatsAppMessage(product.name, product.price)}
                    className={`w-full font-semibold py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                      product.stock
                        ? 'bg-gradient-to-r from-logo-green to-logo-green-dark text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 group-hover/btn:animate-bounce" />
                    {product.stock ? 'Consultar por WhatsApp' : 'Sin Stock'}
                  </WhatsAppButton>
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
            className="mt-12"
          />
        )}

        {/* CTA final */}
        <div className="mt-16 text-center bg-gradient-to-r from-logo-green/10 via-turquoise-50 to-logo-purple/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            ¿No encontraste lo que buscás?
          </h3>
          <p className="text-gray-600 mb-6">
            Consultanos directamente y te ayudamos a encontrar el producto perfecto
          </p>
          <WhatsAppButton
            phoneNumber={whatsappNumber}
            message={encodeURIComponent('Hola! Estoy buscando un producto que no vi en el catálogo. ¿Me pueden ayudar?')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-logo-purple text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Contactar por WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
