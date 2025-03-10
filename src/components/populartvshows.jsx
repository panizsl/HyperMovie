import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "./header/navigation";
import Footer from "./Footer";

export default function PopularTvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // دریافت لیست سریال‌های محبوب
  const fetchPopularTvShows = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=8c17983b4cac457349207fb55ae925ad&page=${page}`
      );

      setTvShows((prevShows) => [...prevShows, ...response.data.results]);
      setHasMore(response.data.page < response.data.total_pages); // اگر به آخرین صفحه نرسیدیم، true بماند
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  // فراخوانی API وقتی صفحه تغییر کند
  useEffect(() => {
    fetchPopularTvShows(currentPage);
  }, [currentPage]);

  // تشخیص اسکرول برای بارگذاری بیشتر
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setCurrentPage((prevPage) => prevPage + 1); // رفتن به صفحه بعدی
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 text-white mt-20">
        <h1 className="text-2xl font-bold mb-8">📺 Popular TV Shows</h1>

        {/* نمایش لیست سریال‌ها */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tvShows.map((tv) => (
            <div
              key={tv.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <Link to={`/tv/${tv.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.name}
                  className="w-full h-[350px] object-cover transition duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="p-4">
                  <div className="text-center text-yellow-400 text-lg font-semibold mb-2">
                    {tv.vote_average ? tv.vote_average.toFixed(1) : "N/A"}
                  </div>
                  <h3 className="text-white text-lg truncate text-center mt-2">
                    {tv.name}
                  </h3>
                  <p className="text-center text-xs text-gray-400">
                    {tv.first_air_date || "No Date"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* پیام "Loading..." در هنگام بارگذاری */}
        {loading && (
          <div className="text-center mt-6">
            <p className="text-lg">Loading...</p>
          </div>
        )}

        {/* دکمه بارگذاری بیشتر در صورت نیاز */}
        {hasMore && !loading && <div className="text-center mt-6"></div>}
      </div>
      <Footer />
    </>
  );
}
