import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "./header/navigation";
import Footer from "./Footer";

export default function PopularTvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const fetchPopularTvShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=8c17983b4cac457349207fb55ae925ad`
        );
        setTvShows(response.data.results);
      } catch (error) {
        console.error("Error fetching popular TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTvShows();
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 text-white mt-20">
        <h1 className="text-3xl font-bold mb-8">📺 Popular TV Shows</h1>

        {/* TV Shows Grid - Same as Upcoming Movies */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tvShows.map((tv) => (
            <div
              key={tv.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              {/* TV Show Poster */}
              <Link to={`/tv/${tv.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tvShows.name}
                  className="w-full h-[350px] object-cover transition duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="p-4">
                  <div className="text-center text-yellow-400 text-lg font-semibold mb-2">
                    {tv.vote_average ? tv.vote_average.toFixed(1) : "N/A"}
                  </div>
                  <h3 className="text-white text-lg truncate text-center mt-2">
                    {tv.title || tv.name}
                  </h3>
                  <p className="text-center text-xs text-gray-400">
                    {tv.release_date || tv.first_air_date || "No Date"}
                  </p>
                </div>
              </Link>

              {/* TV Show Info */}
            </div>
          ))}

          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className={`px-6 py-2 bg-rose-700 text-white text-center rounded-full ${
                  loading ? "opacity-50" : "hover:bg-rose-800"
                }`}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
