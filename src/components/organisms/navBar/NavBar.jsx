"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { theme_thunks } from "@/store/thunks/theme-thunks";
import { SearchPokemons } from "@/components/molecules/search-pokemons";
import images from "@/assets";
import "./NavBar.scss";

export const NavBar = () => {
  const { theme } = useSelector( state => state.theme)
  const dispatch = useDispatch();

  const handleViewPokemons = () => {
    dispatch(theme_thunks(true));
  };

  useEffect(() => {
    dispatch(theme_thunks(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <nav className="navbar">
      <Link href="/" title="Pokedex">
        <Image src={images.pokeball} alt="Pokeball" width={40} height={40} />
        Pokedex
      </Link>

      <SearchPokemons className={'--navBar-search'}/>

      <button
        type="button"
        onClick={handleViewPokemons}
        className="navbar__button-view-pokemons"
        title={theme ? "Ocultar Pokemons" : "Mostrar Pokemons"}
      >
        {theme ? <VisibilityOff /> : <Visibility />}
      </button>
    </nav>
  );
};
