# Práctica 4 - Frameworks de Back-End (Next.js)

La web de la práctica 3, rehecha con Next.js (App Router, JavaScript). Todas las peticiones a la API se hacen desde el servidor de Next: el navegador recibe la página con los datos ya incluidos y no llama nunca a la API.

## Cómo arrancarlo

1. API de la práctica 2 (puerto 3000):

   ```bash
   cd Practica2
   npm install
   node app.js
   ```

2. Web en Next.js (puerto 3001):

   ```bash
   cd Practica4/practica-04
   npm install
   cp .env.example .env.local   # API_URL=http://localhost:3000
   npm run dev
   ```

3. Abrir http://localhost:3001

## Estructura

| Archivo | Tipo | Qué hace |
| --- | --- | --- |
| `app/page.js` | Servidor | Página principal; lee `?categoria=` de la URL |
| `components/Catalogo.js` | Servidor | Pide categorías, películas y actores a la API |
| `components/Movie.js` | Servidor | Tarjeta de una película |
| `components/SelectorCategorias.js` | Cliente | Cambia la URL al elegir categoría (no llama a la API) |
| `components/Informacion.js` | Cliente | Botón "Más información" con estado |
| `lib/api.js` | Servidor | Funciones `fetch` contra `API_URL` |

`API_URL` va sin el prefijo `NEXT_PUBLIC_`, así que solo existe en el servidor y nunca llega al navegador.
