import axios from "axios";
import { set_isLoading, set_pokemons, set_searchSuccess } from "../slice/getPokemonsSlice";
import PokeApiService from "@/services/pokeApiService";

export const getPokemons_thunks = (pageNumber, setTotalPage) => {
    return async(dispatch, getState) => {
        try {
            dispatch(set_isLoading());
    
            const page = pageNumber ? pageNumber : 1;
            const offset = (page - 1) * 100;
            
            const resp = await PokeApiService.getPokemonList(offset)
            
            const totalPages = Math.round(resp?.data?.count / 100);
            setTotalPage(Array.from(Array.from({ length: totalPages }, (_, index) => index + 1)));
                
            const promises = resp.data.results.map(async (item) => {
                const rest = await axios.get(item.url);
                return rest.data;
            });

            const pokemonsData = await Promise.all(promises);
            
            dispatch(set_pokemons({pokemons: pokemonsData}));
            
        } catch (error) {
            dispatch(set_searchSuccess());
        }
    }
}
