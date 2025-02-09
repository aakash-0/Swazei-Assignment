import axios from "axios";

export const fetchMoviesFromApi = async (query, page = 1) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: "a047cc5055de03fb91578ebcb59a6398",
        query: query,
        page: page,
      },
    }
  );
  return response.data;
};
