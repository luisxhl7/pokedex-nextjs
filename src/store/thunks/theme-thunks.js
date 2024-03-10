import { set_selectTheme } from "../slice/themeSlice";

export const theme_thunks = (change) => {
    return async(dispatch, getState) => {
        try {
            const localState = await JSON.parse(localStorage.getItem('viewPokemons'))

            const theme = change ? !JSON.parse(localState) : JSON.parse(localState) || getState().theme.theme;

            localStorage.setItem('viewPokemons', theme);

            dispatch(set_selectTheme({ theme }));
        } catch (error) {
            console.log(error);
        }
    }
}
