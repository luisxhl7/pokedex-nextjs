'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import axios from 'axios'
import { CardButtonPokemon } from '@/components/molecules/card-button-pokemon'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById_thunks } from '@/store/thunks/pokemonById-thunks'
import { NotResult } from '@/components/molecules/not-result'
import { CardInfoPokemon } from '@/components/organisms/card-info-pokemon'
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
        navigate.push(`/pokemon/${result?.data?.name}`);
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
            <CardInfoPokemon pokemon={pokemonsById} isLoading={isLoading}/>

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