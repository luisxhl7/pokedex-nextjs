"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowBackIos, ArrowForwardIos, Search } from "@mui/icons-material";
import { CardPokemon } from "@/components/molecules/card-pokemon";
import images from "@/assets";
import "./PokemonsPage.scss";
import { useForm, usePageNavigation } from "@/hooks";

const formData = {
  pokemon: "",
};

const PokemonsPage = ({ params }) => {
  const router = useRouter();
  const { pokemon, onInputChange } = useForm(formData);
  const [successSearch, setSuccessSearch] = useState(true);
  const { totalPage, setTotalPage, handleSelectPage, handleBackPage, handleNextPage } = usePageNavigation(params.page)
  const [pokemons, setPokemons] = useState();
  const [numberPage, setNumberPage] = useState(params.page);

  useEffect(() => {
    getPokemons(params.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  const getPokemons = async (pageNumber) => {
    try {
      const page = (await pageNumber) ? pageNumber : 1;

      setSuccessSearch(true);
      const offset = (page - 1) * 100;

      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`
      );

      const pages = Math.round(result?.data?.count / 100);
      setTotalPage(
        Array.from(Array.from({ length: pages }, (_, index) => index + 1))
      );
      setPokemons(result?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="PokemonsPage">
      <form autoComplete="off">
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
        {successSearch ? (
          pokemons?.map((item, idx) => (
            <CardPokemon
              key={idx}
              id={item?.id}
              name={item?.name}
              url={item?.url}
            />
          ))
        ) : (
          <div className="PokemonsPage__not-result">
            <h1>No se encontraron resultados</h1>
            <Image
              src={images.pikaTriste}
              alt="Pokeball"
              width={40}
              height={40}
            />
          </div>
        )}
      </div>

      {(pokemons?.length > 1) & (successSearch === true) ? (
        <div className="PokemonsPage__content-buttons">
          <button
            onClick={handleBackPage}
            className="PokemonsPage__button-arrow"
          >
            <ArrowBackIos />
          </button>
          {totalPage?.map((item, idx) => (
            <button
              key={1 + idx}
              onClick={() => handleSelectPage(1 + idx)}
              className={`${
                parseInt(numberPage) === 1 + idx ? "--active" : ""
              }`}
            >
              {1 + idx}
            </button>
          ))}
          <button
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
