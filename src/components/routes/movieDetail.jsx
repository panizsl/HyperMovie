import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import Navigation from "../header/navigation";
import Footer from "../Footer";

export default function MediaDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");

  const mediaType = location.pathname.includes("/movie/") ? "movie" : "tv";

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const [mediaResponse, videoResponse, creditsResponse] =
          await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=8c17983b4cac457349207fb55ae925ad`
            ),
            axios.get(
              `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=8c17983b4cac457349207fb55ae925ad`
            ),
            axios.get(
              `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=8c17983b4cac457349207fb55ae925ad`
            ),
          ]);

        const crew = creditsResponse.data.crew;
        const director = crew.find((person) => person.job === "Director");
        const producer = crew.find((person) => person.job === "Producer");

        const officialTrailer = videoResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setMedia({
          ...mediaResponse.data,
          director: director ? director.name : "Unknown",
          producer: producer ? producer.name : "Unknown",
        });

        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        }
      } catch (error) {
        console.error("Error fetching media details:", error);
      }
    };

    fetchMediaDetails();
  }, [id, mediaType]);

  if (!media) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.some((fav) => fav.id === media.id)) {
      favorites.push(media);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
      navigate("/favorites"); // هدایت به صفحه علاقه‌مندی‌ها
    } else {
      alert("Already in favorites!");
    }
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6 text-white flex flex-col gap-8 mt-20">
        <div className="flex gap-8">
          <div className="w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              alt={media.title || media.name}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-2/3">
            <h1 className="text-3xl font-bold">
              {media.title || media.name} (
              {media.release_date?.split("-")[0] ||
                media.first_air_date?.split("-")[0]}
              )
            </h1>
            <div className="mt-2 text-gray-400">
              <div className="flex items-center gap-4">
                <ul className="flex flex-wrap gap-1">
                  {media.genres?.map((genre) => (
                    <li key={genre.id}>
                      <Link
                        to={`/genres/${mediaType}/${genre.id}`}
                        className="bg-gray-700 text-sm text-yellow-300 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-600"
                      >
                        {genre.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {media.runtime && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">
                      {Math.floor(media.runtime / 60)}h {media.runtime % 60}m
                    </span>
                  </div>
                )}
              </div>
            </div>

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
            <p className="text-gray-400 mt-2">⭐ {media.vote_average} / 10</p>
            <p className="text-gray-400">
              📅 Release Date: {media.release_date || media.first_air_date}
            </p>
            <h2 className="text-xl font-bold mt-6">Overview</h2>
            <p className="text-gray-300 mb-10">{media.overview}</p>
            <div className="flex items-center gap-8">
              <p className="text-gray-200">
                <strong>Director:</strong> {media.director}
              </p>
              <p className="text-gray-200">
                <strong>Producer:</strong> {media.producer}
              </p>
            </div>
          </div>
        </div>

        {trailerKey && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Official Trailer
            </h2>
            <div className="w-full flex justify-center">
              <iframe
                className="w-full md:w-3/4 h-64 md:h-96 rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
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
