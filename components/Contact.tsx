'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Mail, Heart } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { supabase } from '@/lib/supabase';

/**
 * Componente Contact - Sección de contacto e información de la librería
 * Incluye dirección, teléfono, horarios y botón de WhatsApp
 * Conectado a Supabase para configuración dinámica
 */
export function Contact() {
  const [whatsappNumber, setWhatsappNumber] = useState('3764895527');
  const [address, setAddress] = useState('Cancharana 5067, Itaembé Guazú');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['whatsapp_number', 'address']);

      if (error) throw error;

      const settingsMap: { [key: string]: string } = {};
      data?.forEach((setting) => {
        settingsMap[setting.key] = setting.value;
      });

      if (settingsMap['whatsapp_number']) setWhatsappNumber(settingsMap['whatsapp_number']);
      if (settingsMap['address']) setAddress(settingsMap['address']);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const whatsappMessage = encodeURIComponent('¡Hola! Quisiera hacer una consulta 😊');
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="contacto" className="py-20 px-4 bg-gradient-to-br from-turquoise-500 via-turquoise-400 to-turquoise-600 text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-pastel-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-soft-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            ¡Visitanos o contactanos!
          </h2>
          <p className="text-xl text-turquoise-50 max-w-2xl mx-auto">
            Estamos para ayudarte con todo lo que necesités
          </p>
        </div>

        {/* Contenedor principal */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Columna 1: Información de contacto */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Dirección */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Dirección</h3>
                  <p className="text-turquoise-50 mb-3">
                    Cancharana 5067, Itaembé Guazú
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-white text-turquoise-600 px-4 py-2 rounded-full font-medium hover:bg-turquoise-50 transition-all duration-300 hover:scale-105"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Teléfono / WhatsApp */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Teléfono / WhatsApp</h3>
                  <p className="text-turquoise-50 mb-3 text-2xl font-bold">
                    3764895527
                  </p>
                  <WhatsAppButton
                    phoneNumber={whatsappNumber}
                    message={whatsappMessage}
                    className="inline-flex items-center gap-2 text-sm bg-white text-turquoise-600 px-4 py-2 rounded-full font-medium hover:bg-turquoise-50 transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar mensaje
                  </WhatsAppButton>
                </div>
              </div>
            </div>

            {/* Horarios (opcional - modificá según tus horarios) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Horarios</h3>
                  <div className="text-turquoise-50 space-y-1">
                    <p>Lunes a Viernes: 8:00 - 20:00</p>
                    <p>Sábados: 9:00 - 13:00</p>
                    <p className="text-sm mt-2 italic">
                      Consultá por horarios especiales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: CTA principal y características */}
          <div className="flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Tarjeta principal */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-turquoise-400 to-turquoise-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  ¡Respondemos al instante!
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  Mandanos tu lista
                </h3>
                <p className="text-gray-600 mb-6">
                  Te pasamos presupuesto sin cargo y te asesoramos con todo lo que necesitás
                </p>
              </div>

              {/* Botón principal de WhatsApp */}
              <WhatsAppButton
                phoneNumber={whatsappNumber}
                message={whatsappMessage}
                className="w-full group bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white px-8 py-5 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mb-6"
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                Abrir WhatsApp
              </WhatsAppButton>

              {/* Características */}
              <div className="space-y-3">
                {[
                  '✅ Respuesta rápida',
                  '✅ Presupuesto sin cargo',
                  '✅ Asesoramiento personalizado',
                  '✅ Productos de calidad',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-700 bg-gray-50 px-4 py-3 rounded-xl"
                  >
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mensaje adicional */}
            <div className="mt-6 text-center">
              <p className="text-turquoise-50 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-current" />
                Atendemos con amor y dedicación
              </p>
            </div>
          </div>
        </div>

        {/* Nota final */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4">
            <p className="text-lg">
              <Mail className="inline w-5 h-5 mr-2" />
              ¿Preferís otro medio? Consultanos por cualquier canal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
