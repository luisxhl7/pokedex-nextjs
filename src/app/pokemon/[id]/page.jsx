'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardButtonPokemon } from '@/components/molecules/card-button-pokemon'
import { getPokemonById_thunks } from '@/store/thunks/pokemonById-thunks'
import { NotResult } from '@/components/molecules/not-result'
import { InfoPokemon } from '@/components/organisms/info-pokemon'
import './Pokemon.scss'

const PokemonPage = ({params}) => {
  const dispatch = useDispatch()
  const { pokemonsById, searchSuccess, isLoading } = useSelector( state => state.pokemonsById)
  const [ optionsPokemons, setOptionsPokemons ] = useState([])

  useEffect(() => {
    dispatch(getPokemonById_thunks(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])
  
  useEffect(() => {
    let pokemonOptionsList = [];
    for (let i = pokemonsById[0]?.id; i < pokemonsById[0]?.id + 4; i++) {
      pokemonOptionsList.push((i + 1));
    }
    setOptionsPokemons(pokemonOptionsList)
  }, [pokemonsById])
  
  return (
    <section className='pokemon'>
      {searchSuccess ?
        <>
          <InfoPokemon pokemon={pokemonsById} isLoading={isLoading}/>
          <div className='pokemon__content-buttons-pokemons'>
            {optionsPokemons.map( (item, idx) => (
              <CardButtonPokemon id={item} key={idx}/>
              ))}
          </div>
        </>
        :
        <NotResult/>
      }
    </section>
  )
}

export default PokemonPage