'use client';

import { Catalog } from '@/components/Catalog';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/**
 * Página de Catálogo Completo
 * Ruta: /catalogo
 * Muestra todos los productos con búsqueda y filtros
 */
export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Espaciador para el navbar fijo */}
      <div className="h-20"></div>
      
      <Catalog />
      
      <Footer />
    </main>
  );
}
