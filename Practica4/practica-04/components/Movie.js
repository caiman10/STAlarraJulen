import { Informacion } from "./Informacion";

// Componente de servidor (no tiene "use client"): solo pinta los datos que le llegan
// y no envía JavaScript al navegador.
export function Movie({ pelicula }) {
  // ["John Travolta", "Samuel L. Jackson"] -> "John Travolta, Samuel L. Jackson"
  const textoActores = pelicula.actores.join(", ");
  return (
    <article className="Movie">
      <h3>{pelicula.nombre}</h3>
      {/* El texto se monta aquí, en el servidor, y se pasa al botón (componente de cliente) */}
      <Informacion
        texto={`La película ${pelicula.nombre} fue emitida en ${pelicula.año_publicacion} y sus actores son ${textoActores}`}
      />
    </article>
  );
}
