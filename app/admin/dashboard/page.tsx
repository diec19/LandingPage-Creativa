'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import {
  Package,
  Image,
  Settings,
  LogOut,
  TrendingUp,
  ShoppingBag,
  Eye,
  Plus,
} from 'lucide-react';

/**
 * Dashboard Principal del Admin
 * Ruta: /admin/dashboard
 */
function DashboardContent() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    productsInStock: 0,
    totalGalleryItems: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      // Obtener usuario actual
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email || '');

      // Obtener estadísticas
      const [products, gallery, categories] = await Promise.all([
        supabase.from('products').select('id, stock', { count: 'exact' }),
        supabase.from('gallery').select('id', { count: 'exact' }),
        supabase.from('categories').select('id', { count: 'exact' }),
      ]);

      setStats({
        totalProducts: products.count || 0,
        productsInStock: products.data?.filter((p) => p.stock).length || 0,
        totalGalleryItems: gallery.count || 0,
        totalCategories: categories.count || 0,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const menuItems = [
    {
      title: 'Productos',
      icon: Package,
      href: '/admin/productos',
      color: 'from-logo-purple to-logo-purple-dark',
      description: 'Gestionar catálogo',
    },
    {
      title: 'Galería',
      icon: Image,
      href: '/admin/galeria',
      color: 'from-logo-green to-logo-green-dark',
      description: 'Fotos de trabajos',
    },
    {
      title: 'Configuración',
      icon: Settings,
      href: '/admin/configuracion',
      color: 'from-turquoise-500 to-turquoise-600',
      description: 'Ajustes generales',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="font-logo" style={{ color: '#a3d977' }}>
                  Ilusión
                </span>
                <span className="font-creativa ml-2" style={{ color: '#9b6bb5' }}>
                  CREATIVA
                </span>
              </h1>
              <p className="text-sm text-gray-600 mt-1">Panel de Administración</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600">{userEmail}</p>
                <p className="text-xs text-gray-400">Administrador</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido al Dashboard!
          </h2>
          <p className="text-gray-600">
            Aquí podés gestionar todos los aspectos de tu tienda online
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100 hover:border-logo-purple hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-logo-purple" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Productos</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100 hover:border-logo-green hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="w-8 h-8 text-logo-green" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-600 mb-1">En Stock</p>
            <p className="text-3xl font-bold text-gray-900">{stats.productsInStock}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100 hover:border-turquoise-500 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Image className="w-8 h-8 text-turquoise-500" />
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Fotos Galería</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalGalleryItems}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-100 hover:border-soft-pink-400 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-soft-pink-400" />
              <span className="text-xs font-medium text-gray-500">TOTAL</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Categorías</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
          </div>
        </div>

        {/* Menú de acciones principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.href)}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>

              <div className="absolute bottom-0 right-0 p-4">
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Acciones rápidas */}
        <div className="bg-gradient-to-r from-logo-green/10 via-turquoise-50 to-logo-purple/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/admin/productos?action=new')}
              className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 text-left"
            >
              <Plus className="w-5 h-5 text-logo-purple" />
              <span className="font-medium text-gray-700">Agregar Producto</span>
            </button>

            <button
              onClick={() => router.push('/admin/galeria?action=upload')}
              className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 text-left"
            >
              <Plus className="w-5 h-5 text-logo-green" />
              <span className="font-medium text-gray-700">Subir Foto</span>
            </button>

            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 text-left"
            >
              <Eye className="w-5 h-5 text-turquoise-500" />
              <span className="font-medium text-gray-700">Ver Sitio Web</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
