# Firebase setup para Quiero Opinar

Esta web ya tiene una capa de datos preparada para Firestore.

## 1. Crear proyecto

1. Entrar a Firebase Console.
2. Crear un proyecto, por ejemplo `quiero-opinar`.
3. Crear una app web dentro del proyecto.
4. Copiar la configuracion `firebaseConfig`.

## 2. Activar Firestore

1. Ir a Firestore Database.
2. Crear base de datos.
3. Elegir modo produccion.
4. Pegar las reglas de `firestore.rules`.

## 3. Conectar la web

Editar `firebase-config.js`:

```js
window.QO_USE_FIREBASE = true;

window.QO_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

window.QO_FIREBASE_APPCHECK_CONFIG = {
  enabled: false,
  siteKey: "",
  debugToken: ""
};
```

Mientras `QO_USE_FIREBASE` este en `false`, la web usa `localStorage`.

## 4. Activar autenticacion anonima y App Check

1. En Firebase Console, entrar a Authentication y habilitar el metodo "Anonymous".
2. En App Check, registrar la app web y copiar el site key de reCAPTCHA v3.
3. Poner `enabled: true` y el `siteKey` en `firebase-config.js`.
4. Si hace falta probar localmente, cargar un `debugToken` de App Check.

## 5. Siguiente mejora recomendada

- Para IP, un like por IP, rate limit y moderacion mas robusta, conviene sumar Cloud Functions o un backend serverless.
- A futuro, se puede agregar moderacion automatica y un flujo de reportes con funciones de backend.
