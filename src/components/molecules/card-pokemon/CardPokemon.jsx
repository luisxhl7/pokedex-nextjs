import React, { useEffect, useState } from "react";
import incognito from "../../../assets/incognito.svg";
import Link from "next/link";
import axios from "axios";
import images from "@/assets";
import Image from "next/image";
import "./CardPokemon.scss";

export const CardPokemon = ({ name, url, id }) => {
  const [pokemon, setPokemon] = useState();
  const [isLoad, setIsLoad] = useState(true);

  const getPokemon = async () => {
    try {
      setIsLoad(true);
      setTimeout(async () => {
        const result = await axios.get(
          url ? url : `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        setPokemon(result.data);
        setIsLoad(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div className="cardPokemon">
      <Link href={`/pokemon/${name}`}>
        <h2>
          #{isLoad ? "????" : pokemon?.id}
          <br />
          {isLoad ? "???????" : pokemon?.name}
        </h2>
        {isLoad ? (
          <Image
            src={images.pokeball}
            alt="Pokeball"
            width={150}
            height={150}
            priority
            className={`cardPokemon__pokeLoad ${
              JSON.parse(localStorage.getItem("viewPokemons"))
                ? "--view-pokemons"
                : ""
            }`}
          />
        ) : (
          <Image
            src={
              pokemon?.sprites?.other?.dream_world?.front_default
                ? pokemon?.sprites?.other?.dream_world?.front_default
                : incognito
            }
            alt={pokemon?.name}
            title={pokemon?.name}
            width={150}
            height={150}
            loading="lazy"
            className={`cardPokemon__pokemon ${
              JSON.parse(localStorage.getItem("viewPokemons"))
                ? "--view-pokemons"
                : ""
            }`}
          />
        )}
      </Link>
    </div>
  );
};
