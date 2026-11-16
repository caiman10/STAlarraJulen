import { getActores, getCategorias, getPeliculasDeCategoria } from "@/lib/api";
import { SelectorCategorias } from "./SelectorCategorias";
import { Movie } from "./Movie";

// Componente de servidor: hace las peticiones a la API y devuelve el HTML ya con los datos.
// Puede ser "async" porque se ejecuta en el servidor (en la P3 hacía falta useEffect + useState).
export async function Catalogo({ searchParams }) {
  // Esperamos la promesa y sacamos ?categoria=...; si no viene, vale "" (cadena vacía)
  const { categoria = "" } = await searchParams;

  // Siempre necesitamos las categorías para rellenar el desplegable
  const categorias = await getCategorias();

  let peliculas = [];
  if (categoria) {
    // Lanzamos las dos peticiones a la vez y esperamos a que terminen ambas
    const [pelisCategoria, actores] = await Promise.all([
      getPeliculasDeCategoria(categoria),
      getActores(),
    ]);

    // Diccionario para buscar actores por su ID: { 1: {...}, 2: {...} }
    const actoresPorId = Object.fromEntries(actores.map((actor) => [actor.id, actor]));

    // Cambiamos los IDs de actores [1, 2] por sus nombres
    peliculas = pelisCategoria.map((pelicula) => ({
      ...pelicula, // copiamos todos los campos de la película
      actores: (pelicula.actores || []).map(
        // ?. evita un error si el ID no existe; en ese caso ponemos "Desconocido"
        (id) => actoresPorId[id]?.nombre_completo || "Desconocido"
      ),
    }));
  }

  return (
    <>
      {/* Un componente de servidor puede renderizar uno de cliente y pasarle datos por props */}
      <SelectorCategorias categorias={categorias} seleccionada={categoria} />

      {/* Solo pintamos la sección si hay una categoría elegida */}
      {categoria && (
        <section className="categoria-seccion">
          <h2 className="categoria-titulo">{categoria}</h2>
          {peliculas.length === 0 ? (
            <p>No hay películas en esta categoría.</p>
          ) : (
            <div className="lista-peliculas">
              {/* key es obligatorio en listas: React lo usa para identificar cada elemento */}
              {peliculas.map((pelicula) => (
                <Movie key={pelicula.id} pelicula={pelicula} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
