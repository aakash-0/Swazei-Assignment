import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMoviesFromApi } from "../../api/movieApi";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ search, page }, { rejectWithValue }) => {
    try {
      const response = await fetchMoviesFromApi(search, page);
      if (response) {
        return {
          movies: response.results,
          totalPages: parseInt(response.total_pages, 10),
        };
      }
    } catch (error) {
      return rejectWithValue(error || "Something went wrong!");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;
