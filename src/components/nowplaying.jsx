import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./header/navigation";
import { Link } from "react-router-dom";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]); // لیست فیلم‌ها
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // بررسی وجود صفحات بیشتر

  const fetchMovies = async (page) => {
    if (!hasMore || loading) return; // جلوگیری از ارسال درخواست اضافی

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=8c17983b4cac457349207fb55ae925ad&page=${page}`
      );

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // اضافه کردن فیلم‌های جدید
      setHasMore(response.data.page < response.data.total_pages); // بررسی پایان صفحات
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Now Playing movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]); // هر بار که `currentPage` تغییر کند، اطلاعات جدید لود می‌شود.

  // تشخیص اسکرول و بارگذاری صفحه بعدی
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setCurrentPage((prevPage) => prevPage + 1); // صفحه بعدی لود شود
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 text-white mt-10">
        <h2 className="text-2xl text-white mb-4 mt-16 sm:mt-10">
          Now Playing Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
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

        {/* لودینگ هنگام بارگیری صفحه بعدی */}
        {loading && (
          <div className="text-center mt-6">
            <p className="text-white">Loading more movies...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NowPlaying;
