import { useEffect, useState } from "react";
import Navigation from "../header/navigation";
import Footer from "../Footer";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const TopRated = () => {
  const [movies, setMovies] = useState([]); // لیست فیلم ها
  const [totalPages, setTotalPages] = useState(1); // تعداد کل صفحات
  const [searchParams, setSearchParams] = useSearchParams();

  // مقدار صفحه از URL گرفته می‌شود
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=8c17983b4cac457349207fb55ae925ad&page=${currentPage}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    fetchMovies();
  }, [currentPage]);
  // تغییر صفحه و ذخیره مقدار در URL
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSearchParams({ page }); // مقدار صفحه در آدرس ذخیره می‌شود
    }
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 text-white mt-6">
        <h1 className="text-2xl font-bold mb-8 text-white mt-16 sm:mt-10">
          Top Rated Movies
        </h1>

        {/* نمایش لیست فیلم‌ها */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <Link to={`/movie/${movie.id}`}>
                {/* تصویر فیلم */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-[350px] object-cover transition duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="p-4">
                  {/* نمره فیلم */}
                  <div className="text-center text-yellow-400 text-lg font-semibold mb-2">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </div>
                  {/* عنوان فیلم */}
                  <h3 className="text-white text-lg font-semibold text-center truncate mt-2">
                    {movie.title || movie.name}
                  </h3>
                  {/* تاریخ انتشار */}
                  <p className="text-center text-xs text-gray-400 mt-1">
                    {movie.release_date || movie.first_air_date || "No Date"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          {/* دکمه قبلی */}
          <button
            className={`px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ◀ Prev
          </button>

          {/* شماره صفحات */}
          {[...Array(5)].map((_, index) => {
            const pageNumber = currentPage - 2 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  className={`px-4 py-2 rounded transition ${
                    currentPage === pageNumber
                      ? "bg-rose-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}

          {/* دکمه بعدی */}
          <button
            className={`px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next ▶
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TopRated;
