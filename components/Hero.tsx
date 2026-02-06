'use client';

import { MessageCircle, Sparkles, Star } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { useEffect, useState } from 'react';

/**
 * Componente Hero - Sección principal de la landing page
 * Incluye el título principal, subtítulo y CTA para WhatsApp
 * Con efecto de typing automático en el subtítulo
 */
export function Hero() {
  const whatsappNumber = '3764895527';
  const whatsappMessage = encodeURIComponent('¡Hola! Me gustaría consultar sobre artículos escolares 📚');
   
  // Efecto de typing automático
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
  }, [charIndex, wordIndex, words]);

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

      {/* Título principal - Estilo logo con Pacifico */}

        <h1 className="font-bold mb-6 leading-tight">
          {/* Ilusión - MÁS GRANDE en verde lima */}
          <span className="block font-logo text-6xl sm:text-7xl md:text-8xl lg:text-9xl animate-fade-in relative" style={{ color: '#a3d977' }}>
            Ilus
            {/* La i sin punto + foquito de corazón */}
            <span className="relative inline-block">
              <span style={{ fontFamily: 'Pacifico', fontSize: 'inherit' }}>ı</span>{/* i sin punto */}
              {/* Foquito de corazón flotante en el punto de la i */}
              <span className="absolute -top-2 sm:-top-3 md:-top-4 lg:-top-5 left-1/2 -translate-x-1/2 animate-float" style={{ marginLeft: '-0.5cm' }}>
                <svg 
                  width="32" 
                  height="40" 
                  viewBox="0 0 24 32" 
                  fill="none" 
                  className="drop-shadow-lg sm:w-[40px] sm:h-[50px] md:w-[48px] md:h-[60px] lg:w-[56px] lg:h-[70px]"
                >
                  {/* Corazón morado/lila */}
                  <path 
                    d="M18.84 4.61a4.5 4.5 0 0 0-6.36 0L12 5.09l-.48-.48a4.5 4.5 0 0 0-6.36 6.36l.48.48L12 17.81l6.36-6.36.48-.48a4.5 4.5 0 0 0 0-6.36z" 
                    fill="#9b6bb5"
                    stroke="#8b5ba5"
                    strokeWidth="3"
                  />
                  {/* Corazón interno (blanco) */}
                  <path 
                    d="M12 7c-1-1-2.5-1-3.5 0-.8.8-.8 2 0 2.8L12 13l3.5-3.2c.8-.8.8-2 0-2.8-1-1-2.5-1-3.5 0z" 
                    fill="white"
                  />
                  {/* Base del foquito (verde lima) - MÁS PEGADA AL CORAZÓN */}
                 
                  <line x1="8" y1="21" x2="16" y2="21" stroke="#a3d977" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="9" y1="23" x2="15" y2="23" stroke="#a3d977" strokeWidth="2" strokeLinecap="round" />
                  <line x1="11" y1="25" x2="13" y2="25" stroke="#a3d977" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </span>
            ón
          </span>
          
          {/* CREATIVA - más chica en morado */}
          <span className="block font-creativa text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase mt-2" style={{ color: '#9b6bb5' }}>
            CREATIVA
          </span>
        </h1>

        {/* Subtítulo con efecto typing */}
        <h3 className="text-3xl sm:text-4xl font-bold mb-6 min-h-[3rem]">
          <span className="text-turquoise-700">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h3>

        {/* Descripción */}
        <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium max-w-3xl mx-auto">
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