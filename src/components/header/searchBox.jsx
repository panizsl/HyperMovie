import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const API_KEY = "8c17983b4cac457349207fb55ae925ad";

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
    <section className="relative mt-32 sm:mt-40 max-md:mt-20 md:mt-60 text-slate-100">
      {/* تصویر پس‌زمینه */}

      <div className="relative w-full md:ml-4 md:mt-4">
        {/* کادر جستجو */}
        <input
          type="text"
          placeholder="Search for a movie or TV show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 sm:p-1 text-base md:text-sm rounded-3xl  placeholder:text-slate-300 bg-[rgba(10,25,47,0.5)] backdrop-blur-lg focus:outline-none hover:bg-[rgba(15,35,65,0.7)]"
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
                  to={`/${item.type}/${item.id}`}
                  className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition"
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                        : "https://via.placeholder.com/92x138?text=No+Image"
                    }
                    alt={item.title || item.name}
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
