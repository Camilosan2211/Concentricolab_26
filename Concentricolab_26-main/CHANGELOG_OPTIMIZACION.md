# Concéntrico Lab — cambios de optimización

Fecha: 2026-09-21

## Cambios realizados
- Ajuste responsive del Hero para teléfonos: las tres composiciones conservan sus imágenes y ahora pueden replegarse dentro del ancho disponible.
- Reducción/adaptación de tipografía y espaciado del Hero en pantallas menores a 640 px.
- Formulario de contacto: Nombre + Email pasan a una columna en móvil y vuelven a dos columnas desde `sm`.
- Newsletter y formulario de proyecto ahora envían un asunto diferenciado a Formspree.
- Eliminada una constante de correo antigua que apuntaba a Gmail.
- Estabilidad de fondo oscuro en `html`, `body` y `#root`, incluyendo Safari/iOS mediante `color-scheme`.
- `theme-color` se actualiza según el modo oscuro/claro.
- Eliminado un `useEffect` duplicado del indicador de progreso.
- SEO: referencias públicas de `concentricolab.vercel.app` actualizadas a `https://concentricolab.com/` en canonical, Open Graph, Twitter y JSON-LD.
- Añadido `og:locale`.
- Añadidos ajustes para evitar overflow horizontal de textos/campos en móviles y respetar `prefers-reduced-motion`.

## Backup
El archivo `Concentricolab_26-original-backup.zip` conserva el ZIP original sin modificaciones.

## Nota de verificación
Se realizó una revisión estática de los archivos modificados. El build de Vite no pudo completarse en este entorno porque la instalación de dependencias (`npm ci`) no pudo descargar todas las dependencias del registro de npm dentro del entorno disponible. No se debe interpretar como un fallo del código.
