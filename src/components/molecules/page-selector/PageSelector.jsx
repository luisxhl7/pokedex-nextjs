import React from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./page-selector.scss";

export const PageSelector = ({
  handleBackPage,
  handleNextPage,
  handleSelectPage,
  totalPage,
  numberPage,
  isLoading,
  pokemons,
}) => {
  return (
    <>
      {!isLoading & (pokemons?.length > 1) ? (
        <div className="page-selector__content-buttons">
          <button
            onClick={handleBackPage}
            className="page-selector__button-arrow"
            title="Pagina anterior"
          >
            <ArrowBackIos />
          </button>

          {totalPage?.map((item) => (
            <button
              key={item}
              onClick={() => handleSelectPage(item)}
              className={`page-selector__content-buttons__btn-page ${
                parseInt(numberPage) === item ? "--active" : ""
              }`}
            >
              {item}
            </button>
          ))}

          <button
            title="Pagina siguiente"
            onClick={handleNextPage}
            className="page-selector__button-arrow"
          >
            <ArrowForwardIos />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
