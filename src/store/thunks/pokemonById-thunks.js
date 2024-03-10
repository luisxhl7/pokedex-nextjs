import axios from "axios";
import { set_isLoading, set_pokemons, set_searchSuccess } from "../slice/getPokemonsSlice";

export const getPokemonById_thunks = (id) => {
    return async(dispatch, getState) => {
        try {
            dispatch( set_isLoading() );
    
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

            console.log(result.data);
            dispatch( set_pokemons({pokemons: [result.data]}) );

            
        } catch (error) {
            dispatch(set_searchSuccess())
        }
    }
}
