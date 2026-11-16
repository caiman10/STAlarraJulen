import { Suspense } from "react";
// "@/" es un atajo a la raíz del proyecto (definido en jsconfig.json)
import { Catalogo } from "@/components/Catalogo";

// Componente de servidor. La categoría elegida viaja en la URL (/?categoria=Animacion),
// así el servidor sabe qué películas tiene que pedir a la API antes de generar la página.
// Next pasa searchParams automáticamente a toda page.js; en Next 16 es una promesa.
export default function Home({ searchParams }) {
  return (
    <div className="contenedor-principal">
      {/* Parte estática: no depende de datos, se envía al momento */}
      <h1 className="titulo-principal">Mi app de cine</h1>

      {/* Suspense muestra el fallback mientras Catalogo espera a la API.
          En Next 16 (cacheComponents) es obligatorio alrededor de lo que pide datos. */}
      <Suspense fallback={<p>Cargando datos del servidor...</p>}>
        <Catalogo searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
