import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navigation from "./header/navigation";
import Footer from "./Footer";

export default function Genres() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("movie");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchByGenre = async (page) => {
    try {
      setLoading(true);
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=8c17983b4cac457349207fb55ae925ad&with_genres=${id}&page=${page}`
      );
      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=8c17983b4cac457349207fb55ae925ad&with_genres=${id}&page=${page}`
      );

      if (selectedType === "movie") {
        setMovies((prevMovies) => [
          ...prevMovies,
          ...movieResponse.data.results,
        ]);
        setTotalPages(movieResponse.data.total_pages);
      } else {
        setTvShows((prevTvShows) => [
          ...prevTvShows,
          ...tvResponse.data.results,
        ]);
        setTotalPages(tvResponse.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching data by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchByGenre(page);
  }, [id, selectedType, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (page < totalPages && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages]);

  if (loading && page === 1) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-6 py-10 text-white mt-20 md:mt-10">
        {/* 🔹 دکمه‌های انتخاب بین فیلم‌ها و سریال‌ها */}
        <div className="flex justify-center gap-4 mb-6 md:mt-0">
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedType === "movie"
                ? "bg-rose-700 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => {
              setSelectedType("movie");
              setMovies([]);
              setPage(1);
            }}
          >
            🎬 Movies
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedType === "tv"
                ? "bg-rose-700 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => {
              setSelectedType("tv");
              setTvShows([]);
              setPage(1);
            }}
          >
            📺 TV Shows
          </button>
        </div>

        {/* 🔹 نمایش لیست فیلم‌ها */}
        {selectedType === "movie" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">🎬 Movies</h2>
            {movies.length === 0 ? (
              <p className="text-gray-400">
                ❌There are no movies in this genre!
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="w-40 h-52 min-w-40 min-h-52 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="ml-4 flex flex-col gap-2 max-h-56 overflow-hidden">
                      <h3 className="text-xl font-semibold">{movie.title}</h3>
                      <p className="text-gray-400">
                        📅 {movie.release_date || "No Date"}
                      </p>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {movie.overview || "No overview available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* 🔹 نمایش لیست سریال‌ها */}
        {selectedType === "tv" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">📺 TV Shows</h2>
            {tvShows.length === 0 ? (
              <p className="text-gray-400">
                ❌There are no TvShows in this genre!
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {tvShows.map((tv) => (
                  <div
                    key={tv.id}
                    className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
                      alt={tv.name}
                      className="w-40 h-52 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex flex-col gap-2 max-h-56 overflow-hidden">
                      <h3 className="text-xl font-semibold">{tv.name}</h3>
                      <p className="text-gray-400">
                        📅 {tv.first_air_date || "No Date"}
                      </p>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {tv.overview || "No overview available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {loading && page > 1 && (
        <div className="text-center mt-4">Loading more...</div>
      )}
      <Footer />
    </>
  );
}
