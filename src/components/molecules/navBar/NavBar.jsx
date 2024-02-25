"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import images from '@/assets';
import './NavBar.scss'
import Image from 'next/image';


const handleViewPokemons = () => {
  const newValue = !JSON.parse(localStorage.getItem('viewPokemons'));
  localStorage.setItem('viewPokemons', JSON.stringify(newValue));
  window.location.reload();
};

export const NavBar = () => {
  const [viewPokemons, setViewPokemons] = useState(false);

  useEffect(() => {
    const storedViewPokemons = localStorage.getItem('viewPokemons');
    
    if (storedViewPokemons !== null) {
      setViewPokemons(JSON.parse(storedViewPokemons));
    }

  }, []);
  
  return (
    <nav className='navbar'>

      <Link href='/' title='Pokedex'>
        <Image src={images.pokeball} alt="Pokeball" width={40} height={40} />
        Pokedex
      </Link>
      
      <button type='button'
        onClick={handleViewPokemons} 
        className='navbar__button-view-pokemons'
        title={viewPokemons  ? 'Ocultar Pokemons' : 'Mostrar Pokemons'}
      >
        {viewPokemons ?
          <VisibilityOff/>
          :
          <Visibility/>
        }
      </button>
    </nav>
  )
}
