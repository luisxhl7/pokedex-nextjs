import React from "react";
import Link from "next/link";
import Image from "next/image";
import images from "@/assets";
import "./notResult.scss";

export const NotResult = () => {
  return (
    <div className="pokemon__not-result">
        <h1>No se encontraron resultados</h1>
        <Link
            href="/"
            className="pokemon__not-result__link"
            title="Volver al inicio"
        >
            Volver al inicio
        </Link>
        <Image
            src={images.pikaTriste}
            alt="Pokeball"
            width="auto"
            height="auto"
        />
    </div>
  );
};
