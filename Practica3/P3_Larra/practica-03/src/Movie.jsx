import { useState } from 'react';

export default function Movie({ title, director, year }) {
  // Inicializamos el estado en 'false' (oculto por defecto)
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="movie-card">
      <h3>{title}</h3>
      
      {/* Si showInfo es true, se renderiza este bloque */}
      {showInfo && (
        <div className="movie-details">
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Año:</strong> {year}</p>
        </div>
      )}
      
      {/* Al hacer clic, invertimos el valor actual del estado */}
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'Menos información' : 'Más información'}
      </button>
    </div>
  );
}