import React from "react";
import images from "@/assets";
import { InfoStatsPokemon } from "@/components/molecules/info-stats-pokemon";
import { Image3D } from "@/components/atoms/image-3d/Image3d";
import "./cardInfoPokemon.scss";

export const CardInfoPokemon = ({ pokemon, isLoading }) => {
  
  return (
    <div className="cardInfoPokemon__card-info">
      <div className="cardInfoPokemon__card-info__section-1">
        <h1 className="cardInfoPokemon__card-info__title">
          #{pokemon[0]?.id} {pokemon[0]?.name}
        </h1>
        <div
          className={`cardInfoPokemon__card-info__content-arena --color${pokemon[0]?.types[0]?.type?.name}`}
        ></div>
        <Image3D 
          image={
            pokemon[0]?.sprites?.other?.dream_world?.front_default ||
            images.incognitoSvg
          }
          alt={isLoading ? "cargando" : `${pokemon[0]?.name}`}
          title={isLoading ? "cargando" : `${pokemon[0]?.name}`}
          width={50}
          height={50}
          className="cardInfoPokemon__card-info__section-1__image"
        />
      </div>

      <InfoStatsPokemon
        types={pokemon[0]?.types}
        stats={pokemon[0]?.stats}
        isLoad={isLoading}
      />
    </div>
  );
};
