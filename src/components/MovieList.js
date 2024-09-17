import React, { useEffect, useState } from "react";
import "../css/MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://hoblist.com/api/movieList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: "movies",
            language: "kannada",
            genre: "all",
            sort: "voting",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if 'result' exists and is an array
        if (data.result && Array.isArray(data.result)) {
          setMovies(data.result);
        } else {
          throw new Error("Invalid data format");
        }
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch movies: ${err.message}`);
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
        {movies.map((movie) => (
          <li key={movie._id} className="movie-item">
            <strong className="movie-title">{movie.title}</strong>
            <p className="movie-info">Director: {movie.director}</p>
            <p className="movie-info">Stars: {movie.stars}</p>
            <p className="movie-info">Genre: {movie.genre}</p>
            <p className="movie-info">Language: {movie.language}</p>
            <p className="movie-info">Votes: {movie.voting}</p>
            <button className="vote-btn">Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
