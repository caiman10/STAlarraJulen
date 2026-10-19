import './App.css';
import { Movie } from './components/Movie';
import pelisData from './data/pelis.json';
const actoresPorId = Object.fromEntries(
  pelisData.actores.map((actor) => [actor.id, actor])
);

const peliculasPorCategoria = pelisData.peliculas.reduce((acc, pelicula) => {
  const categoria = pelicula.categoria;

  if (!acc[categoria]) {
    acc[categoria] = [];
  }

  acc[categoria].push({
    ...pelicula,
    actores: (pelicula.actores ?? [])
      .map((id) => actoresPorId[id]?.nombre_completo)
      .filter(Boolean),
  });

  return acc;
},{});

function App() {
  return (
    <div className="contenedor-principal">
      <h1>Mi app de cine</h1>

      {Object.entries(peliculasPorCategoria).map(([categoria, peliculas]) => (
        <section key={categoria} className="Category">
          <h2>Categoría: {categoria}</h2>

          <div className="lista-peliculas">
            {peliculas.map((pelicula) => (
              <Movie key={pelicula.id} pelicula={pelicula} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default App;