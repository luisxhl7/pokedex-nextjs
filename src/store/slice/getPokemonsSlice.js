import { createSlice } from '@reduxjs/toolkit'

export const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState: {
        pokemons: [],
        isLoading: false,
        searchSuccess: true
    },
    reducers: {
        set_isLoading: ( state, action ) => {
            state.isLoading = true
        },
        set_searchSuccess: ( state, action ) => {
            state.isLoading = false
        },
        set_pokemons: ( state, action ) => {
            state.pokemons = action.payload.pokemons
            state.isLoading = false
            state.searchSuccess = true
        }
    },
})

export const { set_isLoading, set_searchSuccess, set_pokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;