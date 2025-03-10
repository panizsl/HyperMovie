import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const approvedToken = urlParams.get("request_token");

    const createSession = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=8c17983b4cac457349207fb55ae925ad`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request_token: approvedToken }),
        }
      );
      const data = await response.json();
      if (data.session_id) {
        localStorage.setItem("session_id", data.session_id);
        navigate("/");
      } else {
        alert("Session creation failed");
      }
    };

    if (approvedToken) {
      createSession();
    }
  }, [navigate]);

  return <h1>Processing your authentication...</h1>;
}
