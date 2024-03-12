import axios from "axios"
import * as endPoints from '../constants/api-constants'


class PokeApiService {

  static getPokemonById = async (id) => {
    return axios.get(`${endPoints.getPokemonById}/${id}`);
  }

  static getPokemonList = async (offset) => {
    return axios.get(`${endPoints.getPokemonList}${offset}`);
  }
}

export default PokeApiService;