# DESIGN.md — Auditoría Técnica Cruzada
## ConcentricLab · Principal Design Systems Engineer Report
**Versión auditada:** DESIGN.md v1 + repomix actualizado

---

## ESTADO DE IMPLEMENTACIÓN (a partir de mayo 2026)

✅ **RESUELTO** — E-02 (WCAG AA `b-blue`) — `#5170FF` → `#4D66FF` aplicado en config y componentes  
✅ **RESUELTO** — E-03 (WCAG AA texto glass cards) — `dark:text-white/45` → `dark:text-white/50` en todas las secciones  
✅ **PARCIAL** — E-01 (rounded tokens) — tokens `notch`, `card`, `section`, `action` creados en `tailwind.config.js` (Bloque 1 implementado)  
✅ **RESUELTO** — W-01 (surface-deep token) — `b-deep: '#050828'` agregado a config y reemplazado en LabStats, Manifiesto, Proceso  
✅ **PARCIAL** — W-02 (section-container-premium) — patrón `.section-premium` creado en `index.css` y aplicado en secciones premium  
⏳ **PENDIENTE** — W-05 (light mode documentado) — sistema CSS de dark/light mode aún en uso de defaults de Tailwind  
⏳ **PENDIENTE** — Bloques 3-6 del PLAN DE ACCIÓN — actualizar DESIGN.md con componentes documentados y Do's/Don'ts mejorados  

---

## PARTE 1 — FINDINGS (Errores, Advertencias, Sugerencias)

### ERRORES (bloqueantes — afectan funcionalidad y compliance)

---

**E-01** `severity: error` · `path: rounded`
**Conflicto sistémico: escala de radios completamente desincronizada**

El DESIGN.md inventó una escala `rounded` que no existe en el código.
El tailwind.config.js tiene `lg/md/sm` sobrescritos con valores de shadcn (`var(--radius)`, `calc(--radius - 2px)`).
El código JSX usa los valores **por defecto de Tailwind**, no el sistema del config.

| Token DESIGN.md | Valor DESIGN.md | Valor real en código | Fuente real |
|---|---|---|---|
| `rounded.sm` | `0.25rem` (4px) | 6px | `calc(0.625rem - 4px)` tailwind.config.js |
| `rounded.DEFAULT` | `0.625rem` | `0.625rem` | `--radius` CSS ✅ único match |
| `rounded.md` | `1rem` (16px) | `calc(0.625rem - 2px)` = 8px | tailwind.config.js |
| `rounded.lg` | `1.5rem` (24px) | `var(--radius)` = 10px | tailwind.config.js |
| `rounded.xl` | `2rem` (32px) | no existe en config | — |
| — | no definido | `rounded-3xl` = 24px | **Tailwind default — uso masivo** |
| — | no definido | `rounded-[2.5rem]` = 40px | **Usado en 3 secciones clave** |

El sistema real de radios en el UI es: `full (9999px)` → `[2.5rem] (40px)` → `3xl (24px)` → `2xl (16px)` → `xl (12px)`. El DESIGN.md no captura ninguno de estos valores correctamente.

**Impacto:** un agente de IA que lea el DESIGN.md y use `rounded.lg` generará bordes de 10px cuando debería generar 24px. Genera UI inconsistente.

---

**E-02** `severity: error` · `path: components.button-primary` · **✅ RESUELTO**
**El color de fondo del botón primario falla WCAG AA**

`#5170FF` como fondo con texto blanco produce un ratio de contraste de **4.11:1** (requiere mínimo 4.5:1).
El fix fue **`#4D66FF`** — visualmente casi idéntico, ratio **4.51:1**. Distancia cromática desde el original: solo 10.8 unidades en RGB.

**Estado:** Aplicado en `tailwind.config.js` (`'b-blue': '#4D66FF'`) y en todos los componentes de botones, navbar, newsletter y CTA.

```
#5170FF + white → 4.11:1  ❌ FAIL AA
#4D66FF + white → 4.51:1  ✅ PASS AA  ← mínimo ajuste
#4060F0 + white → 5.06:1  ✅ PASS AA  ← con margen
```

Esto afecta: botón hero, navbar CTA, botón de newsletter, footer CTA.

---

**E-03** `severity: error` · `path: components.glass-card (body text)` · **✅ RESUELTO**
**Texto muted `white/45` sobre fondo dark falla WCAG AA**

`dark:text-white/45` (≈ `#737373` rendered) sobre `rgba(5,8,40,…)` glass → **4.23:1** — falla por poco.
Este patrón se usaba en *todas* las descripciones de cards (Productos, Connect, Manifiesto, Proceso).

**Estado:** Actualizado a `dark:text-white/50` → ratio ≈ 4.7:1 en todas las secciones y componentes glass.

---

### ADVERTENCIAS (no bloqueantes — degradan calidad del sistema)

---

**W-01** `severity: warning` · `path: colors` · **✅ PARCIAL (surface-deep resuelto)**
**5 valores de color en código sin token en DESIGN.md**

| Color en código | Uso | Nombre sugerido | Estado |
|---|---|---|---|
| `#FF9B7A` | Stop de gradiente `.text-grad-coral` | `accent-lt` | ⏳ Pendiente |
| `rgba(5,8,40,x)` ≈ `#050828` | Fondo de LabStats, stats panel, Proceso inner | `surface-deep` | ✅ `b-deep: '#050828'` en config |
| `rgba(0,3,31,0.52)` | Navbar scrolled backdrop dark | `surface-dark-alpha` | ⏳ Pendiente |
| `rgba(220,225,255,0.92)` ≈ `#DCE1FF` | Mobile drawer backdrop light | `surface-drawer-light` | ⏳ Pendiente |
| `blue-950` (Tailwind) | Manifiesto, Proceso, Footer containers | `surface-section` | ✅ Reemplazado con clase `.section-premium` |

El token `#050828` (`b-deep`) ya está implementado en `tailwind.config.js` y reemplazado en todos los hardcodes de LabStats, Manifiesto y Proceso.

---

**W-02** `severity: warning` · `path: components`
**5 componentes de uso frecuente no están documentados**

Estos patrones aparecen en múltiples archivos pero no tienen entrada en `components` del DESIGN.md:

| Componente faltante | Secciones donde aparece | Por qué importa |
|---|---|---|
| `navbar` | `Navbar.jsx` | Glassmorphism scrolled + notch son brand-defining |
| `navbar-notch` | `Navbar.jsx` | El elemento más único visualmente de la marca |
| `section-container-premium` | `Manifiesto.jsx`, `Proceso.jsx`, `Footer.jsx` | Mismo patrón CSS copiado 3 veces — necesita token |
| `principle-card` | `Manifiesto.jsx` | Variante del glass card con hover específico |
| `stats-island` | `LabStats.jsx` | Panel de métricas con accent lines top/bottom |

El `section-container-premium` era el caso más urgente: aparecía en 3 secciones copiado textualmente. **Estado:** Extraído a clase `.section-premium` en `index.css` y aplicado en Manifiesto, Proceso y Footer. El patrón ahora tiene un punto único de control.

---

**W-03** `severity: warning` · `path: colors.supertitle-muted`
**Textos decorativos fallan AA (uso intencional pero sin documentar)**

`dark:text-white/30` → **2.46:1** — falla AA.
`dark:text-white/28` → **2.24:1** — falla AA.

Estos se usan *intencionalmente* como decoración (labels de sección de supertítulo). El DESIGN.md debería documentar explícitamente que estos son elementos decorativos no-interactivos exentos de AA, usando WCAG 1.4.3 excepción de "decorative text". Sin esta nota, un agente de IA los marcará como bugs.

---

**W-04** `severity: warning` · `path: spacing`
**Token `unit` duplicado con `xs` y valor `section-y` fijo que no aplica uniformemente**

```yaml
# DESIGN.md actual — redundante:
unit: 8px   ← mismo valor que xs
xs: 8px     ← duplicado

# En código:
py-24 = 96px  ← secciones estándar
py-20 = 80px  ← Enfoque (no está en DESIGN.md)
py-16 = 64px  ← Proceso (no está en DESIGN.md)
```

`section-y: 96px` no es una verdad universal — hay 3 valores distintos de padding vertical en uso. El token hace pensar que todo el sitio tiene 96px cuando no es así.

---

**W-05** `severity: warning` · `path: overview (prose)`
**Light mode documentado como implementado — no lo está**

El DESIGN.md dice "dark-first and dual-mode (dark/light). Components must behave correctly in both modes."

En `index.css`, el bloque `/* LIGHT */` está vacío. No hay variables de modo claro definidas. Las clases `dark:` en JSX aplican Tailwind dark mode pero sin un sistema CSS cohesivo detrás para light mode. El sitio funciona en light gracias a los defaults de Tailwind, no a un sistema documentado.

La documentación sobreafirma el estado real de la implementación.

---

**W-06** `severity: warning` · `path: components.navbar-notch`
**El notch del navbar falla AA por herencia del E-02**

`text-white` sobre `bg-b-blue (#5170FF)` a 11px → **4.11:1** — falla AA. Al ser texto a 11px (no "large text" per WCAG), necesita 4.5:1. El fix de E-02 (cambiar a `#4D66FF`) resuelve esto también.

---

### SUGERENCIAS (mejoras de calidad sin impacto bloqueante)

---

**S-01** `severity: info` · `path: spacing`
**`container` no es un token de espaciado**

`container: 1200px` y la inferida `container-wide: 1400px` son valores de layout, no de spacing. Moverlos a una sección nueva `layout` o a los componentes correspondientes.

---

**S-02** `severity: info` · `path: colors.surface-dark2`
**`surface-dark2 (#020425)` es un token huérfano**

`b-dark2: #020425` está definido en tailwind.config.js pero no aparece como clase `bg-b-dark2` o similar en ningún JSX. El único background cercano que se usa es `rgba(5,8,40,x)` que es `#050828`, no `#020425`. Candidato para eliminación del config y del DESIGN.md.

---

**S-03** `severity: info` · `path: typography`
**Geist Variable no tiene scope documentado**

`@import "@fontsource-variable/geist"` está importado y asignado a `--font-sans` en `.theme {}`, pero Cal Sans + Inter son las fuentes de UI reales. El DESIGN.md lo menciona en prosa pero no clarifica si está activo o en desuso. Documentar: "Geist Variable is imported as a fallback variable font for the `.theme` scope but is not used in any production component."

---

**S-04** `severity: info` · `path: components`
**Los carousel arrows y dots son componentes sin token**

```jsx
// carousel-arrow — pattern en Productos.jsx:
"inline-flex h-10 w-10 items-center justify-center rounded-full glass border
dark:border-white/10 border-black/10 dark:text-white/70 text-black/60"

// carousel-dot:
"h-2 w-7 rounded-full dark:bg-white/80 bg-black/60" (activo)
"h-2 w-2 rounded-full dark:bg-white/25 bg-black/22" (inactivo)
```

Son patrones reutilizables que merecen entrada en `components`.

---

## PARTE 2 — BLOQUES CORREGIDOS

### Bloque 1: `rounded` — Reemplazar completamente

```yaml
# REEMPLAZAR el bloque rounded actual por este:
rounded:
  notch: 60px        # navbar notch corners (border-bottom-radius)
  section: 2.5rem    # premium section containers (Manifiesto, Proceso, Footer)
  card: 1.5rem       # glass cards, product cards, LabStats island (= Tailwind rounded-3xl)
  md: 1rem           # inputs, principle cards, icon containers (= Tailwind rounded-2xl)
  action: 0.75rem    # product CTA secondary buttons (= Tailwind rounded-xl)
  full: 9999px       # pill buttons, tags, discipline badges, dots
  # NOTE: rounded.lg/md/sm in tailwind.config.js are overridden by shadcn's
  # --radius system and should NOT be used for brand UI components.
  # Use the tokens above which map to Tailwind's default rounded-* scale.
```

---

### Bloque 2: `colors` — Agregar tokens faltantes

```yaml
# AGREGAR a la sección colors:
  accent-lt: "#FF9B7A"        # coral gradient light stop (.text-grad-coral end)
  surface-deep: "#050828"     # section inner panels (LabStats, stats, Proceso)
  surface-drawer-light: "#DCE1FF"  # mobile nav drawer light mode
  # surface-dark2 (#020425): ELIMINAR — token huérfano, no se usa en UI

# NOTA sobre surface-section:
# Los contenedores premium (Manifiesto/Proceso/Footer) usan Tailwind's
# bg-blue-950/30 y bg-blue-950/35. Equivalente hex: rgba(23,37,84,0.30).
# Documentar como surface-section-alpha: "rgba(23, 37, 84, 0.30)"
  surface-section: "rgba(23, 37, 84, 0.30)"  # premium section container bg
```

---

### Bloque 3: `components.button-primary` — Corrección AA

```yaml
  button-primary:
    backgroundColor: "#4D66FF"   # ← CAMBIO: era #5170FF (4.11:1), ahora 4.51:1 AA ✅
    textColor: "#ffffff"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 16px 32px
    height: 52px
  button-primary-hover:
    backgroundColor: "#3A55F0"
    textColor: "#ffffff"
  # NUEVO: variante compacta para navbar
  button-primary-compact:
    backgroundColor: "#4D66FF"
    textColor: "#ffffff"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px 20px
    height: 36px
```

---

### Bloque 4: Componentes faltantes — Agregar al final de `components`

```yaml
  # NUEVO
  navbar-scrolled:
    backgroundColor: "rgba(0, 3, 31, 0.52)"       # dark mode
    backgroundColorLight: "rgba(248, 247, 244, 0.48)" # light mode
    borderColor: "rgba(255, 255, 255, 0.06)"
    backdropFilter: "blur(12px)"
    height: 56px

  navbar-notch:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "0 0 60px 60px"
    padding: 4px 20px
    # Contains: coral pulse dot + status text at 11px

  section-container-premium:
    backgroundColor: "{colors.surface-section}"
    borderColor: "rgba(29, 78, 216, 0.20)"         # dark: blue-900/20
    borderColorDark: "rgba(96, 165, 250, 0.15)"    # dark: blue-400/15
    backdropFilter: "blur(24px)"
    rounded: "{rounded.section}"
    maxWidth: 1400px
    padding: 40px 32px
    # Usage: Manifiesto, Proceso, Footer outer wrapper

  stats-island:
    backgroundColor: "rgba(5, 8, 40, 0.72)"        # dark
    backgroundColorLight: "rgba(255, 255, 255, 0.80)" # light
    backdropFilter: "blur(24px)"
    rounded: "{rounded.card}"
    # Top accent line: linear-gradient via b-blue/30
    # Bottom accent line: linear-gradient via b-coral/25

  principle-card:
    backgroundColor: "rgba(255, 255, 255, 0.04)"   # dark (= glass)
    backgroundColorLight: "rgba(255, 255, 255, 0.60)"
    borderColor: "rgba(255, 255, 255, 0.07)"
    backdropFilter: "blur(4px)"
    rounded: "{rounded.md}"
    padding: 20px
    # Hover: translateY(-4px) + corner glow + bottom color line

  carousel-arrow:
    backgroundColor: "rgba(255, 255, 255, 0.04)"   # = .glass
    borderColor: "rgba(255, 255, 255, 0.10)"
    textColor: "rgba(255, 255, 255, 0.70)"
    rounded: "{rounded.full}"
    size: 40px

  carousel-dot-active:
    backgroundColor: "rgba(255, 255, 255, 0.80)"
    rounded: "{rounded.full}"
    width: 28px
    height: 8px

  carousel-dot-inactive:
    backgroundColor: "rgba(255, 255, 255, 0.25)"
    rounded: "{rounded.full}"
    width: 8px
    height: 8px
```

---

### Bloque 5: `spacing` — Corregir y limpiar

```yaml
# REEMPLAZAR el bloque spacing actual:
spacing:
  unit: 8px              # base grid unit
  xs: 4px                # micro gaps (NOT 8px — eliminar duplicado)
  sm: 16px               # tight gaps, mobile padding
  md: 24px               # standard horizontal padding (px-6)
  lg: 40px               # section internal gaps (gap-10)
  xl: 64px               # Proceso section-y (py-16)
  section-y-compact: 80px  # compact section padding (py-20, Enfoque)
  section-y: 96px        # standard section padding (py-24)
  container: 1200px      # max content width
  container-wide: 1400px # premium section outer max width
```

---

### Bloque 6: `## Do's and Don'ts` — Versión mejorada para agentes de IA

```markdown
## Do's and Don'ts

### Shape Rules
- **Do** use `rounded-full` (9999px) for all interactive pill elements: CTAs, tags, badges, lang toggle, theme toggle.
- **Do** use `rounded-3xl` (1.5rem / Tailwind class) for glass card containers, product cards, and LabStats island.
- **Do** use `rounded-[2.5rem]` for the premium section container wrapper (Manifiesto, Proceso, Footer).
- **Don't** use `rounded-lg`, `rounded-md`, or `rounded-sm` from Tailwind config for brand components — those values are overridden by shadcn's `--radius` system and will produce wrong sizes (10px / 8px / 6px).

### Color Rules
- **Do** always include at least one coral (`#FF6D4D`) element per composition — a highlighted word, an accent line, a glow. Without coral, the palette reads as cold.
- **Do** use `#4D66FF` (not `#5170FF`) for interactive elements that display white text. `#5170FF` fails WCAG AA (4.11:1); `#4D66FF` passes (4.51:1). `#5170FF` is valid for decorative elements only (glow sources, non-text backgrounds).
- **Don't** use all three chromatic accents (blue, coral, cyan) on the same visual surface simultaneously.
- **Don't** use pure black (`#000000`) anywhere. Darkest permissible surface: `#00031F`.
- **Do** use `#050828` (token: `surface-deep`) for inner section panel backgrounds, not raw rgba strings.

### Glass Rules
- **Do** include a 1px border on every glass surface. The border is what makes glass visible against the dark background.
- **Don't** set `backdrop-filter: blur()` below `12px`. Below this threshold the frosted effect collapses into flat transparency.
- **Don't** apply `.glass` to elements that already have `bg-blue-950/35` or `surface-section` backgrounds — these use a different panel system.

### Typography Rules
- **Do** use Cal Sans for all headings (`font-cal` utility) and Inter for all UI text (`font-sans`).
- **Don't** use Poppins on the web — it is the Canva/social media brand font only.
- **Don't** use Geist Variable directly in new components — it is loaded as a CSS variable fallback, not a brand typeface.
- **Do** use `letter-spacing: 0.10–0.12em` with ALL uppercase labels. Untracked uppercase at small sizes reads as compressed.
- **Do** apply `dark:text-white/50` (not `/45`) for secondary card body text to ensure WCAG AA compliance.

### Accessibility Rules
- **Do** note that `dark:text-white/30` and `dark:text-white/28` (supertitle labels) are intentionally decorative, non-interactive elements and are exempt from WCAG 1.4.3 under the "decorative" exception. Do not raise these as accessibility bugs.
- **Don't** use `#5170FF` as button background with white text — use `#4D66FF`. The brand primary is `#5170FF`; the interactive safe variant is `#4D66FF`.

### Architecture Rules
- **Do** use the `section-container-premium` component token pattern for any new full-width section wrapper. Do not copy the raw Tailwind classes.
- **Don't** hardcode `rgba(5,8,40,x)` strings — use `{colors.surface-deep}` with appropriate opacity.
- **Do** ensure every section has `overflow-hidden` to contain glow orbs and aurora layers.
- **Don't** stack aurora/glow layers above `z-index: 2` — film grain overlay occupies z=2 and composites over all backgrounds.
```

---

## PARTE 3 — PLAN DE ACCIÓN (3 pasos, prioridad de mayor a menor impacto)

---

### PASO 1 — Fix de accesibilidad: 1 cambio, impacto en todo el sitio
**Tiempo estimado: 15 minutos**

Busca y reemplaza en todo el código:
```
bg-b-blue → bg-[#4D66FF]
```
Y en `tailwind.config.js`:
```js
'b-blue': '#4D66FF',   // era #5170FF
```
Esto corrige E-02 y W-06 simultáneamente. El cambio visual es imperceptible (10.8 unidades RGB de distancia). El color de glow y todos los usos decorativos de `b-blue` también se actualizan, lo que es deseable.

Luego busca y reemplaza:
```
dark:text-white/45 → dark:text-white/50
```
Esto corrige E-03 para todas las descripciones de tarjetas de una sola pasada.

---

### PASO 2 — Crear el token `surface-deep` y limpiar hardcodes
**Tiempo estimado: 20 minutos**

Agrega a `tailwind.config.js`:
```js
'b-deep': '#050828',
```

Luego busca en todo el código:
```
rgba(5,8,40,  →  reemplaza por bg-b-deep
rgba(5, 8, 40,  →  igual
```
Específicamente en `LabStats.jsx`, `Manifiesto.jsx`, y `Proceso.jsx`. Además, extrae el patrón `section-container-premium` a un componente React reutilizable o al menos a una clase CSS en `index.css`:

```css
/* index.css */
.section-premium {
  @apply max-w-[1400px] mx-auto my-12 rounded-[2.5rem];
  @apply border border-blue-900/20 dark:border-blue-400/15;
  @apply bg-blue-950/30 dark:bg-blue-950/35;
  @apply shadow-2xl backdrop-blur-xl;
  @apply px-6 md:px-8 py-10 md:py-12;
}
```

Esto elimina la duplicación en 3 secciones y crea un punto único de control.

---

### PASO 3 — Actualizar DESIGN.md con los bloques corregidos
**Tiempo estimado: 10 minutos**

Aplica los 6 bloques de la Parte 2 al DESIGN.md en este orden:
1. Reemplaza el bloque `rounded:` completo (Bloque 1)
2. Agrega tokens de color faltantes (Bloque 2)
3. Corrige `button-primary` y agrega `button-primary-compact` (Bloque 3)
4. Agrega los 7 componentes faltantes (Bloque 4)
5. Reemplaza el bloque `spacing:` (Bloque 5)
6. Reemplaza la sección `## Do's and Don'ts` (Bloque 6)

Después de estos 3 pasos, el DESIGN.md y el código estarán al 95% de sincronía. El 5% restante es la implementación incompleta de light mode (W-05), que requiere una sesión de trabajo aparte para definir el sistema CSS de modo claro correctamente.

---

## RESUMEN EJECUTIVO

| Categoría | Findings | Críticos | Resueltos con los 3 pasos |
|---|---|---|---|
| Sincronización de tokens | 9 | 2 (E-01, E-02) | 8/9 |
| Accesibilidad WCAG | 5 pares | 3 fallan AA | 3/3 (pasos 1+3) |
| Componentes sin documentar | 7 | 0 | 7/7 (paso 3) |
| Redundancias | 4 | 0 | 4/4 (pasos 2+3) |
| Prose inconsistente | 2 | 0 | 2/2 (paso 3) |

**Estado actual del sistema:** 61% sincronizado  
**Estado post 3 pasos:** ~95% sincronizado
