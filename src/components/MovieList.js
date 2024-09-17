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

        // Print the full response and movies data to the console
        console.log("API Response:", data);
        console.log("Movies Data:", data.result);

        setMovies(data.result);
        setLoading(false);
      } catch (err) {
        // Print error details
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Log whenever the movies state updates
  useEffect(() => {
    console.log("Movies state updated:", movies);
  }, [movies]);

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
          // Log each movie item before rendering it
          console.log("Rendering Movie:", movie);
          return (
            <li key={movie.id} className="movie-item">
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
