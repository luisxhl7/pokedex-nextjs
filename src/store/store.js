import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./slice/getPokemonsSlice";
import pokemonByIdReducer from "./slice/getPokemonByIdSlice";
import themeReducer from "./slice/themeSlice";

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        pokemonsById: pokemonByIdReducer,
        theme: themeReducer
    },
})
