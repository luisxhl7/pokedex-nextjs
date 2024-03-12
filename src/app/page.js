"use client";

import { useEffect } from "react";
import { CardPokemon } from "@/components/molecules/card-pokemon";
import { usePageNavigation } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons_thunks } from "@/store/thunks/pokemons-thunks";
import { searchPokemons_thunks } from "@/store/thunks/searchPokemons-thunks";
import { NotResult } from "@/components/molecules/not-result";
import { PageSelector } from "@/components/molecules/page-selector/PageSelector";
import { SearchPokemons } from "@/components/molecules/search-pokemons";
import "./PokemonsPage.scss";

const PokemonsPage = (props) => {
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

  return (
    <section className="PokemonsPage">
      
      <SearchPokemons/>
      
      <div className="PokemonsPage__content-cards">
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

      <PageSelector
        handleBackPage={handleBackPage}
        handleNextPage={handleNextPage}
        handleSelectPage={handleSelectPage}
        totalPage={totalPage}
        numberPage={numberPage}
        pokemons={pokemons}
        isLoading={isLoading}
      />
    </section>
  );
};

export default PokemonsPage;
