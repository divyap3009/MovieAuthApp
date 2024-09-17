import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post("https://hoblist.com/api/movieList", {
          category: "movies",
          language: "kannada",
          genre: "all",
          sort: "voting",
        });

        setMovies(response.data.result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="movie-list-container">
      <h2 className="movie-title">Movie List</h2>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie._id} className="movie-item">
              <strong className="movie-title">{movie.title}</strong>
              <p className="movie-info">Genre: {movie.genre}</p>
              <p className="movie-info">Votes: {movie.votes}</p>
              <button className="vote-btn">Vote</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
