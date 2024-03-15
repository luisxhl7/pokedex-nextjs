import { Providers } from "@/store/providers";
import { NavBar } from "@/components/organisms/navBar";
import "./globals.scss";
import "./index.scss";

export const metadata = {
  title: "My Pokedex",
  description:
    "Explora una extensa colección de Pokémon con nuestra Pokedex. Encuentra información detallada, estadísticas y características de tus Pokémon favoritos. ¡Sumérgete en el mundo de los Pokémon y descubre todo lo que necesitas para convertirte en un entrenador maestro!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <NavBar />
          <main className="pageLayout" id="pageLayout">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
