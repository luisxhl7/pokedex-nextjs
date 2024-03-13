import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import images from "@/assets";
import typesPokemons from "@/assets/typesPokemons";
import "./CardPokemon.scss";

export const CardPokemon = ({ isLoading, name, id, image, gif, urlType }) => {
  const { theme } = useSelector((state) => state.theme);
  const [typePokemon, setTypePokemon] = useState();

  const getInfoUrl = async () => {
    const resp = await axios.get(urlType);
    setTypePokemon(resp?.data?.names[5]?.name);
  };

  useEffect(() => {
    if (urlType) {
      getInfoUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <div className="cardPokemon">
    //   <Link href={`/pokemon/${name}`}>
    //     <h2>
    //       #{isLoading ? "????" : id}
    //       <br />
    //       {isLoading ? "???????" : name}
    //     </h2>
    //     {isLoading ? (
    //       <Image
    //         src={images.pokeball}
    //         alt="Pokeball"
    //         width={150}
    //         height={150}
    //         priority
    //         className={`cardPokemon__pokeLoad ${
    //           theme
    //             ? "--view-pokemons"
    //             : ""
    //         }`}
    //       />
    //     ) : (
    //       <Image
    //         src={image ? image : incognito}
    //         alt={name}
    //         title={name}
    //         width={150}
    //         height={150}
    //         loading="lazy"
    //         className={`cardPokemon__pokemon ${
    //           theme
    //             ? "--view-pokemons"
    //             : ""
    //         }`}
    //       />
    //     )}
    //   </Link>
    // </div>
    <div className="cardPokemon">
      <Link href={`/pokemon/${name}`} 
        className="card"
        alt="Zelda Wind Waker card"
      >
        <div className={`wrapper --color${typePokemon}`}>
          <div className={`content --color${typePokemon}`}></div>
          <Image
            src={typesPokemons[typePokemon] || images.pokeball}
            alt="icono tipo de pokemon"
            width={20}
            height={20}
            title={typePokemon}
            className='type-pokemon'
          />
          {gif ?
            <Image
              src={gif}
              alt="gif pokemon"
              width={10}
              height={100}
              className={`image-pokemon ${theme ? "--view-pokemons" : ""}`}
            />
            :
            <Image
              src={images.incognitoSvg}
              alt={name}
              title={name}
              width={170}
              height={170}
              loading="lazy"
              className={`image-pokemon ${theme ? "--view-pokemons" : ""}`}
            />
          }
        </div>
        <h2 className="title" title={`#${id} ${name}`}>
          #{isLoading ? "????" : id}
          <br />
          {isLoading ? "???????" : name}
        </h2>
        {isLoading ? (
          <Image
            src={images.pokeball}
            alt="Pokeball"
            width={170}
            height={170}
            priority
            className={`cardPokemon__pokeLoad ${
              theme ? "--view-pokemons" : ""
            }`}
          />
        ) : (
          <Image
            src={image ? image : images.incognitoSvg}
            alt={name}
            title={name}
            width={170}
            height={170}
            loading="lazy"
            className={`character ${theme ? "--view-pokemons" : ""}`}
          />
        )}
      </Link>
    </div>
  );
};
