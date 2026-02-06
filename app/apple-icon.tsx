import { ImageResponse } from 'next/og'
 
// Tamaño específico para Apple (180x180)
export const size = {
  width: 180,
  height: 180,
}
 
export const contentType = 'image/png'
 
/**
 * Apple Touch Icon para Ilusión Creativa
 * Se usa en iPhone, iPad cuando se agrega a Home Screen
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: 'linear-gradient(135deg, #1ab5b5 0%, #33c2c2 50%, #4dcaca 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'system-ui, sans-serif',
          borderRadius: '40px',
          boxShadow: 'inset 0 4px 16px rgba(255,255,255,0.3)',
        }}
      >
        IC
      </div>
    ),
    {
      ...size,
    }
  )
}
