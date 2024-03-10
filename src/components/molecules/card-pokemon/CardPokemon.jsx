import React from "react";
import incognito from "../../../assets/incognito.svg";
import Link from "next/link";
import images from "@/assets";
import Image from "next/image";
import "./CardPokemon.scss";
import { useSelector } from "react-redux";

export const CardPokemon = ({ isLoading, name, id, image }) => {
  const { theme } = useSelector( state => state.theme)

  return (
    <div className="cardPokemon">
      <Link href={`/pokemon/${name}`}>
        <h2>
          #{isLoading ? "????" : id}
          <br />
          {isLoading ? "???????" : name}
        </h2>
        {isLoading ? (
          <Image
            src={images.pokeball}
            alt="Pokeball"
            width={150}
            height={150}
            priority
            className={`cardPokemon__pokeLoad ${
              theme
                ? "--view-pokemons"
                : ""
            }`}
          />
        ) : (
          <Image
            src={image ? image : incognito}
            alt={name}
            title={name}
            width={150}
            height={150}
            loading="lazy"
            className={`cardPokemon__pokemon ${
              theme
                ? "--view-pokemons"
                : ""
            }`}
          />
        )}
      </Link>
    </div>
  );
};
