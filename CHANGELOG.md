# Registro de cambios

## 2026-10-07

- Ajustado el CTA del Hero para permitir salto de línea controlado en pantallas pequeñas sin deformar los gráficos.
- Corregida la transición de tema para actualizar `color-scheme`, `theme-color` y fondos base de `html`/`#root`.
- Actualizados canonical, Open Graph y JSON-LD al dominio oficial `https://concentricolab.com/`.
- Añadidos asuntos identificables a las notificaciones de Formspree del newsletter y solicitudes de proyecto.
- Reducido el logo de la Navbar en móvil, mejorado el layout del formulario y añadido soporte de movimiento reducido.

## Verificación

- `npm run build`
- Revisión de preview responsive en desktop y móvil.
- Verificación de rutas internas, formularios y alternancia de tema.

## Pendientes externos

- Confirmar en el dashboard de Formspree que `_subject` está habilitado para los dos endpoints.
- Confirmar con el proveedor de hosting que el dominio canónico sirve correctamente y que `/assets/images/og-image.png` existe en producción.
- Validar en producción el formulario con un envío real y revisar la bandeja de entrada.
- Reemplazar el favicon provisional por el logo real si aún no existe un asset final.
- Verificar en Search Console los datos estructurados y las URLs canónicas después del despliegue.
- Añadir analítica solo con consentimiento explícito si se requiere medición de conversiones.

## Riesgos conocidos

- La entrega de correos depende de la configuración y límites de Formspree; la UI solo confirma la respuesta del endpoint.
- La referencia visual de la fuente depende de la disponibilidad de Google Fonts; existe un fallback sans-serif.
- El cambio de tema depende de la clase en `document.documentElement`; no se persiste la preferencia entre sesiones.
- Los gráficos siguen siendo decorativos y no deben interpretarse como datos analíticos.
- Los enlaces sociales siguen apuntando a perfiles placeholder hasta confirmar las URLs oficiales.
- El HTML semántico y accesibilidad fueron revisados visualmente, pero se recomienda una auditoría automatizada adicional.

## Tareas para otra IA

1. Auditar nuevamente con Lighthouse/Axe en desktop y móvil.
2. Probar el envío de ambos formularios con respuestas 200 y errores de red.
3. Confirmar que todos los enlaces internos y externos tienen destinos finales.
4. Verificar el contraste de textos secundarios y estados de foco en ambos temas.
5. Revisar Core Web Vitals y compresión/caché de assets en producción.
6. Confirmar que el dominio oficial, sitemap y robots.txt están publicados.
7. Comprobar que no hay secretos ni credenciales en el bundle generado.
8. Revisar la consistencia de la entrega de correo en Formspree tras un envío real.
9. Eliminar la mención de placeholder de redes cuando existan URLs definitivas.
10. Actualizar este registro después de cada despliegue importante.
11. No rediseñar la sección Enfoque: debe conservar su fondo oscuro en ambos temas.
12. Si se añade persistencia de tema, hacerlo con una solución explícita y documentar el consentimiento/comportamiento.
13. Mantener copy y navegación en español, salvo nombres de marca y términos técnicos.
14. No sustituir los endpoints reales de Formspree por mocks.
15. Revisar que cualquier nueva imagen tenga `alt` y carga optimizada.
16. Mantener el CTA del Hero legible en anchuras inferiores a 360px.
17. Confirmar que la metadata use siempre el dominio canónico final.
18. No almacenar emails ni formularios en `localStorage`.
19. Revisar el estado de los botones durante respuestas lentas del endpoint.
20. Registrar cualquier cambio de arquitectura en este archivo.

## Estado

- Pendientes críticos de código: ninguno identificado en esta revisión.
- Pendientes que requieren acceso externo o producción: listados arriba.
- Siguiente paso recomendado: ejecutar la validación visual y funcional en el preview y después desplegar a un entorno de staging.

## Note

This file is intentionally maintained as a handoff artifact for a future AI reviewer.

<!-- End of changelog -->
