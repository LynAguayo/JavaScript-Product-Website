# PR02-0373-JS - Página Web Interactiva con Menú, Modal y Funcionalidades Dinámicas

Desarrollar una página web que incluya:
- Un menú hamburguesa interactivo.
- Un modal para la alerta de cookies.
- Un modo oscuro/claro que cambie el diseño.
- Un formulario para acceder a contenido privado
- Una sección dinámica donde se carguen datos desde una API externa.

## Secciones

- Splash/Hero (debe ocupar mínimo el 100% del viewport)
- Informacion (debe ocupar mínimo el 100% del viewport)
- Usuarios (sólo visible si el login y password son correctos)
- ... (puedes añadir otras secciones: fotos, videos, testimonios, pricing, mapa, contacto, ...)
- Footer

## Menú Hamburguesa Interactivo 🍔

- Al hacer clic en el icono, se debe abrir o cerrar el menú.
- Al hacer clic en una opción, el menú se debe cerrar automáticamente.
- Cada opción debe navegar al principio de cada sección.

## Modal de Alerta de Cookies 🍪

- Al cargar la web, se debe mostrar un modal con un mensaje sobre cookies.
- El usuario puede Aceptar o Rechazar.
- Si rechaza, se debe mostrar un mensaje informativo.

## Modo Oscuro/Claro 🌗

- Un botón debe permitir cambiar entre modo oscuro y modo claro.
- El estado del modo debe guardarse en localStorage para mantenerlo al recargar la página.

> [!NOTE]
> ver [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Formulario para acceder a contenido privado 📝

- Campos requeridos: email y contraseña
- Validaciones:
  - email tiene que tener un formato válido
  - contraseña tiene que tener al menos 8 carácteres, una mayúscula y un número.
  
## Carga de Datos desde una API Externa 📡

Si el usuario/contraseña son correctos, se hace una petición a una api externa. (Si son incorrectos, se muestra un mejsaje de error).

- Se debe mostrar una lista de usuarios obtenidos desde la API pública de https://jsonplaceholder.typicode.com/users.
- Los datos se deben cargar al haber comprobado que el usuario y el password sean correctos.