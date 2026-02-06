'use client';

import { ReactNode } from 'react';

interface InstagramButtonProps {
  username: string;
  children: ReactNode;
  className?: string;
}

/**
 * Componente InstagramButton - Botón reutilizable para abrir Instagram
 * @param username - Nombre de usuario de Instagram (sin @)
 * @param children - Contenido del botón
 * @param className - Clases adicionales de Tailwind
 */
export function InstagramButton({ 
  username, 
  children, 
  className = '' 
}: InstagramButtonProps) {
  const instagramUrl = `https://www.instagram.com/${username}`;

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}