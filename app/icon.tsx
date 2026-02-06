import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
 
export const size = {
  width: 64,
  height: 64,
}
 
export const contentType = 'image/png'
 
export default async function Icon() {
  try {
    // Ruta absoluta más confiable para producción
    const imagePath = path.join(process.cwd(), 'public', 'logo.png')
    const imageBuffer = fs.readFileSync(imagePath)
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
     
            borderRadius: '16px',
            boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.3)',
          }}
        >
          <img
            src={base64Image}
            width="95"
            height="95"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Error loading icon:', error)
    // Fallback si falla
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            background: 'linear-gradient(135deg, #1ab5b5 0%, #4dcaca 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
          }}
        >
          💡
        </div>
      ),
      { ...size }
    )
  }
}