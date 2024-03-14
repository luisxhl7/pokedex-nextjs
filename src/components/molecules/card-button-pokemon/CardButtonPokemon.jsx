import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import incognito from '@/assets/incognito.svg'
import './CardButtonPokemon.scss'

export const CardButtonPokemon = ({id}) => {
  const [pokemon, setPokemon] = useState()
  
  const getPokemon = async() => {
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      await setPokemon(result?.data)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return(
    <div className='CardButtonPokemon'>
      <Link href={`/pokemon/${pokemon?.name}`}>
        <h3>#{pokemon?.id} {pokemon?.name}</h3>          
        <Image src={
          pokemon?.sprites?.other?.dream_world?.front_default 
          ?
          pokemon?.sprites?.other?.dream_world?.front_default 
          :
          incognito
        }
          width={50}
          height={50}
          alt={`pokemon ${pokemon?.name}`}
          title={`pokemon ${pokemon?.name}`}
          className='CardButtonPokemon__image'
        />
      </Link>
    </div>
  )
}