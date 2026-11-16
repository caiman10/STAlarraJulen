// "use client" debe ser la primera línea: convierte este archivo en código que se envía
// al navegador. Hace falta porque usamos un evento (onChange) y un hook (useRouter).
"use client";

// Ojo: de "next/navigation" (App Router), no de "next/router" (sistema antiguo)
import { useRouter } from "next/navigation";

// Componente de cliente: solo cambia la URL. No pide nada a la API;
// es el servidor quien vuelve a generar la página con la nueva categoría.
export function SelectorCategorias({ categorias, seleccionada }) {
  const router = useRouter();

  const handleChange = (event) => {
    const valor = event.target.value;
    // Navega a /?categoria=X (o a / si se elige la opción vacía) sin recargar la página.
    // Esta petición va al servidor de Next (3001), nunca a la API (3000).
    router.push(valor ? `/?categoria=${encodeURIComponent(valor)}` : "/");
  };

  return (
    <div className="selector-categoria">
      {/* htmlFor + id asocian la etiqueta con el desplegable */}
      <label htmlFor="selector-categoria">Categoría:</label>
      <select
        id="selector-categoria"
        // key: si cambia la categoría (p. ej. botón "atrás"), React recrea el select
        key={seleccionada}
        // defaultValue: opción inicial; la "verdad" está en la URL, no en un useState
        defaultValue={seleccionada}
        onChange={handleChange}
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
