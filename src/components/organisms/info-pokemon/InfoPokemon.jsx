import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { CardInfoPokemon } from '@/components/molecules/card-info-pokemon'
import './infoPokemon.scss'

export const InfoPokemon = ({ pokemon, isLoading}) => {
    const navigate = useRouter()

    const getPokemonAndNavigate = async (pokemon) => {
        if (pokemon >= 1 && pokemon <= 10276) {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                navigate.push(`/pokemon/${result?.data?.name}`);
            } catch (error) {
                console.log(error);
            }
        }
    };
      
    const handleBackPokemon = async () => {
        const backPokemonId = pokemon[0]?.id - 1;
        await getPokemonAndNavigate(backPokemonId);
    };
      
    const handleNextPokemon = async () => {
        const nextPokemonId = pokemon[0]?.id + 1;
        await getPokemonAndNavigate(nextPokemonId);
    };

    return (
        <div className='infoPokemon__content-info'>
            <button 
                onClick={handleBackPokemon}
                className='infoPokemon__button'
            >
                <ArrowBackIosNew/>
            </button>

            <CardInfoPokemon pokemon={pokemon} isLoading={isLoading}/>

            <button 
                onClick={handleNextPokemon}
                className='infoPokemon__button'
            >
                <ArrowForwardIos/>
            </button>

            <div className='infoPokemon__content-buttons'>
                <button 
                    onClick={handleBackPokemon}
                    className='infoPokemon__button-mobile'
                >
                    <ArrowBackIosNew/>
                </button>
                <button 
                    onClick={handleNextPokemon}
                    className='infoPokemon__button-mobile'
                >
                    <ArrowForwardIos/>
                </button>
            </div>
        </div>
    )
}
