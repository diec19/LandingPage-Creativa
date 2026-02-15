'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Setting, Category } from '@/lib/supabase';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import {
  Settings as SettingsIcon,
  ArrowLeft,
  Save,
  Phone,
  MapPin,
  Tag,
  Plus,
  X,
  Edit2,
  Trash2,
  Clock,
  Type,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Página de Configuración del Sitio
 * Gestionar configuración general y categorías
 */
function ConfiguracionContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Settings
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');

  // Categorías
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    loadSettings();
    loadCategories();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('settings').select('*');

      if (error) throw error;

      const settingsMap: { [key: string]: string } = {};
      data?.forEach((setting: Setting) => {
        settingsMap[setting.key] = setting.value;
      });

      setWhatsappNumber(settingsMap['whatsapp_number'] || '');
      setBusinessName(settingsMap['business_name'] || '');
      setAddress(settingsMap['address'] || '');
      setHeroTitle(settingsMap['hero_title'] || '');
      setHeroSubtitle(settingsMap['hero_subtitle'] || '');
    } catch (error) {
      console.error('Error loading settings:', error);
      alert('Error al cargar configuración');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from('settings')
      .update({ value })
      .eq('key', key);

    if (error) throw error;
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateSetting('whatsapp_number', whatsappNumber),
        updateSetting('business_name', businessName),
        updateSetting('address', address),
        updateSetting('hero_title', heroTitle),
        updateSetting('hero_subtitle', heroSubtitle),
      ]);

      alert('✅ Configuración guardada correctamente');
    } catch (error: any) {
      console.error('Error saving settings:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const maxOrder =
        categories.length > 0
          ? Math.max(...categories.map((c) => c.display_order))
          : 0;

      const { error } = await supabase.from('categories').insert([
        {
          name: newCategoryName.trim(),
          display_order: maxOrder + 1,
        },
      ]);

      if (error) throw error;

      setNewCategoryName('');
      loadCategories();
      alert('✅ Categoría agregada');
    } catch (error: any) {
      alert('❌ Error: ' + error.message);
    }
  };

  const handleEditCategory = async (id: number) => {
    if (!editCategoryName.trim()) return;

    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: editCategoryName.trim() })
        .eq('id', id);

      if (error) throw error;

      setEditingCategory(null);
      setEditCategoryName('');
      loadCategories();
      alert('✅ Categoría actualizada');
    } catch (error: any) {
      alert('❌ Error: ' + error.message);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);

      if (error) throw error;

      loadCategories();
      alert('✅ Categoría eliminada');
    } catch (error: any) {
      alert('❌ Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <SettingsIcon className="w-6 h-6 text-turquoise-500" />
                  Configuración
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Ajustes generales del sitio
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-turquoise-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando configuración...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Información del Negocio */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-turquoise-500" />
                Información del Negocio
              </h2>

              <div className="space-y-4">
                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-500 focus:outline-none transition-colors duration-300"
                      placeholder="3764895527"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sin espacios ni guiones. Ej: 3764895527
                  </p>
                </div>

                {/* Nombre del negocio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Negocio
                  </label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-500 focus:outline-none transition-colors duration-300"
                      placeholder="Ilusión Creativa"
                    />
                  </div>
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-500 focus:outline-none transition-colors duration-300"
                      placeholder="Cancharana 5067, Itaembé Guazú"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Textos del Hero */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Type className="w-5 h-5 text-turquoise-500" />
                Textos de la Página Principal
              </h2>

              <div className="space-y-4">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-500 focus:outline-none transition-colors duration-300"
                    placeholder="Ilusión Creativa"
                  />
                </div>

                {/* Subtítulo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-500 focus:outline-none transition-colors duration-300"
                    placeholder="Artículos escolares y personalizados"
                  />
                </div>
              </div>
            </div>

            {/* Botón guardar */}
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="w-full px-6 py-4 bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Configuración
                </>
              )}
            </button>

            {/* Gestión de Categorías */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Tag className="w-5 h-5 text-turquoise-500" />
                Categorías de Productos
              </h2>

              {/* Agregar nueva categoría */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise-500 focus:outline-none transition-colors duration-300"
                  placeholder="Nueva categoría..."
                />
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-turquoise-500 text-white rounded-xl font-semibold hover:bg-turquoise-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Agregar
                </button>
              </div>

              {/* Lista de categorías */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    {editingCategory === category.id ? (
                      <>
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-turquoise-500 rounded-lg focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditCategory(category.id)}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(null);
                            setEditCategoryName('');
                          }}
                          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="flex-1 font-medium text-gray-700">
                          {category.name}
                        </span>
                        <button
                          onClick={() => {
                            setEditingCategory(category.id);
                            setEditCategoryName(category.name);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Nota */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                💡 <strong>Nota:</strong> Los cambios en la configuración se
                aplican inmediatamente en el sitio web.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Configuracion() {
  return (
    <ProtectedRoute>
      <ConfiguracionContent />
    </ProtectedRoute>
  );
}
