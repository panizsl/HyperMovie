import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate
import Navigation from "../header/navigation";
import Footer from "../Footer";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // تعریف navigate

  // هوک useEffect برای بررسی وضعیت ورود به سیستم
  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      setIsLoggedIn(false);
      alert("Please log in to see your favorites!");
      navigate("/login"); // هدایت به صفحه لاگین در صورت عدم وجود session_id
    } else {
      setIsLoggedIn(true);
      // ذخیره‌سازی فیلم‌ها با استفاده از session_id
      const storedFavorites =
        JSON.parse(localStorage.getItem(`favorites-${sessionId}`)) || [];
      setFavorites(storedFavorites);
    }
  }, [navigate]);

  // اگر کاربر وارد نشده باشد، پیامی نمایش داده می‌شود
  if (!isLoggedIn) {
    return (
      <div className="text-center text-white mt-20">
        <h2>Please log in to see your favorites.</h2>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-6 py-10 text-white mt-20">
        <h1 className="text-3xl font-bold mb-8">
          ❤️ Favorite Movies & TV Shows
        </h1>

        <div className="flex flex-col gap-4">
          {favorites.length === 0 ? (
            <p className="text-gray-400">No favorites added yet!</p>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-48 h-72 object-contain rounded-lg"
                />
                <div className="ml-6">
                  <h3 className="text-xl font-semibold">
                    {item.title || item.name}
                  </h3>
                  <p className="text-gray-400">
                    📅 {item.release_date || item.first_air_date}
                  </p>
                  <p className="text-gray-300 text-sm">{item.overview}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
