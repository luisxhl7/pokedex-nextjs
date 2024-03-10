"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";
import { CardPokemon } from "@/components/molecules/card-pokemon";
import { useForm, usePageNavigation } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons_thunks } from "@/store/thunks/pokemons-thunks";
import "./PokemonsPage.scss";
import { searchPokemons_thunks } from "@/store/thunks/searchPokemons-thunks";
import { NotResult } from "@/components/molecules/not-result";
import { PageSelector } from "@/components/molecules/page-selector/PageSelector";

const formData = {
  pokemon: "",
};

const PokemonsPage = (props) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { params, searchParams } = props;
  const { pokemons, isLoading } = useSelector((state) => state.pokemons);
  const {
    numberPage,
    totalPage,
    setTotalPage,
    handleSelectPage,
    handleBackPage,
    handleNextPage,
  } = usePageNavigation(params.page);
  const { pokemon, onInputChange } = useForm(formData);

  useEffect(() => {
    if (!searchParams.q) {
      dispatch(getPokemons_thunks(params.page, setTotalPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  useEffect(() => {
    if (searchParams.q) {
      dispatch(searchPokemons_thunks(searchParams.q));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.q]);

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
        {!isLoading ?
          pokemons.length > 0 ?
            pokemons?.map((item) => (
              <CardPokemon
                key={item?.id}
                id={item?.id}
                isLoading={isLoading}
                name={item?.name}
                image={item?.sprites?.other?.dream_world?.front_default}
              />
            ))
            : 
            <NotResult/>
          :
          <>Cargando</>
        }
      </div>

      {!isLoading & pokemons?.length > 1 ?
        <PageSelector
          handleBackPage={handleBackPage}
          handleNextPage={handleNextPage}
          handleSelectPage={handleSelectPage}
          totalPage={totalPage}
          numberPage={numberPage}
        />
        :
        <></>
      }
    </section>
  );
};

export default PokemonsPage;
