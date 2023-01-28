import {configureStore} from "@reduxjs/toolkit";
import mangasSlice from "./slices/mangasSlice";
import genreSlice from "./slices/genreSlice";
import mangaSlice from "./slices/mangaSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        mangas: mangasSlice,
        manga: mangaSlice,
        genre: genreSlice
    }
});