'use client';

import { useState, useEffect } from 'react';
import { Search, Tag, Package, Eye } from 'lucide-react';
import { Pagination } from './Pagination';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/lib/supabase';
import Link from 'next/link';

/**
 * Componente Catalog - Catálogo de productos con precios
 * Incluye búsqueda, filtros por categoría, paginación
 * Click en producto lleva a página de detalle
 */
export function Catalog() {
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
            Explorá nuestro catálogo completo
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
              <Link key={product.id} href={`/producto/${product.id}`}>
                <div
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-logo-green cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Imagen */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badge de OFERTA */}
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
                        -{product.discount_percentage}%
                      </div>
                    )}

                    {/* Badge de categoría */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-logo-purple text-white text-xs font-bold rounded-full">
                      {product.category}
                    </div>

                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Eye className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-semibold">Ver Detalles</p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                      {product.description || 'Ver más detalles'}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Precio</p>
                        {product.discount_percentage && product.discount_percentage > 0 ? (
                          <div>
                            <p className="text-sm text-gray-400 line-through">
                              {formatPrice(product.price)}
                            </p>
                            <p className="text-2xl font-bold text-red-600">
                              {formatPrice(calculateDiscount(product.price, product.discount_percentage))}
                            </p>
                          </div>
                        ) : (
                          <p className="text-2xl font-bold text-logo-purple">
                            {formatPrice(product.price)}
                          </p>
                        )}
                      </div>
                      <div className="px-3 py-1 bg-logo-green/10 text-logo-green text-xs font-bold rounded-full">
                        Ver más
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
      </div>
    </section>
  );
}