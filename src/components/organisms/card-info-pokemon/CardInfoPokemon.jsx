import React from 'react'
import Image from 'next/image'
import { InfoPokemon } from '@/components/molecules/info-pokemon'
import images from '@/assets'
import './cardInfoPokemon.scss'

export const CardInfoPokemon = ({pokemon, isLoading}) => {
  return (
    <div className='cardInfoPokemon__card-info'>
      <div className='cardInfoPokemon__card-info__section-1'>
        <h1 className='cardInfoPokemon__card-info__title'>
          #{pokemon[0]?.id} {pokemon[0]?.name}
        </h1>
        <Image
          src={pokemon[0]?.sprites?.other?.dream_world?.front_default || images.pokeball}
          alt= {isLoading ? 'cargando' : `pokemon ${pokemon[0]?.name}`}
          title={isLoading ? 'cargando' : `pokemon ${pokemon[0]?.name}`}
          width={50}
          height={50}
          className='cardInfoPokemon__card-info__section-1__image'
        />
      </div>

      <InfoPokemon types={pokemon[0]?.types} stats={pokemon[0]?.stats} isLoad={isLoading}/>
    
    </div>
  )
}
