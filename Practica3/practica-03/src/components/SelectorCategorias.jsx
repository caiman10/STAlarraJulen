export function SelectorCategorias({ categorias, seleccionada, onCambio }) {
  return (
    <div className="selector-categorias">
      <label htmlFor="selector-categoria">Categoría: </label>
      <select
        id="selector-categoria"
        value={seleccionada}
        onChange={(event) => onCambio(event.target.value)}
      >
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
}
