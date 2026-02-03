'use client';

import { 
  BookOpen, 
  Printer, 
  Palette, 
  BadgeDollarSign,
  Pencil,
  Scissors,
  Shapes
} from 'lucide-react';

/**
 * Componente Services - Muestra los servicios principales de la librería
 * Incluye tarjetas interactivas con iconos y descripciones
 */
export function Services() {
  const services = [
    {
      icon: BookOpen,
      title: 'Útiles Escolares',
      description: 'Todo lo que necesitás para el cole: cuadernos, lápices, cartucheras, mochilas y más.',
      color: 'from-turquoise-400 to-turquoise-500',
      bgColor: 'bg-turquoise-50',
      iconColor: 'text-turquoise-600',
    },
    {
      icon: Printer,
      title: 'Fotocopias',
      description: 'Servicio de fotocopias e impresiones rápidas y de calidad para tus trabajos.',
      color: 'from-pastel-yellow-400 to-pastel-yellow-500',
      bgColor: 'bg-pastel-yellow-50',
      iconColor: 'text-pastel-yellow-700',
    },
    {
      icon: Palette,
      title: 'Artículos Personalizados',
      description: 'Personalizamos tus artículos: cuadernos, agendas, cartucheras y mucho más.',
      color: 'from-soft-pink-400 to-soft-pink-500',
      bgColor: 'bg-soft-pink-50',
      iconColor: 'text-soft-pink-600',
    },
    {
      icon: BadgeDollarSign,
      title: 'Presupuesto Sin Cargo',
      description: 'Mandanos tu lista y te pasamos presupuesto sin ningún compromiso.',
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  // Servicios adicionales (más pequeños)
  const additionalServices = [
    { icon: Pencil, text: 'Artículos de arte' },
    { icon: Scissors, text: 'Material didáctico' },
    { icon: Shapes, text: 'Juguetes educativos' },
  ];

  return (
    <section id="servicios" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-turquoise-600 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitás en un solo lugar
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-turquoise-400 via-pastel-yellow-400 to-soft-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Grid de servicios principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-turquoise-200 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradiente de fondo en hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
              
              {/* Contenido */}
              <div className="relative z-10">
                {/* Ícono */}
                <div className={`${service.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Decoración esquina */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-full h-full bg-gradient-to-br ${service.color} rounded-full blur-md`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Servicios adicionales */}
        <div className="bg-gradient-to-r from-turquoise-50 via-pastel-yellow-50 to-soft-pink-50 rounded-3xl p-8 shadow-inner">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Y también tenemos...
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <service.icon className="w-5 h-5 text-turquoise-600" />
                <span className="font-medium text-gray-700">{service.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA de sección */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-4">
            ¿Necesitás algo específico?
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-turquoise-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-turquoise-600 transition-all duration-300"
          >
            Consultanos sin compromiso
          </a>
        </div>
      </div>
    </section>
  );
}
