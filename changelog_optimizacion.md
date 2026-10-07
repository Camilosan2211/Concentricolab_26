# Changelog de optimización

## 2026-10-07 — Restauración de cápsulas del fondo

- Eliminada la línea de scan azul animada del Hero; no formaba parte de la composición visual solicitada.
- Restaurada la visibilidad de las cápsulas flotantes: el fondo geométrico se renderiza sobre la superficie base, detrás del contenido, sin quedar oculto por el stacking context del documento.
- Conservadas las dimensiones proporcionales del logo móvil; no se alteró su relación de aspecto.

## 2026-10-07 — Validación y correcciones de estabilidad

- **SEO público:** se actualizaron canonical, Open Graph, Twitter, JSON-LD, logo, imagen social y sitemap a `https://concentricolab.com/`; se añadió `og:locale` (`es_CO`).
- **Redes sociales:** se corrigió LinkedIn a `https://www.linkedin.com/company/concentricolab/` en Connect, Footer y JSON-LD. Instagram y YouTube quedaron verificados con las URLs proporcionadas.
- **Formspree:** newsletter y solicitud de proyecto ahora envían asuntos diferenciados mediante `_subject`, facilitando la clasificación de mensajes.
- **Limpieza:** se eliminó la constante de correo antigua sin uso que apuntaba a Gmail.
- **Tema y Safari/iOS:** se sincronizan `color-scheme`, fondo de `html`/`body`/`#root` y `theme-color` al alternar entre oscuro y claro.
- **Responsive:** el Hero permite replegar sus tres composiciones dentro del ancho móvil; se ajustaron tipografía, gaps y padding bajo 640 px. Nombre y Email del formulario se apilan en móvil y vuelven a dos columnas desde `sm`.
- **Accesibilidad y rendimiento percibido:** se añadió soporte global para `prefers-reduced-motion` y protección adicional contra overflow de textos.
- **Enfoque / Manifiesto visual:** `#enfoque` conserva superficie, contraste y tipografía oscura incluso cuando el tema global está en claro.
- **Fondos animados:** se reactivaron grid, scan line, cápsulas/figuras flotantes y capas de glow/aurora existentes.
- **Navbar:** el logo usa `h-4` en móvil y `sm:h-5` desde el breakpoint `sm`.
- **Analítica:** se verificó que `@vercel/analytics/react` y `@vercel/speed-insights/react` siguen montados una sola vez en `App.jsx`; el indicador de progreso mantiene un único listener de scroll con limpieza.

## Validación ejecutada — 2026-10-07 14:39:07 UTC

- Revisión estática de SEO, enlaces sociales, Formspree, responsive y listeners.
- `npm run build` completado correctamente; queda una advertencia no bloqueante de chunk grande y `eval` interno de `lottie-web`.
- Navegador validado en 390×844 y 1440×900: sin overflow horizontal en móvil, tema oscuro aplicado y layouts renderizados correctamente.
- Web Vitals en preview local: TTFB 13.7 ms, FCP 508 ms, CLS 0.0; LCP 908 ms. Son métricas de laboratorio en modo desarrollo.
- Backup versionado mediante rama de trabajo y commit de Git.

> Fecha y hora registradas: 2026-10-07 14:39:07 UTC.

---

## Historial previo

Este archivo se mantiene como registro acumulativo de cambios adicionales realizados durante las optimizaciones.
