import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DiRequirejs } from "react-icons/di";

export default function SearchBox() {
  const [query, setQuery] = useState(""); // مقدار ورودی جستجو
  const [results, setResults] = useState([]); // ذخیره نتایج جستجو
  const API_KEY = "8c17983b4cac457349207fb55ae925ad"; // 🔹 کلید API خود را اینجا بگذارید

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]); // اگر ورودی خالی بود، نتایج را پاک کن
      return;
    }

    const fetchResults = async () => {
      try {
        // 1️⃣ درخواست برای دریافت فیلم‌ها
        const movieResponse = axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );

        // 2️⃣ درخواست برای دریافت سریال‌ها
        const tvResponse = axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`
        );

        // 3️⃣ منتظر پاسخ هر دو درخواست باش
        const [movies, tvShows] = await Promise.all([
          movieResponse,
          tvResponse,
        ]);

        // 4️⃣ ترکیب نتایج فیلم‌ها و سریال‌ها
        const combinedResults = [
          ...movies.data.results.map((item) => ({ ...item, type: "movie" })), // اضافه کردن نوع
          ...tvShows.data.results.map((item) => ({ ...item, type: "tv" })), // اضافه کردن نوع
        ];

        setResults(combinedResults); // ذخیره همه نتایج
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]); // اجرای جستجو در هنگام تغییر query

  return (
    <section className="mt-20 text-slate-100 md:mt-30">
      <div className="relative md:ml-4 md:mt-4 w-full">
        {/* کادر جستجو */}
        <input
          type="text"
          placeholder="Search for a movie or TV show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-600 p-3 sm:p-1 text-base md:text-sm rounded-3xl border-0 focus:outline-none placeholder:text-slate-400 placeholder:text-sm md:placeholder:text-base"
        />

        {/* آیکون جستجو */}
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>

      {/* نمایش نتایج جستجو */}
      {results.length > 0 && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg max-h-80 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-2">Search Results:</h3>
          <ul>
            {results.map((item) => (
              <li key={item.id} className="mb-2">
                <Link
                  to={`/${item.type}/${item.id}`} // 🔹 لینک مخصوص فیلم و سریال
                  className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition"
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                        : "https://via.placeholder.com/92x138?text=No+Image"
                    }
                    alt={item.title || item.name} // 🔹 برای سریال‌ها `name` استفاده می‌شود
                    className="w-12 h-16 rounded"
                  />
                  <div>
                    <p className="text-white font-medium">
                      {item.title || item.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {item.release_date || item.first_air_date || "No Date"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
