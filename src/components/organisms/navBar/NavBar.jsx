"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import images from "@/assets";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { theme_thunks } from "@/store/thunks/theme-thunks";
import "./NavBar.scss";

export const NavBar = () => {
  const { theme } = useSelector( state => state.theme)
  const dispatch = useDispatch();

  const handleViewPokemons = () => {
    dispatch(theme_thunks());
  };

  return (
    <nav className="navbar">
      <Link href="/" title="Pokedex">
        <Image src={images.pokeball} alt="Pokeball" width={40} height={40} />
        Pokedex
      </Link>

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
