import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "./header/navigation";
import Footer from "./Footer";

const Popular = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=8c17983b4cac457349207fb55ae925ad&page=${currentPage}`
      )
      .then((response) => {
        if (currentPage === 1) {
          setPopularMovies(response.data.results);
        } else {
          setPopularMovies((prevMovies) => [
            ...prevMovies,
            ...response.data.results,
          ]);
        }
        setHasMore(response.data.page < response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setCurrentPage(1);
        setSearchParams({ page: 1 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 text-white mt-10">
        <h2 className="text-2xl text-white mb-4 mt-16 sm:mt-10">
          Popular Movies
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[350px] object-cover transition duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="p-4">
                  <div className="text-center text-yellow-400 text-lg font-semibold mb-2">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </div>
                  <h3 className="text-white text-lg truncate text-center mt-2">
                    {movie.title}
                  </h3>
                  <p className="text-center text-xs text-gray-400">
                    {movie.release_date || "No Date"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`px-6 py-2 bg-rose-700 text-white rounded-full ${
                loading ? "opacity-50" : "hover:bg-rose-800"
              }`}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Popular;
