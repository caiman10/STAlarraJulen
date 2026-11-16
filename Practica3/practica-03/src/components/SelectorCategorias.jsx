import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

// Desplegable de categorías. Pide él mismo la lista de categorías a la API,
// así que es dinámico: si se añade una categoría nueva en la API, aparece sola.
export function SelectorCategorias({ categoriaSeleccionada, onCategoriaChange }) {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(false);

  // useEffect con [] -> se ejecuta UNA vez, cuando el selector aparece en pantalla
  useEffect(() => {
    fetch(`${API_URL}/categorias`)
      .then((res) => res.json())
      .then((data) => setCategorias(data)) // ["Ciencia Ficcion", "Animacion", ...]
      .catch((err) => {
        console.error('Error al cargar las categorías:', err);
        setError(true);
      });
  }, []);

  if (error) {
    return <p>No se han podido cargar las categorías.</p>;
  }

  return (
    <div className="selector-categoria">
      <label htmlFor="selector-categoria">Categoría:</label>
      <select
        id="selector-categoria"
        value={categoriaSeleccionada}
        // Avisamos al padre (App) de la categoría elegida
        onChange={(event) => onCategoriaChange(event.target.value)}
      >
        <option value="">Seleccionar categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
}
