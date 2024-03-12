'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import axios from 'axios'
import { CardButtonPokemon } from '@/components/molecules/card-button-pokemon'
import { InfoPokemon } from '@/components/molecules/info-pokemon'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById_thunks } from '@/store/thunks/pokemonById-thunks'
import { NotResult } from '@/components/molecules/not-result'
import images from '@/assets'
import './Pokemon.scss'

const PokemonPage = ({params}) => {
  const navigate = useRouter()
  const dispatch = useDispatch()
  const { pokemonsById, searchSuccess, isLoading } = useSelector( state => state.pokemonsById)
  const [ optionsPokemons, setOptionsPokemons ] = useState([])

  const getPokemonAndNavigate = async (pokemonId) => {
    if (pokemonId >= 1 && pokemonId <= 10276) {
      try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        await navigate.push(`/pokemon/${result?.data?.name}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const handleBackPokemon = async () => {
    const backPokemonId = pokemonsById[0]?.id - 1;
    await getPokemonAndNavigate(backPokemonId);
  };
  
  const handleNextPokemon = async () => {
    const nextPokemonId = pokemonsById[0]?.id + 1;
    await getPokemonAndNavigate(nextPokemonId);
  };

  useEffect(() => {
    dispatch(getPokemonById_thunks(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])
  
  useEffect(() => {
    let miArray = [];
    for (let i = pokemonsById[0]?.id; i < pokemonsById[0]?.id + 4; i++) {
      miArray.push((i + 1));
    }
    setOptionsPokemons(miArray)
  }, [pokemonsById])
  
  return (
    <section className='pokemon'>
      {!isLoading & searchSuccess ?
        <>
          <div className='pokemon__content-info'>
            <button 
              onClick={handleBackPokemon}
              className='pokemon__button'
            >
              <ArrowBackIosNew/>
            </button>
            <div className='pokemon__card-info'>
              <div className='pokemon__card-info__section-1'>
                <h1 className='pokemon__card-info__title'>
                  #{pokemonsById[0]?.id} {pokemonsById[0]?.name}
                </h1>
                <figure>
                  <Image
                    src={pokemonsById[0]?.sprites?.other?.dream_world?.front_default || images.pokeball}
                    alt= {isLoading ? 'cargando' : `pokemon ${pokemonsById[0]?.name}`}
                    title={isLoading ? 'cargando' : `pokemon ${pokemonsById[0]?.name}`}
                    width={50}
                    height={50}
                    className='pokemon__card-info__section-1__image'
                  />
                </figure>
              </div>
              <InfoPokemon types={pokemonsById[0]?.types} stats={pokemonsById[0]?.stats} isLoad={isLoading}/>
            </div>

            <button 
              onClick={handleNextPokemon}
              className='pokemon__button'
            >
              <ArrowForwardIos/>
            </button>
            <div className='pokemon__content-buttons'>
              <button 
                onClick={handleBackPokemon}
                className='pokemon__button-mobile'
              >
                <ArrowBackIosNew/>
              </button>
              <button 
                onClick={handleNextPokemon}
                className='pokemon__button-mobile'
              >
                <ArrowForwardIos/>
              </button>
            </div>
          </div>

          <div className='pokemon__content-buttons-pokemons'>
            {optionsPokemons.map( (item, idx) => (
              <CardButtonPokemon id={item} key={idx}/>
            ))}
          </div>
        </>
        :
        !isLoading &&
        <NotResult/>
      }
      
    </section>
  )
}

export default PokemonPage