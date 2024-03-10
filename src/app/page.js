"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowBackIos, ArrowForwardIos, Search } from "@mui/icons-material";
import { CardPokemon } from "@/components/molecules/card-pokemon";
import { useForm, usePageNavigation } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons_thunks } from "@/store/thunks/pokemons-thunks";
import { getPokemonById_thunks } from "@/store/thunks/pokemonById-thunks";
import Image from "next/image";
import images from "@/assets";
import "./PokemonsPage.scss";

const formData = {
  pokemon: "",
};

const PokemonsPage = (props) => {
  const navigate = useRouter()
  const dispatch = useDispatch()
  const { params, searchParams} = props
  const { pokemons, searchSuccess, isLoading } = useSelector( state => state.pokemons)
  const { numberPage, totalPage, setTotalPage, handleSelectPage, handleBackPage, handleNextPage } = usePageNavigation(params.page)
  const { pokemon, onInputChange } = useForm(formData);
  
  useEffect(() => {
    if (!searchParams.q) {
      dispatch(getPokemons_thunks(params.page, setTotalPage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  useEffect(() => {
    if (searchParams.q) {
      dispatch(getPokemonById_thunks(searchParams.q))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.q]);

  const handleSearchPokemon = async(event) => {
    event.preventDefault()
    try {
      const search = pokemon.replace(/\s/g, '')
    
      if (search.length >= 1 ) {
        navigate.push(`/search?q=${ pokemon.toLowerCase().trim() }`)
      }else{
        console.log('mostrar de nuevo todos los pokemons');
      }
      
    } catch (error) {
      setSucce1ssSearch(false)
    }

  }

  return (
    <section className="PokemonsPage">
      <form onSubmit={handleSearchPokemon} autoComplete="off">
        <div className="PokemonsPage__content-search">
          <Search className="PokemonsPage__content-search__icon-search" />
          <input
            type="text"
            name="pokemon"
            className="PokemonsPage__input"
            onChange={onInputChange}
            value={pokemon}
            placeholder="Busca por número o nombre"
          />
        </div>
      </form>

      <div className="PokemonsPage__content">
        {searchSuccess ? (
          pokemons?.map((item) => (
            <CardPokemon
              key={item?.id}
              id={item?.id}
              isLoading={isLoading}
              name={item?.name}
              image={item?.sprites?.other?.dream_world?.front_default}
            />
          ))
        ) : (
          <div className="PokemonsPage__not-result">
            <h1>No se encontraron resultados</h1>
            <Image
              src={images.pikaTriste}
              alt="Pokeball"
              width='auto'
              height='auto'
            />
          </div>
        )}
      </div>

      {(pokemons?.length > 1) & (searchSuccess === true) ? (
        <div className="PokemonsPage__content-buttons">
          
          <button
            onClick={handleBackPage}
            className="PokemonsPage__button-arrow"
            title="Pagina anterior"
          >
            <ArrowBackIos />
          </button>

          {totalPage?.map((item) => (
            <button
              key={ item }
              onClick={() => handleSelectPage( item )}
              className={`PokemonsPage__content-buttons__btn-page ${
                parseInt(numberPage) ===  item  ? "--active" : ""
              }`}
            >
              {item}
            </button>
          ))}
          
          <button
            title="Pagina siguiente"
            onClick={handleNextPage}
            className="PokemonsPage__button-arrow"
          >
            <ArrowForwardIos />
          </button>

        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default PokemonsPage;
