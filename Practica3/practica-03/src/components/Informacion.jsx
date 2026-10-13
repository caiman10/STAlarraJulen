import { useState } from 'react';

export function Informacion({ texto = 'Aquí está la información' }) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const handleClick = () => {
    setMostrarInfo((prev) => !prev);
  };

  return (
    <div className="informacion">
      <button type="button" onClick={handleClick}>
        {mostrarInfo ? 'Menos información' : 'Más información'}
      </button>

      {mostrarInfo && <p>{texto}</p>}
    </div>
  );
}
