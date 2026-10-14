import { Informacion } from './Informacion';


export function Movie({ pelicula }) {
  const textoActores=pelicula.actores.join(", ")
  return (  
    <article className="Movie">
      <h3>{pelicula.nombre}</h3>
      <Informacion
        texto={`La película ${pelicula.nombre} fue emitida en ${pelicula.año_publicacion} y sus actores son ${textoActores}`}
      />
    </article>
  );
}
