import { useState, useEffect } from 'react';
import './App.css';
import { Movie } from './components/Movie';
import { SelectorCategorias } from './components/SelectorCategorias';

const API = 'http://localhost:3000';

function App() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  // Guardamos las películas junto con la categoría a la que pertenecen
  const [peliculasCargadas, setPeliculasCargadas] = useState({ categoria: '', lista: [] });
  const [actores, setActores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSel, setCategoriaSel] = useState('');
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);

  // 1. Al arrancar pedimos las categorías y los actores (una sola vez)
  useEffect(() => {
    Promise.all([
      fetch(`${API}/categorias`).then((res) => res.json()),
      fetch(`${API}/actores`).then((res) => res.json())
    ])
      .then(([dataCategorias, dataActores]) => {
        setCategorias(dataCategorias);
        setActores(dataActores);
        // Seleccionamos la primera categoría por defecto
        if (dataCategorias.length > 0) {
          setCategoriaSeleccionada(dataCategorias[0]);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al conectar con la API:", err);
        setCargando(false);
      });
  }, []);

  // 2. Cada vez que cambia la categoría hacemos una petición NUEVA a la API
  //    pidiendo solo las películas de esa categoría
  useEffect(() => {
    if (!categoriaSeleccionada) return;

    let cancelada = false;

    fetch(`${API}/peliculas?categoria=${encodeURIComponent(categoriaSeleccionada)}`)
      .then((res) => res.json())
      .then((dataPeliculas) => {
        // Evitamos pintar una respuesta antigua si el usuario cambió de categoría rápido
        if (!cancelada) {
          setPeliculasCargadas({ categoria: categoriaSeleccionada, lista: dataPeliculas });
        }
      })
      .catch((err) => {
        console.error("Error al pedir las películas:", err);
        if (!cancelada) setPeliculasCargadas({ categoria: categoriaSeleccionada, lista: [] });
      });

    return () => {
      cancelada = true;
    };
  }, [categoriaSeleccionada]);

  // Si las películas que tenemos no son de la categoría seleccionada, aún está cargando
  const cargandoPeliculas = peliculasCargadas.categoria !== categoriaSeleccionada;

  // 3. Diccionario rápido para buscar actores por su ID
  const actoresPorId = Object.fromEntries(
    actores.map((actor) => [actor.id, actor])
  );

<<<<<<< HEAD
  // 4. Reemplazamos los IDs de actores por sus nombres reales
  const peliculasConActores = peliculasCargadas.lista.map((pelicula) => ({
    ...pelicula,
    actores: (pelicula.actores || []).map((id) =>
      actoresPorId[id] ? actoresPorId[id].nombre_completo || "Desconocido" : "Desconocido"
    ),
  }));
=======
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
>>>>>>> 5c57103ae0e98077ab0b01f6c0453bac5691c51f

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

<<<<<<< HEAD
      <SelectorCategorias
        categorias={categorias}
        seleccionada={categoriaSeleccionada}
        onCambio={setCategoriaSeleccionada}
      />

      <section className="categoria-seccion">
        <h2 className="categoria-titulo">Categoría: {categoriaSeleccionada}</h2>
        <div className="caja-categoria">
          {cargandoPeliculas ? (
            <p>Cargando películas...</p>
          ) : peliculasConActores.length === 0 ? (
            <p>No hay películas en esta categoría.</p>
          ) : (
            <div className="lista-peliculas">
              {peliculasConActores.map((pelicula) => (
                <Movie key={pelicula.id} pelicula={pelicula} />
              ))}
            </div>
          )}
        </div>
      </section>
=======
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
>>>>>>> 5c57103ae0e98077ab0b01f6c0453bac5691c51f
    </div>
  );
}

export default App;
