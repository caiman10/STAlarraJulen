// Layout raíz: envuelve TODAS las páginas de la carpeta app/.
// Sustituye al index.html y al main.jsx de la práctica 3.

// CSS global (los estilos de la P3), cargado una vez para toda la web
import "./globals.css";

// Next convierte este objeto en <title> y <meta name="description"> dentro del <head>
export const metadata = {
  title: "Mi app de cine",
  description: "Práctica 4 - Frameworks de Back-End con Next.js",
};

// children = la página que toque mostrar (aquí, app/page.js)
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
