import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: false,
    },
    reducers: {
        set_selectTheme: ( state, action ) => {
            state.theme = action.payload.theme
        },
    },
})

export const { set_selectTheme } = themeSlice.actions;

export default themeSlice.reducer;