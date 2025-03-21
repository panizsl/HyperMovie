import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navigation from "./header/navigation";
import Footer from "./Footer";

export default function TvDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Genre ID:", id);

  const [tvShow, setTvShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [cast, setCast] = useState([]);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const [tvResponse, videoResponse, creditsResponse] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=8c17983b4cac457349207fb55ae925ad`
          ),
          axios.get(
            `https://api.themoviedb.org/3/tv/${id}/videos?api_key=8c17983b4cac457349207fb55ae925ad`
          ),
          axios.get(
            `https://api.themoviedb.org/3/tv/${id}/credits?api_key=8c17983b4cac457349207fb55ae925ad`
          ),
        ]);

        const tvData = tvResponse.data;
        const crew = creditsResponse.data.crew;
        const castData = creditsResponse.data.cast.slice(0, 5);

        const director =
          crew.find((person) => person.job === "Director")?.name || "Unknown";
        const producer =
          crew.find((person) => person.job === "Producer")?.name || "Unknown";

        setTvShow({ ...tvData, director, producer });
        setCast(castData);
        setMedia(tvData); // Set media here so it's available when adding to favorites

        const officialTrailer = videoResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        }
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };

    fetchTvShowDetails();
  }, [id]);






  const addToFavorites = () => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      alert("Please log in to add to favorites!");
      return;
    }

    const userFavoritesKey = `favorites-${sessionId}`;
    const userFavorites =
      JSON.parse(localStorage.getItem(userFavoritesKey)) || [];

    if (media && !userFavorites.some((fav) => fav.id === media.id)) {
      userFavorites.push(media);
      localStorage.setItem(userFavoritesKey, JSON.stringify(userFavorites)); // Save to localStorage
      alert("Added to favorites!");
      navigate("/favorites"); // Navigate to favorites page
    } else {
      alert("Already in favorites!");
    }
  };

  if (!tvShow)
    return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 text-white flex flex-col gap-8 mt-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* TV Show Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* TV Show Info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold">
              {tvShow.name} ({tvShow.first_air_date?.split("-")[0]})
            </h1>

            {/* Genre & Duration */}
            <div className="flex items-center gap-4 flex-wrap text-gray-400 mt-3">
              {/* Genres */}
              <ul className="flex flex-wrap gap-1">
                {tvShow.genres?.map((genre) => (
                  <li key={genre.id}>
                    <Link
                      to={`/genres/:type/${genre.id}`}
                      className="bg-gray-700 text-sm text-yellow-300 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-600"
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              {/* Number of Seasons & Episodes */}
              <span className="text-sm">
                📺 {tvShow.number_of_seasons} Seasons | 🎬{" "}
                {tvShow.number_of_episodes} Episodes
              </span>
            </div>

            {/* Like & Favorite Buttons */}
            <div className="flex items-center gap-4 mt-3">
              <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                ❤️ Like
              </button>
              <button
                onClick={addToFavorites}
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              >
                ⭐ Add to Favorites
              </button>
            </div>

            {/* Ratings & Air Date */}
            <p className="text-gray-400 mt-2">
              ⭐ {tvShow.vote_average.toFixed(1)} / 10
            </p>
            <p className="text-gray-400">
              📅 First Aired: {tvShow.first_air_date}
            </p>

            {/* Overview */}
            <h2 className="text-xl font-bold mt-6">Overview</h2>
            <p className="text-gray-300 mb-10">{tvShow.overview}</p>

            {/* Director & Producer */}
            <div className="flex items-center gap-8">
              <p className="text-gray-200">
                <strong>Director:</strong> {tvShow.director}
              </p>
              <p className="text-gray-200">
                <strong>Producer:</strong> {tvShow.producer}
              </p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
            <div className="flex gap-4 overflow-x-auto">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/100x150?text=No+Image"
                    }
                    alt={actor.name}
                    className="w-24 h-32 rounded-lg shadow-lg mb-2"
                  />
                  <p className="text-sm">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailer Section */}
        {trailerKey && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Official Trailer
            </h2>
            <div className="w-full flex justify-center">
              <iframe
                className="w-full md:w-3/4 h-64 md:h-96 rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="TV Show Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
