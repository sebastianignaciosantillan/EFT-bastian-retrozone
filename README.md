# GameHub — Tienda de Videojuegos (EFT)

Evaluación Final Transversal del curso Desarrollo Frontend I: sitio web para una tienda de venta de videojuegos online, desarrollado con **React + Vite** y **Bootstrap 5**.

Mantiene la misma identidad visual (tipografía, colores, estilo de cards) que los proyectos anteriores del curso (Bastian-RetroZone), para que se note la consistencia de principio a fin de la asignatura.

- **Autor:** [TU NOMBRE]
- **Demo publicada:** [https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/](https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/)
- **Repositorio:** [https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO](https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO)
- **Video de presentación:** [link al .mp4]

> Proyecto con fines académicos. No hay backend: el formulario de contacto valida los datos y simula el envío, pero no manda ningún mensaje real.

## Antes de ejecutar: recursos pendientes

Este repositorio **no incluye las imágenes ni la fuente**. Antes de correrlo:

1. Copiá las 30 portadas de videojuegos a `public/img/` — el listado exacto de nombres de archivo está en `public/img/LEEME.txt`.
2. Copiá tu `favicon.png` a `public/img/`.
3. Copiá `nasalization-rg.otf` (la misma fuente de los proyectos anteriores) a `public/fonts/`.

Los archivos `LEEME.txt` son solo un recordatorio; borralos una vez que copies todo.

## Tecnologías

- [React 19](https://react.dev/) con [Vite](https://vitejs.dev/)
- Bootstrap 5 (instalado por npm)
- `fetch` + Hooks (`useState`, `useEffect`) para cargar datos, filtrar y manejar errores

## Cómo ejecutarlo en local

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
eft-tienda-videojuegos/
├── index.html
├── public/
│   ├── img/        (30 portadas + favicon — ver sección de arriba)
│   ├── fonts/        (fuente Nasalization — ver sección de arriba)
│   └── data/
│       └── videojuegos.json   # Catálogo: 30 juegos, 6 categorías
└── src/
    ├── main.jsx
    ├── App.jsx                 # Estado central
    ├── index.css
    └── components/
        ├── Navbar.jsx           # Navegación + ícono del carrito
        ├── CartDropdown.jsx      # Tabla del carrito (se abre/cierra)
        ├── CategoryFilter.jsx    # Botones de filtro por categoría
        ├── GameList.jsx          # Catálogo de sugerencias
        ├── CommunitySection.jsx  # Sección "Comunidad" + modal
        ├── PublishGameModal.jsx  # Formulario para publicar un juego
        └── ContactForm.jsx       # Formulario de contacto con validación
```

## Cómo se resolvió cada requisito de la pauta

| Requisito | Dónde / cómo |
|---|---|
| Página principal con productos en tarjetas (imagen, nombre, precio, descripción) | `GameList` |
| Barra de navegación entre secciones | `Navbar`, con anclas a Inicio, Catálogo, Comunidad y Contacto |
| Formulario de contacto con validación | `ContactForm`: valida nombre, formato de email y longitud del mensaje antes de "enviar" |
| HTML semántico, CSS, Bootstrap 5 responsivo | `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`; grid de Bootstrap |
| Objeto/arreglo JS con los videojuegos | `public/data/videojuegos.json`, cargado con `fetch` |
| Generar tarjetas dinámicamente | `.map()` sobre el estado `juegos` en `GameList` |
| Filtrado por categoría | `CategoryFilter` + `.filter()` en `App.jsx` |
| Componentes React divididos (lista + formulario) | `GameList` y `ContactForm`, cada uno con su responsabilidad |
| Props entre componentes | Ver tabla de componentes más abajo |
| **Estado para agregar o eliminar videojuegos de la lista** | Ver la sección "Sobre agregar y eliminar" más abajo |

### Sobre "agregar y eliminar videojuegos"

La pauta pide que el estado permita agregar y eliminar videojuegos de la lista. Decidimos **no** dejar que cualquier visitante agregue o elimine productos directamente del catálogo de la tienda, porque no sería realista en un e-commerce real. En cambio:

- **Eliminar:** cada card del catálogo tiene un botón "✕" (title: *"No me interesa esta sugerencia"*) que saca ese juego de la lista de sugerencias (`setJuegos` filtrando por id).
- **Agregar:** la sección "Comunidad" simula que desarrolladores freelance publican sus propios juegos a través de un modal (`PublishGameModal`), que agrega el juego nuevo a una lista aparte (`setJuegosComunidad`).

Ambas acciones usan exactamente el mismo mecanismo de React que pide la pauta (`useState` + agregar/quitar elementos de un arreglo sin mutarlo), aplicado sobre dos casos de uso distintos y más creíbles que dejar manipular el catálogo de la tienda a cualquier usuario.

## Componentes y props

| Componente | Props | Qué hace |
|---|---|---|
| `Navbar` | `carrito`, `onEliminarDelCarrito` | Navegación + ícono del carrito con contador; controla cuándo se muestra `CartDropdown` |
| `CartDropdown` | `items`, `onEliminar` | Tabla del carrito |
| `CategoryFilter` | `categoriaActiva`, `onCambiarCategoria` | Botones de filtro |
| `GameList` | `juegos`, `onEliminar`, `onAgregarAlCarrito`, `idsEnCarrito` | Catálogo de sugerencias |
| `CommunitySection` | `juegosComunidad`, `onPublicar` | Lista de juegos publicados + botón que abre el modal |
| `PublishGameModal` | `onPublicar`, `onCerrar` | Formulario de publicación, con su propio estado y validación |
| `ContactForm` | — | Formulario de contacto, con su propio estado y validación |

## Renderizado condicional

- Mientras se cargan los videojuegos: "Cargando videojuegos...".
- Si falla la carga: mensaje de error.
- Catálogo filtrado sin resultados: mensaje acorde.
- Botón de cada card: "Agregar al carrito" o "✓ En el carrito" (deshabilitado), según corresponda.
- Carrito vacío vs. con contenido, en el dropdown.
- Sección Comunidad: mensaje de "no hay publicaciones" vs. la grilla de juegos publicados.
- Formulario de contacto: errores por campo, y mensaje de éxito tras un envío válido.

## Accesibilidad

- `lang="es"`, jerarquía de títulos ordenada, `alt` en todas las imágenes.
- Botones icon-only con `aria-label` (quitar sugerencia, quitar del carrito, cerrar modal).
- `aria-pressed` en los botones de categoría activa, `aria-expanded` en el botón del carrito.
- Labels asociadas a cada campo de formulario (`htmlFor` + `id`).

## Capturas y video

*(Pendiente)*
