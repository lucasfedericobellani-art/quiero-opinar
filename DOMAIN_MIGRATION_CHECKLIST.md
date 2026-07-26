# Migracion de dominio canonico

Objetivo: usar `https://www.quieroopinar.com` como dominio canonico y mantener compatibilidad con `https://www.quieroopinar.com.ar` mediante redirecciones 301 preservando paths.

## Archivos modificados

- `vercel.json`: redirects 301 desde `quieroopinar.com.ar`, `www.quieroopinar.com.ar` y `quieroopinar.com` hacia `https://www.quieroopinar.com/:path*`.
- `site-config.js`: URL publica centralizada para el frontend.
- `api/site-config.js`: URL publica y allowlist de origenes centralizadas para APIs.
- `app.js`: canonical dinamico, Open Graph, Twitter Cards y links compartidos apuntan al dominio `.com`.
- `index.html`: metadata inicial, canonical inicial, Open Graph/Twitter inicial, texto de bienvenida y cache bust de `app.js`.
- `api/moderation.js`: allowlist de origenes usa configuracion centralizada.
- `api/contact.js`: allowlist centralizada y dominio `.com` en emails por defecto.
- `api/admin-alert.js`: allowlist centralizada y dominio `.com` en emails por defecto.
- `robots.txt`: sitemap apunta solo a `https://www.quieroopinar.com/sitemap.xml`.
- `sitemap.xml`: incluye solo URLs con dominio `.com`.
- `FIREBASE_SETUP.md`: ejemplo de remitente actualizado al dominio `.com`.

## Vercel

Estado verificado el 2026-07-26:

- `quieroopinar.com.ar` existe en Vercel y esta asociado al proyecto `quiero-opinar`.
- `www.quieroopinar.com.ar` aparece asociado al proyecto junto con `quieroopinar.com.ar`.
- `quieroopinar.com` fue agregado al proyecto `quiero-opinar`.
- `www.quieroopinar.com` fue agregado al proyecto `quiero-opinar`.
- Vercel todavia marca DNS pendiente para el dominio `.com` hasta que DonWeb apunte correctamente.

Configurar en Vercel:

- Dejar `www.quieroopinar.com` como dominio principal/canonico del proyecto.
- Mantener aliases:
  - `quieroopinar.com`
  - `www.quieroopinar.com.ar`
  - `quieroopinar.com.ar`
- Deployar los cambios de `vercel.json` antes de probar redirecciones 301.

## DNS en DonWeb

Vercel solicito estos registros para el dominio `.com`:

- `A` para `quieroopinar.com` apuntando a `76.76.21.21`.
- `A` para `www.quieroopinar.com` apuntando a `76.76.21.21`.

Alternativa posible:

- Cambiar nameservers del dominio `.com` a:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

Para el `.com.ar`, Vercel detecta nameservers actuales de DonWeb:

- `ns1.donweb.com`
- `ns2.donweb.com`

Puede mantenerse asi si los registros DNS apuntan correctamente al proyecto de Vercel.

## Firebase

Revisar manualmente en Firebase Console:

- Authentication > Settings > Authorized domains:
  - agregar `quieroopinar.com`
  - agregar `www.quieroopinar.com`
  - mantener `quieroopinar.com.ar`
  - mantener `www.quieroopinar.com.ar`
- Dynamic Links: no se detecto configuracion local, pero revisar si existe en Firebase Console.
- Hosting: no se usa como hosting principal del sitio; Vercel sigue siendo el hosting publico.
- Storage/CORS: no se detectaron referencias locales al dominio viejo.
- Firestore rules: no contienen dominios hardcodeados.

## Analytics y SEO

- Google Analytics: confirmar que la propiedad GA4 `G-XY98SMBP52` recibe eventos desde `www.quieroopinar.com`.
- Search Console:
  - agregar propiedad para `https://www.quieroopinar.com`
  - subir `https://www.quieroopinar.com/sitemap.xml`
  - mantener la propiedad `.com.ar` para monitorear redirecciones.
- Meta Pixel: no se detecto pixel instalado en el repo.
- Robots: `robots.txt` apunta solo al sitemap `.com`.
- Sitemap: `sitemap.xml` usa solo dominio `.com`.

## Verificaciones antes de ponerlo como principal

- DNS de `quieroopinar.com` y `www.quieroopinar.com` resuelve hacia Vercel.
- `https://www.quieroopinar.com/` carga la app.
- `https://quieroopinar.com/` responde 301 a `https://www.quieroopinar.com/`.
- `https://www.quieroopinar.com.ar/` responde 301 a `https://www.quieroopinar.com/`.
- `https://www.quieroopinar.com.ar/opinion/abc123` responde 301 a `https://www.quieroopinar.com/opinion/abc123`.
- `https://www.quieroopinar.com.ar/tema/deportes` responde 301 a `https://www.quieroopinar.com/tema/deportes`.
- Canonical en rutas dinamicas apunta a `https://www.quieroopinar.com`.
- Links de compartir usan `https://www.quieroopinar.com/opinion/...`.
- Formulario de contacto funciona desde `www.quieroopinar.com`.
- Publicar, responder, like/report y panel admin funcionan desde `www.quieroopinar.com`.
