import axios from "axios";
import { set_isLoading, set_pokemons, set_searchSuccess } from "../slice/getPokemonsSlice";

export const getPokemons_thunks = (pageNumber, setTotalPage) => {
    return async(dispatch, getState) => {
        try {
            dispatch(set_isLoading());
    
            const page = pageNumber ? pageNumber : 1;
            const offset = (page - 1) * 50;
            
            const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
    
            // const totalPages = Math.round(resp?.data?.count / 50);
            // setTotalPage(Array.from(Array.from({ length: totalPages }, (_, index) => index + 1)));
            setTotalPage(Array.from(Array.from({ length: 13 }, (_, index) => index + 1)));
                
            const promises = resp.data.results.map(async (item) => {
                const rest = await axios.get(item.url);
                return rest.data; // Asegúrate de devolver solo la data y no toda la respuesta axios
            });

            const pokemonsData = await Promise.all(promises);
            
            dispatch(set_pokemons({pokemons: pokemonsData}));
            
        } catch (error) {
            dispatch(set_searchSuccess());
        }
    }
}