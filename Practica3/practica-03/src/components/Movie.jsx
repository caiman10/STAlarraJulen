import { Informacion } from './Informacion';

export function Movie({ pelicula }) {
  return (
    <article className="Movie">
      <h3>{pelicula.titulo}</h3>
      <p><strong>Género:</strong> {pelicula.genero}</p>
      <p><strong>Director:</strong> {pelicula.director}</p>
      <p><strong>Año:</strong> {pelicula.anio}</p>
      <p><strong>Actores:</strong> {pelicula.actores?.join(', ') || 'Sin actores'}</p>
      <Informacion
        texto={`La película ${pelicula.titulo} fue dirigida por ${pelicula.director} en ${pelicula.anio}. ${pelicula.sinopsis}`}
      />
    </article>
  );
}