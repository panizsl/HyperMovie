import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_KEY = "8c17983b4cac457349207fb55ae925ad";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // مرحله 1: دریافت request_token از TMDb
  const getRequestToken = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log("Reque token:", data);
      if (data.request_token) {
        // هدایت به صفحه‌ی تأیید TMDb با بازگشت به سایت شما
        window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}/callback`;
      } else {
        setError("Error getting request token");
      }
    } catch (error) {
      console.error("Request Token Error:", error);
      setError("Failed to connect to TMDb API");
    }
  };

  // مرحله 3: دریافت session_id بعد از تأیید کاربر
  const createSession = async (requestToken) => {
    try {
      console.log("Sending request with token:", requestToken);

      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request_token: requestToken }),
        }
      );

      const data = await response.json();
      console.log("Session Response:", data);

      if (data.success) {
        localStorage.setItem("session_id", data.session_id);
        console.log("Session ID Stored:", data.session_id);
        localStorage.setItem("user_email", userData.email); // ذخیره ایمیل کاربر
        alert("Login successful!");
        navigate("/");
      } else {
        console.error("Error Creating Session:", data.status_message);
        setError(data.status_message || "Error creating session");
      }
    } catch (error) {
      console.error("🔥 Fetch Error:", error);
      setError("Failed to create session");
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const approvedToken = urlParams.get("request_token");
    const approved = urlParams.get("approved");

    console.log("Approved Token:", approvedToken); // چک کردن مقدار
    console.log("Approved Status:", approved); // چک کردن مقدار

    if (approvedToken && approved === "true") {
      createSession(approvedToken);
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="sm:w-full sm:max-w-md">
        <h1 className="text-3xl text-center font-bold text-white mb-8">
          Movie<span className="text-rose-500">Mate</span>
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            getRequestToken();
          }}
          className="space-y-6p-8 rounded-lg shadow-lg"
        >
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-rose-500 px-4 py-2 text-white font-semibold hover:bg-rose-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-rose-500 hover:text-rose-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
