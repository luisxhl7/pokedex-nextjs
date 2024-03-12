import PokeApiService from "@/services/pokeApiService";
import { set_isLoading, set_pokemons, set_searchSuccess } from "../slice/getPokemonsSlice";

export const searchPokemons_thunks = (id) => {
    return async(dispatch, getState) => {
        try {
            //esta función esta separada de la de pokemonById es por que esta a largo paso filtrara todos los pokemons relacionados con el nombre
            dispatch(set_isLoading());
            const result = await PokeApiService.getPokemonById(id)
            
            dispatch(set_pokemons({pokemons: [result.data]}));
            
        } catch (error) {
            dispatch(set_searchSuccess());
            dispatch(set_pokemons({pokemons: []}));
        }
    }
}
