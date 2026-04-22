# Concéntrico Lab — Web v2

**Stack:** React 18 · Vite · Tailwind CSS · React Three Fiber · GSAP · Lenis · Framer Motion · Lucide React

## Instalación y desarrollo

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # → /dist listo para Vercel
```

## Deploy en Vercel

1. Conecta el repo en vercel.com
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

El archivo `vercel.json` ya está incluido para manejar el enrutamiento SPA.

## Assets requeridos

Coloca estos archivos en `/public/assets/images/` antes de hacer deploy:

| Archivo         | Descripción                     |
|-----------------|---------------------------------|
| `logo.png`      | Logo principal Concéntrico Lab  |
| `favicon.png`   | Favicon (32×32 o 64×64)         |
| `og-image.png`  | Open Graph (1200×630)           |

## Novedades v2

- **Light / Dark mode** — toggle en Navbar, sincronizado con clase `light` en `<html>`
- **Partículas suaves** — IcosahedronGeometry morfológica (sin cubos), anillos concéntricos
- **Hero 3 líneas** — "piensa / sistemas / que conectan" con animación `brand-cycle` multicolor
- **Avatares circulares** en Hero (social proof)
- **CTA unificado** → "Ver productos ahora"
- **Productos** — imagen real Gumroad + placeholders "Contenido que llega próximamente"
- **Contenido** — franja sutil YouTube sin reproductores
- **Connect** — email `concentriclabco@gmail.com` con botón Copy-to-clipboard
- **Formspree** endpoint: `xreoreqr` (actualiza si cambia)
