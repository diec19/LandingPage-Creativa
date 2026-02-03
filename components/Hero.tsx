'use client';

import { MessageCircle, Sparkles, Star } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { useEffect, useState } from 'react';


/**
 * Componente Hero - Sección principal de la landing page
 * Incluye el título principal, subtítulo y CTA para WhatsApp
 */
export function Hero() {
  const whatsappNumber = '3764895527';
  const whatsappMessage = encodeURIComponent('¡Hola! Me gustaría consultar sobre artículos escolares 📚');
   
  const words = ['Arte', 'Juguetería', 'Personalizados', 'Escolar'];
const [text, setText] = useState('');
const [wordIndex, setWordIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);

useEffect(() => {
  const currentWord = words[wordIndex];

  if (charIndex < currentWord.length) {
    const timeout = setTimeout(() => {
      setText(prev => prev + currentWord[charIndex]);
      setCharIndex(charIndex + 1);
    }, 120);

    return () => clearTimeout(timeout);
  } else {
    const pause = setTimeout(() => {
      setText('');
      setCharIndex(0);
      setWordIndex((wordIndex + 1) % words.length);
    }, 1500);

    return () => clearTimeout(pause);
  }
}, [charIndex, wordIndex]);


  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Estrellas flotantes */}
        <Star className="absolute top-20 left-10 w-8 h-8 text-pastel-yellow-400 animate-float opacity-70" fill="currentColor" />
        <Star className="absolute top-40 right-20 w-6 h-6 text-soft-pink-400 animate-bounce-slow opacity-60" fill="currentColor" />
        <Star className="absolute bottom-32 left-1/4 w-5 h-5 text-turquoise-400 animate-float opacity-50" fill="currentColor" />
        <Sparkles className="absolute top-1/3 right-1/3 w-10 h-10 text-pastel-yellow-300 animate-pulse opacity-40" />
        
        {/* Círculos decorativos */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-turquoise-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-soft-pink-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in-up">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-md border-2 border-turquoise-200">
          <Sparkles className="w-4 h-4 text-turquoise-500" />
          <span className="text-sm font-medium text-turquoise-700">
            Tu librería de confianza en Itaembé Guazú
          </span>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="block text-turquoise-600 text-shadow">
            
          </span>
          <span className="block font-logo bg-gradient-to-r from-pastel-yellow-500 via-soft-pink-400 to-turquoise-500 bg-clip-text text-transparent animate-fade-in">
            Ilusión Creativa
          </span>
         
        </h1>
        <h3 className="text-4xl font-bold mb-6">
        {/*<span className="text-turquoise-700">Arte & </span>*/}
        <span className="text-turquoise-700">
          {text}
          <span className="animate-pulse">|</span>
        </span>
      </h3>

        {/* Subtítulo */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-8 font-medium max-w-3xl mx-auto">
          Artículos escolares y personalizados
          <span className="block mt-2 text-lg sm:text-xl text-turquoise-600">
            ✨ Todo lo que necesitás para el cole ✨
          </span>
        </p>

        {/* Características rápidas */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['Útiles escolares', 'Fotocopias', 'Artículos personalizados', 'Presupuesto sin cargo'].map((item, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-cream-400 text-turquoise-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA Principal */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <WhatsAppButton
            phoneNumber={whatsappNumber}
            message={whatsappMessage}
            className="group px-8 py-4 bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
            Mandanos tu lista por WhatsApp
          </WhatsAppButton>

          {/* Botón secundario */}
          <a
            href="#contacto"
            className="px-8 py-4 bg-white text-turquoise-600 rounded-full font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-turquoise-200"
          >
            Ver información
          </a>
        </div>

        {/* Nota adicional */}
        <p className="mt-8 text-sm text-gray-600 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Respondemos rápido por WhatsApp
        </p>
      </div>

      {/* Ilustración decorativa (lápiz) - solo visible en desktop */}
      <div className="hidden lg:block absolute bottom-10 left-10 animate-float">
        <div className="w-24 h-32 bg-pastel-yellow-400 rounded-t-full rounded-b-lg shadow-lg transform -rotate-12 relative">
          <div className="absolute bottom-0 w-full h-8 bg-soft-pink-400 rounded-b-lg"></div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
