import axios from "axios";
import { set_isLoading, set_pokemons, set_searchSuccess } from "../slice/getPokemonByIdSlice";

export const getPokemonById_thunks = (id) => {
    return async(dispatch, getState) => {
        try {
            dispatch( set_isLoading() );
    
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

            dispatch( set_pokemons({pokemonsById: [result.data]}) );
            
        } catch (error) {
            dispatch(set_searchSuccess())
        }
    }
}
