import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";
import { useForm } from "@/hooks";
import './searchPokemons.scss'

const formData = {
  pokemon: "",
};

export const SearchPokemons = ({className}) => {
    const navigate = useRouter();
    const { pokemon, onInputChange, onResetForm } = useForm(formData);

    const handleSearchPokemon = async (event) => {
        event.preventDefault();
        try {
            const search = pokemon.replace(/\s/g, "");

            if (search.length >= 1) {
                navigate.push(`/search?q=${pokemon.toLowerCase().trim()}`);
                onResetForm()
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSearchPokemon} autoComplete="off" className={`search ${className ? className : ''}`}>
            <div className="search__content-search">
                <Search className='search__content-search__icon-search' />
                <input
                    type="text"
                    name="pokemon"
                    className="search__input"
                    onChange={onInputChange}
                    value={pokemon}
                    placeholder="Busca por número o nombre"
                />
            </div>
        </form>
    );
};
