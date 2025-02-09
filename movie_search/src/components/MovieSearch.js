import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  setSearchQuery,
  setCurrentPage,
} from "../redux/slices/movieSlice";
import "../styles/MovieSearch.css";

const MovieSearch = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, searchQuery, currentPage, totalPages } =
    useSelector((state) => state.movies);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(setSearchQuery(query));
      dispatch(fetchMovies({ search: query, page: 1 }));
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchMovies({ search: searchQuery, page: newPage }));
  };

  const renderPageNumbers = () => {
    let pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-number ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="container">
      <h2>Movie Search</h2>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {error && <p className="error">Error: {error}</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {renderPageNumbers()}

          <button
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
