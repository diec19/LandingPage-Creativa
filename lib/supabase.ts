import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de base de datos
export type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string | null
  description: string | null
  stock: boolean
  created_at: string
  updated_at: string
}

export type Category = {
  id: number
  name: string
  display_order: number
  created_at: string
}

export type GalleryItem = {
  id: number
  title: string
  category: string | null
  image: string
  description: string | null
  created_at: string
}

export type Setting = {
  id: number
  key: string
  value: string
  updated_at: string
}
