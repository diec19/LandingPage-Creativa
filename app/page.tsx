import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PhotoSlider } from '@/components/PhotoSlider';
import { Services } from '@/components/Services';
import { ProductSlider } from '@/components/ProductSlider';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

/**
 * Página principal de la landing page
 * Integra todos los componentes en el orden correcto
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Barra de navegación */}
      <Navbar />

      {/* Sección Hero */}
      <Hero />

      {/* Slider de Fotos */}
      <PhotoSlider />

      {/* Sección de Servicios */}
      <Services />

      {/* Slider de Productos Destacados */}
      <ProductSlider />

      {/* Galería de Trabajos */}
      <Gallery />

      {/* Sección de Contacto */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
