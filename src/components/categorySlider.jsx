import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const categories = [
  { name: "Popular", endpoint: "/movie/popular" },
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

  // Fetch movies for selected category
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3${selectedCategory}?api_key=8c17983b4cac457349207fb55ae925ad`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  return (
    <div className="text-white p-6 ">
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-4">Latest Trailers</h2>

      {/* Category Tabs */}
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

      {/* Swiper Slider */}
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
            {/* Movie Background Hover */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                backgroundImage: movie.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
                  : "",
              }}
            ></div>

            {/* Movie Poster */}
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="rounded-lg shadow-lg mb-2 z-10"
              />
            </Link>

            {/* Movie Title */}
            <h3 className="text-center text-sm font-medium z-10">
              {movie.title || movie.name}
            </h3>

            {/* Release Date */}
            <p className="text-center text-xs text-gray-400 z-10">
              {movie.release_date || movie.first_air_date || "No Date"}
            </p>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination absolute bottom-[-25px] left-0 right-0 flex justify-center"></div>
      </Swiper>
      <div className="custom-pagination swiper-pagination"></div>
    </div>
  );
}
