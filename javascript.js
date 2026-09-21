botonBuscar.addEventListener('click', async function() {
    const titulo = inputPelicula.value;
    const miClave = 'cc7c8129'; 
    const url = `https://www.omdbapi.com/?t=${titulo}&apikey=${miClave}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.Response === "True") {
            divresultado.innerHTML = `
                <p><strong>Director:</strong> ${datos.Director}</p>
                <p><strong>Año:</strong> ${datos.Year}</p>
            `;
        } else {
            divResultado.innerHTML = `<p>No se ha encontrado la película.</p>`;
        }

    } catch (error) {
        console.error("Hubo un error con la petición:", error);
    }
});
