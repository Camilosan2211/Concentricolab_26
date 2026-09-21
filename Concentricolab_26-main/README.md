# Concéntrico Lab — Web v2

**Stack:** React 18 · Vite · Tailwind CSS · React Three Fiber · GSAP · Lenis · Framer Motion · Lucide React

## Instalación y desarrollo

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # → /dist listo para Vercel
```

## Control de versiones — Git

```bash
# Ver cambios sin guardar
git status

# Ver diff de cambios
git diff

# Agregar todos los cambios
git add .

# Crear commit con mensaje
git commit -m "Mensaje descriptivo de cambios"

# Enviar cambios al repositorio remoto
git push origin main
```

## Generar Repomix (export del proyecto)

```bash
# Necesita tener repomix instalado globalmente
npm install -g repomix

# Generar archivos de salida (TXT y XML)
repomix

# Esto genera:
# → repomix-output.txt (formato legible)
# → repomix-output.xml (formato estructurado)
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

## Sistema de Diseño v2.1 — Cambios recientes

### Tokens de Tailwind agregados
- `b-blue: '#4D66FF'` — azul primario (WCAG AA AA con white text)
- `b-deep: '#050828'` — fondo deep para paneles (LabStats, Proceso)
- `rounded-notch: 60px` — navbar notch corners
- `rounded-section: 2.5rem` — premium section containers
- `rounded-card: 1.5rem` — glass cards y product cards
- `rounded-action: 0.75rem` — secondary buttons

### Utilidades CSS agregadas en `index.css`
- `.section-premium` — patrón reutilizable para Manifiesto, Proceso, Footer
- Actualización de `.glass`, `.glass-blue`, `.glow-blue` con glassmorphism mejorado
- Variables CSS reorganizadas para modo dark/light

### Accesibilidad mejorada
- ✅ Botones primarios: `#4D66FF` en lugar de `#5170FF` (4.51:1 WCAG AA)
- ✅ Texto secundario en glass cards: `dark:text-white/50` (4.7:1 WCAG AA)
- ✅ Documentación de elementos decorativos como excepción WCAG 1.4.3

Ver [DESIGN_AUDIT.md](./docs/DESIGN_AUDIT.md) para detalles técnicos completos.
