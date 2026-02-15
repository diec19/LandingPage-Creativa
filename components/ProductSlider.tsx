'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';
import Link from 'next/link';

/**
 * Slider de Productos Destacados para Landing
 * Muestra 6-8 productos (2-3 por categoría)
 * Click en producto lleva a página detalle
 */
export function ProductSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      // Obtener productos EN OFERTA con stock
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('stock', true)
        .gt('discount_percentage', 0)
        .order('discount_percentage', { ascending: false })
        .limit(8);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const calculateDiscount = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, products.length - 4) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= products.length - 4 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-white to-cream-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 border-4 border-logo-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // No mostrar si no hay productos
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-cream-100">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <Tag className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">¡Ofertas Especiales!</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">
            Productos en Oferta
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Aprovechá estos descuentos increíbles
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Botón Anterior */}
          {products.length > 4 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-logo-purple hover:text-white transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Grid de Productos */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] px-3"
                >
                  <Link href={`/producto/${product.id}`}>
                    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-logo-green cursor-pointer">
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
                          <div className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                            Ver más
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Siguiente */}
          {products.length > 4 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-logo-purple hover:text-white transition-all duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Indicadores */}
        {products.length > 4 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * 4)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 4) === idx
                    ? 'w-8 bg-logo-purple'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a grupo ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* CTA Ver Catálogo Completo */}
        <div className="text-center mt-12">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-logo-purple to-logo-purple-dark text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Tag className="w-5 h-5" />
            Ver Catálogo Completo
          </Link>
        </div>
      </div>
    </section>
  );
}
