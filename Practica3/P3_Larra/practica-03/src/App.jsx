import Category from './Category';
import './App.css'; // Importamos los estilos

export default function App() {
  // Nuestros datos de prueba
  const accionMovies = [
    { title: 'Die Hard', director: 'John McTiernan', year: 1988 },
    { title: 'Mad Max: Fury Road', director: 'George Miller', year: 2015 },
    { title: 'Gladiator', director: 'Ridley Scott', year: 2000 },
    { title: 'Terminator 2', director: 'James Cameron', year: 1991 }
  ];

  const scifiMovies = [
    { title: 'Interstellar', director: 'Christopher Nolan', year: 2014 },
    { title: 'Blade Runner 2049', director: 'Denis Villeneuve', year: 2017 },
    { title: 'The Matrix', director: 'Lana & Lilly Wachowski', year: 1999 },
    { title: 'Dune', director: 'Denis Villeneuve', year: 2021 }
  ];

  return (
    <div className="app-container">
      <h1>Catálogo de Películas</h1>
      <Category title="Categoría: Acción" movies={accionMovies} />
      <Category title="Categoría: Ciencia Ficción" movies={scifiMovies} />
    </div>
  );
}