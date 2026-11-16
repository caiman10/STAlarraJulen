// Componente de cliente: necesita estado (useState) y un evento (onClick).
"use client";

import { useState } from "react";

// texto tiene un valor por defecto por si no se pasa la prop
export function Informacion({ texto = "Aquí está la información" }) {
  // false = cerrado al principio
  const [mostrarInfo, setMostrarInfo] = useState(false);

  return (
    <div className="informacion">
      {/* (prev) => !prev invierte el valor anterior: abierto <-> cerrado */}
      <button type="button" onClick={() => setMostrarInfo((prev) => !prev)}>
        {mostrarInfo ? "Menos información" : "Más información"}
      </button>

      {/* El párrafo solo se pinta si mostrarInfo es true. No hace falta llamar al
          servidor: el texto ya venía dentro del HTML. */}
      {mostrarInfo && <p>{texto}</p>}
    </div>
  );
}
