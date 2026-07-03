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
```

Mientras `QO_USE_FIREBASE` este en `false`, la web usa `localStorage`.

## 4. Limitaciones de esta primera etapa

- Las opiniones, respuestas, vistas y likes ya pueden persistir en Firestore.
- La IP no se guarda todavia porque eso no debe hacerse desde frontend.
- Para IP, un like por IP, rate limit y moderacion seria mejor sumar Cloud Functions o un backend serverless.
