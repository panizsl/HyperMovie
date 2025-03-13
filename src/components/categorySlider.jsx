import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const API_KEY = "8c17983b4cac457349207fb55ae925ad";

const categories = [
  { name: "Streaming", endpoint: "/movie/upcoming" },
  { name: "On TV", endpoint: "/tv/popular" },
  { name: "For Rent", endpoint: "/movie/top_rated" },
  { name: "In Theaters", endpoint: "/movie/now_playing" },
];

export default function CategorySlider() {
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0].endpoint
  );
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // تعیین نوع رسانه (movie یا tv)
  const getMediaType = (category) =>
    category.includes("/tv") ? "tv" : "movie";

  // دریافت فیلم‌ها براساس دسته‌بندی
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3${selectedCategory}?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  // دریافت نتایج جستجو
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const [movies, tvShows] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`
          ),
        ]);

        const combinedResults = [
          ...movies.data.results.map((item) => ({
            ...item,
            media_type: "movie",
          })),
          ...tvShows.data.results.map((item) => ({
            ...item,
            media_type: "tv",
          })),
        ];

        setResults(combinedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  const handleClick = (id) => {
    console.log("Clicked ID: ", id); // چاپ آیدی در کنسول
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">What's Popular</h2>

      {/* دسته‌بندی‌ها */}
      <div className="flex items-center mb-6">
        <div className="flex border border-gray-700 rounded-lg overflow-hidden">
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.endpoint)}
              className={`px-4 py-2 text-sm transition-all duration-200 ${
                selectedCategory === category.endpoint
                  ? "bg-rose-700 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } ${
                index === 0
                  ? "rounded-l-lg"
                  : index === categories.length - 1
                  ? "rounded-r-lg"
                  : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* اسلایدر */}
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 7, spaceBetween: 20 },
        }}
        className="w-full pb-16"
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="flex flex-col items-center group relative w-48 cursor-pointer"
          >
            {/* پوستر و لینک */}
            {movie.poster_path && (
              <Link to={`/${getMediaType(selectedCategory)}/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="rounded-lg shadow-lg mb-2 z-10"
                />
              </Link>
            )}

            {/* عنوان */}
            <h3 className="text-center text-sm font-medium z-10">
              {movie.title || movie.name}
            </h3>

            {/* تاریخ انتشار */}
            <p className="text-center text-xs text-gray-400 z-10">
              {movie.release_date || movie.first_air_date || "No Date"}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination swiper-pagination"></div>
    </div>
  );
}
