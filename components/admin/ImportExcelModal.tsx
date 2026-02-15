'use client';

import { useState } from 'react';
import { Upload, Download, X, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

/**
 * Componente para importar productos desde Excel
 * Soporta validación, preview y carga masiva
 */
interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ProductRow {
  nombre: string;
  categoria: string;
  precio: number;
  descripcion?: string;
  stock?: string;
  imagen?: string;
}

export function ImportExcelModal({ isOpen, onClose, onSuccess }: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ProductRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseExcel(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))) {
      setFile(droppedFile);
      parseExcel(droppedFile);
    }
  };

  const parseExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as ProductRow[];
        
        setPreviewData(jsonData.slice(0, 5)); // Mostrar primeros 5
        setErrors([]);
      } catch (error) {
        setErrors(['Error al leer el archivo Excel. Verificá el formato.']);
      }
    };
    reader.readAsBinaryString(file);
  };

  const validateRow = (row: ProductRow): string | null => {
    if (!row.nombre || row.nombre.trim() === '') {
      return 'Nombre es obligatorio';
    }
    if (!row.categoria || row.categoria.trim() === '') {
      return 'Categoría es obligatoria';
    }
    if (!row.precio || isNaN(Number(row.precio))) {
      return 'Precio debe ser un número válido';
    }
    return null;
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setProgress(0);
    setErrors([]);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as ProductRow[];

          const validationErrors: string[] = [];
          const productsToInsert = [];

          for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const error = validateRow(row);
            
            if (error) {
              validationErrors.push(`Fila ${i + 2}: ${error}`);
            } else {
              productsToInsert.push({
                name: row.nombre.trim(),
                category: row.categoria.trim(),
                price: Number(row.precio),
                description: row.descripcion?.trim() || null,
                stock: row.stock?.toLowerCase() === 'si' || row.stock?.toLowerCase() === 'sí' || true,
                image: row.imagen?.trim() || null,
              });
            }
          }

          if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setImporting(false);
            return;
          }

          // Insertar productos en lotes de 10
          const batchSize = 10;
          for (let i = 0; i < productsToInsert.length; i += batchSize) {
            const batch = productsToInsert.slice(i, i + batchSize);
            const { error } = await supabase.from('products').insert(batch);
            
            if (error) throw error;
            
            setProgress(Math.round(((i + batch.length) / productsToInsert.length) * 100));
          }

          setSuccess(true);
          setTimeout(() => {
            onSuccess();
            onClose();
            resetModal();
          }, 2000);

        } catch (error: any) {
          setErrors([`Error al importar: ${error.message}`]);
        } finally {
          setImporting(false);
        }
      };
      reader.readAsBinaryString(file);
    } catch (error: any) {
      setErrors([`Error: ${error.message}`]);
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        nombre: 'Cuaderno Gloria A4',
        categoria: 'Cuadernos',
        precio: 3500,
        descripcion: 'Tapa dura, 100 hojas',
        stock: 'Si',
        imagen: 'https://ejemplo.com/imagen.jpg',
      },
      {
        nombre: 'Mochila Escolar',
        categoria: 'Mochilas',
        precio: 15000,
        descripcion: 'Grande, varios compartimentos',
        stock: 'Si',
        imagen: '',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos');
    XLSX.writeFile(wb, 'plantilla-productos.xlsx');
  };

  const resetModal = () => {
    setFile(null);
    setPreviewData([]);
    setErrors([]);
    setSuccess(false);
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-6 h-6 text-logo-green" />
            <h2 className="text-2xl font-bold text-gray-900">Importar desde Excel</h2>
          </div>
          <button
            onClick={() => {
              onClose();
              resetModal();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Botón de plantilla */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">
                  ¿Primera vez importando?
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Descargá la plantilla Excel con el formato correcto
                </p>
                <button
                  onClick={downloadTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
                >
                  Descargar Plantilla
                </button>
              </div>
            </div>
          </div>

          {/* Zona de carga */}
          {!file && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-logo-green transition-colors duration-300 cursor-pointer"
            >
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id="excel-upload"
              />
              <label htmlFor="excel-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click para seleccionar o arrastrá el archivo
                </p>
                <p className="text-sm text-gray-500">
                  Archivos Excel (.xlsx, .xls)
                </p>
              </label>
            </div>
          )}

          {/* Archivo seleccionado */}
          {file && !success && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-8 h-8 text-logo-green" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetModal}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview */}
              {previewData.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Vista previa (primeras 5 filas):
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Nombre</th>
                          <th className="px-3 py-2 text-left">Categoría</th>
                          <th className="px-3 py-2 text-left">Precio</th>
                          <th className="px-3 py-2 text-left">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, idx) => (
                          <tr key={idx} className="border-t border-gray-200">
                            <td className="px-3 py-2">{row.nombre}</td>
                            <td className="px-3 py-2">{row.categoria}</td>
                            <td className="px-3 py-2">${row.precio}</td>
                            <td className="px-3 py-2">{row.stock || 'Si'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Barra de progreso */}
              {importing && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Importando...
                    </span>
                    <span className="text-sm font-medium text-logo-green">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-logo-green h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Errores */}
              {errors.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-red-900 mb-2">
                        Errores encontrados:
                      </p>
                      <ul className="text-sm text-red-700 space-y-1">
                        {errors.slice(0, 10).map((error, idx) => (
                          <li key={idx}>• {error}</li>
                        ))}
                        {errors.length > 10 && (
                          <li className="font-medium">
                            ... y {errors.length - 10} errores más
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón importar */}
              {!importing && errors.length === 0 && (
                <button
                  onClick={handleImport}
                  className="w-full px-6 py-3 bg-gradient-to-r from-logo-green to-logo-green-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Importar Productos
                </button>
              )}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Importación Exitosa!
              </h3>
              <p className="text-gray-600">
                Los productos se agregaron correctamente
              </p>
            </div>
          )}

          {/* Instrucciones */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              📋 Formato del Excel:
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>nombre:</strong> Nombre del producto (obligatorio)</li>
              <li>• <strong>categoria:</strong> Categoría del producto (obligatorio)</li>
              <li>• <strong>precio:</strong> Precio en números (obligatorio)</li>
              <li>• <strong>descripcion:</strong> Descripción (opcional)</li>
              <li>• <strong>stock:</strong> "Si" o "No" (opcional, por defecto "Si")</li>
              <li>• <strong>imagen:</strong> URL de la imagen (opcional)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
