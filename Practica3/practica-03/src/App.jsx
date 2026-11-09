// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import { Movie } from './components/Movie';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [actores, setActores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSel, setCategoriaSel] = useState('');
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);

  useEffect(() => {
    // Usamos Promise.all para pedir ambas rutas a la vez a tu backend
    Promise.all([
      fetch('http://localhost:3000/peliculas').then((res) => res.json()),
      fetch('http://localhost:3000/actores').then((res) => res.json())
    ])
      .then(([dataPeliculas, dataActores]) => {
        setPeliculas(dataPeliculas); // Guarda el array de /peliculas
        setActores(dataActores);     // Guarda el array de /actores
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al conectar con la API:", err);
        setCargando(false);
      });
  }, []);

  // 1. Diccionario rápido para buscar actores por su ID
  const actoresPorId = Object.fromEntries(
    actores.map((actor) => [actor.id, actor])
  );

  // 2. Agrupamos películas por categoría y reemplazamos los IDs de actores por sus nombres reales
  const peliculasPorCategoria = peliculas.reduce((acc, pelicula) => {
    const categoria = pelicula.categoria || "Sin categoría";

    if (!acc[categoria]) {
      acc[categoria] = [];
    }

    acc[categoria].push({
      ...pelicula,
      // Traducimos los IDs de actores [1, 2] a nombres ["Matthew...", "Anne..."]
      actores: (pelicula.actores || [])
      .map((id) => (actoresPorId[id] ? actoresPorId[id].nombre_completo || "Desconocido" : "Desconocido"))
      .filter(Boolean),
    });

    return acc;
  }, {});
  const categorias = Object.keys(peliculasPorCategoria);

  if (cargando) {
    return <div className="contenedor-principal"><p>Cargando datos del servidor...</p></div>;
  }

  return (
    <div className="contenedor-principal">
      <h1 className="titulo-principal">Mi app de cine</h1>
      <div className="selector-categoria">
        <button
          className="boton-categoria"
          type="button"
          aria-expanded={categoriasAbiertas}
          onClick={() => setCategoriasAbiertas((abiertas) => !abiertas)}
        >
          Categoría: {categoriaSel || 'Seleccionar'}
        </button>
        {categoriasAbiertas && (
          <div className="opciones-categoria" id="opciones-categoria" >
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className="opcion-categoria"
                type="button"
                aria-pressed={categoriaSel === categoria}
                onClick={() => {
                  setCategoriaSel(categoria);
                  setCategoriasAbiertas(false);
                }}
              >
                {categoria}
              </button>
            ))}
            {categorias.length === 0 && <p>No hay categorías disponibles.</p>}
          </div>
        )}
      </div>

      {categoriaSel && peliculasPorCategoria[categoriaSel] && (
        <section className="categoria-seccion">
          <h2 className="categoria-titulo">{categoriaSel}</h2>
          <div className="lista-peliculas">
            {peliculasPorCategoria[categoriaSel].map((pelicula) => (
              <Movie key={pelicula.id} pelicula={pelicula} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;