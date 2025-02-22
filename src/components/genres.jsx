import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navigation from "./header/navigation";
import Footer from "./Footer";

export default function Genres() {
  const { type, id } = useParams(); // دریافت ID ژانر از URL
  const [movies, setMovies] = useState([]); // لیست فیلم‌ها
  const [tvShows, setTvShows] = useState([]); // لیست سریال‌ها
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByGenre = async () => {
      try {
        // دریافت لیست فیلم‌های مرتبط با ژانر
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=8c17983b4cac457349207fb55ae925ad&with_genres=${id}`
        );

        // دریافت لیست سریال‌های مرتبط با ژانر
        const tvResponse = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=8c17983b4cac457349207fb55ae925ad&with_genres=${id}`
        );

        setMovies(moviesResponse.data.results);
        setTvShows(tvResponse.data.results);
      } catch (error) {
        console.error("Error fetching data by genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchByGenre();
  }, [id]);

  

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-6 py-10 text-white mt-15">
        {/* بخش فیلم‌ها بالاتر قرار گرفت */}
        <h2 className="text-2xl font-semibold mb-4">🎬 Movies</h2>
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
                  className="w-40 h-52 object-cover rounded-lg cursor-pointer"
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

        {/* فاصله بیشتر برای جدا کردن بخش سریال‌ها */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">📺 TV Shows</h2>
        <div className="flex flex-col gap-4">
          {tvShows.map((tv) => (
            <div
              key={tv.id}
              className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
                alt={tv.name}
                className="w-36 h-52 object-cover rounded-lg"
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
      </div>
      <Footer />
    </>
  );
}
