# Firebase setup para Quiero Opinar

Esta web ya esta configurada para usar Firestore en el proyecto `quiero-opinar-app`.

## 1. Revisar servicios en Firebase Console

1. Firestore Database debe estar creado.
2. Authentication debe tener habilitado el metodo `Anonymous`.
3. Hosting debe estar habilitado para el proyecto.

La configuracion publica de la app esta en `firebase-config.js` y `QO_USE_FIREBASE` debe quedar en `true`.

## 2. Vaciar opiniones viejas antes de publicar

El borrado de datos remotos no debe hacerse desde el navegador publico. Hacerlo una sola vez con Firebase CLI autenticada:

```sh
firebase login
firebase use quiero-opinar-app
firebase firestore:delete opinions --recursive --force --project quiero-opinar-app
firebase firestore:delete topics --recursive --force --project quiero-opinar-app
```

La coleccion `topics` se puede borrar para volver a los temas base del codigo. Las opiniones arrancan vacias porque `seedOpinions` esta en `[]`.

## 3. Publicar reglas y web

```sh
firebase deploy --only firestore:rules,hosting --project quiero-opinar-app
```

`firebase.json` publica la web desde esta carpeta, pero excluye archivos internos como reglas, documentacion, `.git`, `admin.html`, `admin.js` y `panel.html`.

## 4. App Check

App Check esta preparado pero desactivado:

```js
window.QO_FIREBASE_APPCHECK_CONFIG = {
  enabled: false,
  siteKey: "",
  debugToken: ""
};
```

Para endurecer la publicacion, registrar la app web en App Check con reCAPTCHA v3, poner `enabled: true` y cargar el `siteKey`.

## 5. API anti-abuso en Vercel

Las acciones sensibles pasan por `/api/moderation`:

- publicar opinion
- publicar respuesta
- like de opinion o respuesta
- reporte de opinion o respuesta

Para correr en produccion, Vercel Preview o local con `vercel dev`, configurar credenciales server-side de Firebase Admin. Las reglas actuales de Firestore bloquean escrituras publicas directas desde el navegador, asi que estas variables son necesarias para publicar, responder, reportar y dar like. Opcion recomendada:

```sh
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
IP_HASH_SALT='valor-largo-privado'
```

Alternativa:

```sh
FIREBASE_PROJECT_ID=quiero-opinar-app
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
IP_HASH_SALT='valor-largo-privado'
```

`IP_HASH_SALT` se usa para guardar hashes de IP en `securityActions` y `securityCooldowns`, no la IP cruda. La IP se toma solo en la API desde `x-forwarded-for`, `x-real-ip`, headers de proxy/Vercel o `request.ip`.

## Alertas por intentos de ingreso al admin

El panel `/admin` llama a `/api/admin-alert` cuando falla un login. Para que esa alerta llegue por email en produccion, configurar estas variables en Vercel:

```sh
RESEND_API_KEY='re_...'
ADMIN_ALERT_EMAIL='lucasfedericobellani@gmail.com'
ADMIN_ALERT_FROM='Quiero Opinar <alertas@quieroopinar.com.ar>'
```

`ADMIN_ALERT_EMAIL` usa `lucasfedericobellani@gmail.com` si no se configura. `ADMIN_ALERT_FROM` debe ser un remitente verificado en Resend; si falta `RESEND_API_KEY`, el endpoint no bloquea el panel y simplemente no envia el email.

Pruebas manuales en preview/staging:

1. Publicar una opinion y enseguida otra: la segunda debe responder `Espera unos segundos antes de volver a publicar.` con los segundos restantes.
2. Publicar una respuesta y enseguida otra: la segunda debe quedar bloqueada por el mismo cooldown de 45 segundos.
3. Dar like dos veces a la misma opinion: el segundo intento debe mostrar `Ya marcaste me gusta`.
4. Dar like dos veces a la misma respuesta: el segundo intento debe mostrar `Ya marcaste me gusta`.
5. Reportar dos veces la misma opinion: el segundo intento debe mostrar `Ya reportaste este contenido.`
6. Reportar dos veces la misma respuesta: el segundo intento debe mostrar `Ya reportaste este contenido.`

## 6. Siguiente mejora recomendada

- El panel admin actual no debe publicarse como seguridad real; para moderacion remota conviene usar Firebase Auth con usuarios administradores.
