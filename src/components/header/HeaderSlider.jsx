import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autoplay } from "swiper/modules"; // اضافه کردن ماژول Autoplay
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const API_KEY = "8c17983b4cac457349207fb55ae925ad";

export default function HeaderSlider() {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); // فیلم انتخاب‌شده
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const [movies, tvShows] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie?api_key=${API_KEY}&query=${query}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/tv?api_key=${API_KEY}&query=${query}`
          ),
        ]);

        const combinedResults = [
          ...movies.data.results.map((item) => ({ ...item, type: "movie" })),
          ...tvShows.data.results.map((item) => ({ ...item, type: "tv" })),
        ];

        setResults(combinedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="text-white p-6 md:mt-20 sm:mt-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-3">Trending Movies</h2>
          <div className="flex border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setTimeWindow("day")}
              className={`px-4 py-2 text-sm ${
                timeWindow === "day"
                  ? "bg-rose-700 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } rounded-l-lg`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeWindow("week")}
              className={`px-4 py-2 text-sm ${
                timeWindow === "week"
                  ? "bg-rose-700 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } rounded-r-lg`}
            >
              This Week
            </button>
          </div>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={20}
        slidesPerView={7}
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 7, spaceBetween: 20 },
        }}
        className="w-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="flex flex-col items-center">
            {/* Movie Poster */}
            <Link to={`/${movie.media_type}/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title || movie.name}
                className="rounded-lg shadow-lg mb-2 cursor-pointer"
              />
            </Link>

            {/* Movie Title */}
            <h3 className="text-center text-sm font-medium">
              {movie.title || movie.name}
            </h3>
            {/* Release Date */}
            <p className="text-center text-xs text-gray-400">
              {movie.release_date || movie.first_air_date || "No Release Date"}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
