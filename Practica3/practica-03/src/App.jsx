// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import { Movie } from './components/Movie';
import { SelectorCategorias } from './components/SelectorCategorias';

const API_URL = 'http://localhost:3000';

function App() {
  const [categoriaSel, setCategoriaSel] = useState('');
  const [actores, setActores] = useState([]);
  // Guardamos las películas junto con la categoría a la que pertenecen,
  // para saber si lo que tenemos ya corresponde a la categoría elegida
  const [resultado, setResultado] = useState({ categoria: '', peliculas: [] });

  // 1. Al arrancar: pedimos los actores una sola vez ([] = solo al montar)
  useEffect(() => {
    fetch(`${API_URL}/actores`)
      .then((res) => res.json())
      .then((data) => setActores(data))
      .catch((err) => console.error('Error al cargar los actores:', err));
  }, []);

  // 2. DINÁMICO: este efecto se vuelve a ejecutar cada vez que cambia categoriaSel
  //    y pide a la API solo las películas de esa categoría
  useEffect(() => {
    if (!categoriaSel) return; // sin categoría elegida no pedimos nada

    let cancelado = false; // por si el usuario cambia de categoría antes de que llegue la respuesta

    fetch(`${API_URL}/peliculas?categoria=${encodeURIComponent(categoriaSel)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelado) setResultado({ categoria: categoriaSel, peliculas: data });
      })
      .catch((err) => console.error('Error al cargar las películas:', err));

    // Limpieza: se ejecuta antes del siguiente efecto; ignoramos la respuesta antigua
    return () => {
      cancelado = true;
    };
  }, [categoriaSel]);

  // Las películas que tenemos son de una categoría anterior -> todavía cargando
  const cargando = categoriaSel !== '' && resultado.categoria !== categoriaSel;

  // Diccionario rápido para buscar actores por su ID
  const actoresPorId = Object.fromEntries(actores.map((actor) => [actor.id, actor]));

  // Reemplazamos los IDs de actores por sus nombres
  const peliculas = resultado.peliculas.map((pelicula) => ({
    ...pelicula,
    actores: (pelicula.actores || []).map(
      (id) => actoresPorId[id]?.nombre_completo || 'Desconocido'
    ),
  }));

  return (
    <div className="contenedor-principal">
      <h1 className="titulo-principal">Mi app de cine</h1>
      <SelectorCategorias
        categoriaSeleccionada={categoriaSel}
        onCategoriaChange={setCategoriaSel}
      />

      {categoriaSel && (
        <section className="categoria-seccion">
          <h2 className="categoria-titulo">{categoriaSel}</h2>
          {cargando ? (
            <p>Cargando películas...</p>
          ) : peliculas.length === 0 ? (
            <p>No hay películas en esta categoría.</p>
          ) : (
            <div className="lista-peliculas">
              {peliculas.map((pelicula) => (
                <Movie key={pelicula.id} pelicula={pelicula} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
