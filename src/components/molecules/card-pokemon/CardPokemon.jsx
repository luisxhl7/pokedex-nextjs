import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import images from "@/assets";
import typesPokemons from "@/assets/typesPokemons";
import "./CardPokemon.scss";

export const CardPokemon = ({ isLoading, name, id, image, gif, typeName }) => {
  const { theme } = useSelector((state) => state.theme);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`cardPokemon ${!theme ? "--view-pokemons" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/pokemon/${name}`}
        className="cardPokemon__card"
        alt="Zelda Wind Waker card"
      >
        <div className={`cardPokemon__wrapper --color${typeName?.[0]?.type?.name}`}>
          <div className={`cardPokemon__content --color${typeName?.[0]?.type?.name}`}></div>
          <div className="cardPokemon__content-type">
            {typeName.map( (item, idx) => (
              <Image
                key={idx}
                src={typesPokemons[item?.type?.name] || images.pokeball}
                alt={`icono tipo ${item?.type?.name}`}
                width={20}
                height={20}
                title={item?.type?.name}
              />
            ))}
          </div>
          <Image
            src={gif || images.incognitoSvg}
            alt="gif pokemon"
            width={100}
            height={100}
            loading="lazy"
            className={`cardPokemon__image-pokemon ${gif ? '--gif' : '--image'}`}
          />

        </div>

        {!theme ? (
          <h2
            className={`cardPokemon__title ${isHovered ? "" : "--what-poke"}`}
            title={`#${id} ${name}`}
          >
            {isHovered ? (
              <>
                Es <br /> {name}
              </>
            ) : (
              <>
                ¿Quién es <br /> ese Pokémon?
              </>
            )}
          </h2>
        ) : (
          <h2 className="cardPokemon__title" title={`#${id} ${name}`}>
            #{isLoading ? "????" : id}
            <br />
            {isLoading ? "???????" : name}
          </h2>
        )}

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
            className={`cardPokemon__character ${
              theme ? "--view-pokemons" : ""
            }`}
          />
        )}
      </Link>
    </div>
  );
};
