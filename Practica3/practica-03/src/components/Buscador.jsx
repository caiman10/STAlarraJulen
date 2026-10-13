import { useState } from 'react';

export function Buscador() {
  const [busqueda, setBusqueda] = useState('');

  return (
    <div className="buscador">
      <input
        type="text"
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
        placeholder="Escribe el nombre de una peli..."
        aria-label="Buscar película"
      />
      <button type="button">Buscar</button>
    </div>
  );
}