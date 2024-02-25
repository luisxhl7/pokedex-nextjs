'use client'

import { Search } from "@mui/icons-material";
import { useForm } from "@/hooks/useForm";
import './PokemonsPage.scss'

const formData = {
  pokemon: '',
}


const PokemonsPage = () => {
  const { pokemon, onInputChange } = useForm(formData)

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
    
    </section>
  );
}

export default PokemonsPage