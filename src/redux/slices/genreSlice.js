import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {URL} from "./mangasSlice";

const initialState = {
    genre: []
};

export const getGenres = createAsyncThunk('getGenres', async (_, {dispatch}) => {
    const {data} = await axios.get(URL+'genre/');
    dispatch(setGenre(data))
});

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        setGenre( state, action ) {
            state.genre = action.payload
        },
    },
});

export default genreSlice.reducer;
export const { setGenre } = genreSlice.actions;