<<<<<<< HEAD
export function SelectorCategorias({
  categorias,
  categoriaSeleccionada,
  onCategoriaChange,
}) {
  return (
    <div className="selector-categoria">
      <label htmlFor="selector-categoria">Categoría:</label>
      <select
        id="selector-categoria"
        value={categoriaSeleccionada}
        onChange={(event) => onCategoriaChange(event.target.value)}
      >
        <option value="">Seleccionar categoría</option>
=======
export function SelectorCategorias({ categorias, seleccionada, onCambio }) {
  return (
    <div className="selector-categorias">
      <label htmlFor="selector-categoria">Categoría: </label>
      <select
        id="selector-categoria"
        value={seleccionada}
        onChange={(event) => onCambio(event.target.value)}
      >
>>>>>>> ac751951aa84055cfd3a0abaa52054689de4a19c
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
}
