# Operation Runbook

## Observabilidad
1. **Frontend Errors (Sentry)**
   - Todo error en `monicamontufar.com` es capturado automáticamente por `@sentry/astro`.
   - Requerimiento: Configurar variable de entorno `SENTRY_DSN` en Netlify.
   
2. **Uptime Monitoring (UptimeRobot)**
   - Monitor HTTP(s) activo apuntando a `https://monicamontufar.com`.
   - Intervalos de comprobación cada 5 minutos.
   - Envío de correos y webhooks (Discord/Slack) si el status difiere de 200.

## Niveles de Severidad de Alertas (P1/P2/P3)

### P1 (Critical - Caída Global)
- **Definición**: El sitio está completamente inaccesible o retorna errores HTTP 50x. DNS rotos o Netlify build deployment outage global.
- **Acción (SLA < 1 hora)**: Rollback Inmediato en el dashboard de Netlify. Revisión de billing o status page de Netlify.

### P2 (High - Impacto de Conversión)
- **Definición**: Componentes interactivos rotos. Ej. Serverless contact form falla, o Turnstile rechaza sistemáticamente envíos correctos (falsos positivos masivos).
- **Acción (SLA < 4 horas)**: Inspección de logs en Netlify Functions. Testear llave pública/privada de Cloudflare Turnstile comprobando expiración.

### P3 (Medium - Degradación / Errores Sentry Controlados)
- **Definición**: Excepciones de JavaScript no fatales en rutas específicas que Sentry alerta pero que no rompen el framework, o advertencias visuales reportadas por Playwright en el quality gate durante un MR.
- **Acción (SLA < 24 horas)**: Añadir ticket al `BACKLOG.md` para corrección asíncrona por parte del agente en la próxima ola de cambios.

---
**Última actualización técnica**: 24 de Marzo de 2026.
