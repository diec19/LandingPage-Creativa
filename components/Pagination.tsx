'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Componente de Paginación Reutilizable
 * Calcula automáticamente páginas y muestra controles
 */
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // No mostrar paginación si hay 1 página o menos
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Mostrar todas las páginas si son 7 o menos
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con ...
      if (currentPage <= 3) {
        // Principio: 1 2 3 4 ... 10
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Final: 1 ... 7 8 9 10
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Medio: 1 ... 4 5 6 ... 10
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Botón Anterior */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white border-2 border-gray-200 hover:border-logo-purple hover:bg-logo-purple/5 disabled:hover:border-gray-200 disabled:hover:bg-white"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === page
                  ? 'bg-logo-purple text-white shadow-md scale-110'
                  : 'bg-white border-2 border-gray-200 hover:border-logo-purple hover:bg-logo-purple/5'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white border-2 border-gray-200 hover:border-logo-purple hover:bg-logo-purple/5 disabled:hover:border-gray-200 disabled:hover:bg-white"
        aria-label="Página siguiente"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
