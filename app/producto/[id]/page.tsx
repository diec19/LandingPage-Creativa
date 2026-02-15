'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Tag,
  Package,
  CheckCircle,
  XCircle,
  Share2,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Página de Detalle de Producto
 * Ruta: /producto/[id]
 * Estilo Mercado Libre con galería, descripción y productos relacionados
 */
export default function ProductoPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState('3764895527');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      loadProduct();
      loadSettings();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      // Cargar producto
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError) throw productError;
      setProduct(productData);

      // Cargar imágenes del producto
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', productId)
        .order('display_order');

      if (!imagesError && imagesData && imagesData.length > 0) {
        setImages(imagesData.map((img: any) => img.image_url));
      } else if (productData.image) {
        // Fallback a imagen principal si no hay en product_images
        setImages([productData.image]);
      }

      // Cargar productos relacionados (misma categoría)
      if (productData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .eq('stock', true)
          .neq('id', productId)
          .limit(4);

        if (!relatedError) {
          setRelatedProducts(relatedData || []);
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'whatsapp_number')
        .single();

      if (!error && data?.value) {
        setWhatsappNumber(data.value);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const generateWhatsAppMessage = () => {
    if (!product) return '';
    return encodeURIComponent(
      `Hola! Me interesa este producto:\n📦 ${product.name}\n💰 Precio: ${formatPrice(product.price)}\n\n¿Está disponible?`
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'Producto',
          text: `Mirá este producto: ${product?.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="h-20"></div>
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-logo-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="h-20"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">El producto que buscás no existe o fue eliminado.</p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-logo-purple text-white rounded-full font-semibold hover:bg-logo-purple-dark transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al Catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="h-20"></div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-logo-purple transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-logo-purple transition-colors">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            {/* Imagen Principal */}
            <div className="relative aspect-square bg-white rounded-2xl shadow-md overflow-hidden border-2 border-gray-100">
              <img
                src={images[selectedImageIndex] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {/* Navegación de imágenes */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === idx
                        ? 'border-logo-purple shadow-md scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del Producto */}
          <div className="space-y-6">
            {/* Categoría */}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-logo-purple" />
              <span className="text-sm font-medium text-logo-purple">{product.category}</span>
            </div>

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.stock ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">Disponible</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-600 font-medium">Sin Stock</span>
                </>
              )}
            </div>

            {/* Precio */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100">
              <p className="text-sm text-gray-600 mb-2">Precio</p>
              <p className="text-5xl font-bold text-logo-purple">{formatPrice(product.price)}</p>
            </div>

            {/* Descripción */}
            {product.description && (
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {/* Especificaciones */}
            {product.specifications && (
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Especificaciones</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.specifications}</p>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="space-y-3">
              {product.stock && (
                <WhatsAppButton
                  phoneNumber={whatsappNumber}
                  message={generateWhatsAppMessage()}
                  className="w-full bg-gradient-to-r from-logo-green to-logo-green-dark text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Consultar por WhatsApp
                </WhatsAppButton>
              )}

              <button
                onClick={handleShare}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-full hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Compartir Producto
              </button>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/producto/${relatedProduct.id}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-logo-green">
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={relatedProduct.image || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-logo-purple">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
