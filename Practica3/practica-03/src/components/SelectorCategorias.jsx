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
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
}
