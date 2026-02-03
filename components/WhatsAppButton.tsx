'use client';

import { ReactNode } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Componente WhatsAppButton - Botón reutilizable para abrir WhatsApp
 * @param phoneNumber - Número de teléfono sin espacios ni símbolos
 * @param message - Mensaje predefinido (opcional)
 * @param children - Contenido del botón
 * @param className - Clases adicionales de Tailwind
 */
export function WhatsAppButton({ 
  phoneNumber, 
  message = '', 
  children, 
  className = '' 
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${message}` : ''}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
