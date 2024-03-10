import axios from "axios";
import { set_selectTheme } from "../slice/themeSlice";

export const theme_thunks = (id) => {
    return async(dispatch, getState) => {
        try {
            const localState = !JSON.parse(localStorage.getItem('viewPokemons'))
            const theme = localState ? localState : !getState().theme.theme
            localStorage.setItem('viewPokemons', theme)
            
            dispatch(set_selectTheme({theme: theme}));
        } catch (error) {
            dispatch(set_searchSuccess())
        }
    }
}
