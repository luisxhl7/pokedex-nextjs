import { NavBar } from "@/components/molecules/navBar";
import "./globals.scss";
import "./PageLayout.scss";

export const metadata = {
  title: "My Pokedex",
  description:
    "Explora una extensa colección de Pokémon con nuestra Pokedex. Encuentra información detallada, estadísticas y características de tus Pokémon favoritos. ¡Sumérgete en el mundo de los Pokémon y descubre todo lo que necesitas para convertirte en un entrenador maestro!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="pageLayout">{children}</main>
      </body>
    </html>
  );
}
