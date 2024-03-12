import React from "react";
import { useForm } from "@/hooks";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import './searchPokemons.scss'

const formData = {
  pokemon: "",
};

export const SearchPokemons = () => {
    const navigate = useRouter();
    const { pokemon, onInputChange } = useForm(formData);

    const handleSearchPokemon = async (event) => {
        event.preventDefault();
        try {
        const search = pokemon.replace(/\s/g, "");

        if (search.length >= 1) {
            navigate.push(`/search?q=${pokemon.toLowerCase().trim()}`);
        } else {
            console.log("mostrar de nuevo todos los pokemons");
        }
        } catch (error) {
        setSucce1ssSearch(false);
        }
    };

    return (
        <form onSubmit={handleSearchPokemon} autoComplete="off" className="search">
            <div className="search__content-search">
                <Search className="search__content-search__icon-search" />
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
