'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Search } from "@mui/icons-material";
import { useForm } from "@/hooks/useForm";
import { CardPokemon } from "@/components/molecules/card-pokemon";
import images from "@/assets";
import './PokemonsPage.scss'

const formData = {
  pokemon: '',
}

const PokemonsPage = ({ params }) => {
  const [successSearch, setSuccessSearch] = useState(true);
  const { pokemon, onInputChange } = useForm(formData)
  const [pokemons, setPokemons] = useState()
  
  useEffect(() => {
    getPokemons(params.page);
  }, [params.page])
  
  
  const getPokemons = async(pageNumber) => {
    try {
      const page = await pageNumber ? pageNumber : 1

      setSuccessSearch(true)
      const offset = (page - 1 ) * 100;
      
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
      
      console.log(result);
      // const pages = Math.round(result?.data?.count / 100)
      // setTotalPage(Array.from(Array.from({ length: pages}, (_, index) => index + 1)))
      setPokemons(result?.data?.results)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='PokemonsPage'>
      
      <form autoComplete='off'>
        <div className='PokemonsPage__content-search'>
          <Search className='PokemonsPage__content-search__icon-search'/>
          <input
            type="text"
            name="pokemon"
            className='PokemonsPage__input'
            onChange={onInputChange}
            value={pokemon}
            placeholder='Busca por número o nombre'
          />      
        </div>
      </form>

      <div className='PokemonsPage__content'>
        {successSearch ?
          pokemons?.map( (item, idx) => (
            <CardPokemon 
              key={idx} 
              id={item?.id}
              name={item?.name}
              url={item?.url} 
            />
          ))
        :
        <div className='PokemonsPage__not-result'>
          <h1>No se encontraron resultados</h1>
          <Image src={images.pikaTriste} alt="Pokeball" width={40} height={40} />
        </div>
        }
      </div>
    
    </section>
  );
}

export default PokemonsPage