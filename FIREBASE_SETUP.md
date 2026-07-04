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

## 5. Siguiente mejora recomendada

- Para IP, un like por IP, rate limit y moderacion mas robusta, conviene sumar Cloud Functions o un backend serverless.
- El panel admin actual no debe publicarse como seguridad real; para moderacion remota conviene usar Firebase Auth con usuarios administradores.
