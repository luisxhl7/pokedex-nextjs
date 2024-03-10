import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./slice/getPokemonsSlice";
import pokemonByIdReducer from "./slice/getPokemonByIdSlice";

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        pokemonById: pokemonByIdReducer
    },
})
