// Funciones para hablar con la API de la práctica 2.
// Solo se usan desde componentes de servidor: el navegador nunca llama a la API.

// Viene de .env.local. Lee y guarda la ruta a la API
const API_URL = process.env.API_URL;

// Función auxiliar: hace la petición a la API y devuelve el JSON ya convertido.
async function pedir(ruta) {
  // Este fetch se ejecuta en Node (servidor de Next), no en el navegador
  const res = await fetch(`${API_URL}${ruta}`);

  // res.ok es true si el código está entre 200 y 299; si no, cortamos con un error
  if (!res.ok) {
    throw new Error(`La API respondió ${res.status} en ${ruta}`);
  }

  // Convierte el cuerpo de la respuesta (texto JSON) en un objeto/array de JavaScript
  return res.json();
}

// GET /categorias -> ["Ciencia Ficcion", "Animacion", ...]
export function getCategorias() {
  return pedir("/categorias");
}

// GET /actores -> [{ id, nombre_completo, año_nacimiento }, ...]
export function getActores() {
  return pedir("/actores");
}

// GET /peliculas?categoria=X -> solo las películas de esa categoría.
// encodeURIComponent convierte espacios y acentos para que la URL sea válida.
export function getPeliculasDeCategoria(categoria) {
  return pedir(`/peliculas?categoria=${encodeURIComponent(categoria)}`);
}
