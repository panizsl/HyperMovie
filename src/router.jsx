import { createBrowserRouter } from "react-router-dom";
import IndexLayout from "./layout/indexlayout"; // مسیر صحیح
import MovieDetail from "./components/routes/movieDetail"; // مسیر صحیح
import Login from "./components/login";
import SignUp from "./components/signup";
import Popular from "./components/popular";
import NowPlaying from "./components/nowplaying";
import UpComing from "./components/routes/upcoming";
import TopRated from "./components/routes/toprated";
import PopularTvShows from "./components/populartvshows";
import TvDetail from "./components/tvdetail";
import Genres from "./components/genres";
import Favorites from "./components/routes/favorites";

const router = createBrowserRouter([
  {
    path: "/", // مسیر اصلی صفحه (Index)
    element: <IndexLayout />, // کامپوننت لایه اصلی
  },
  {
    path: "/home", // مسیر اصلی صفحه (Index)
    element: <IndexLayout />, // کامپوننت لایه اصلی
  },
  ,
  {
    path: "/movie/:id", // مقدار `id` داینامیک شد
    element: <MovieDetail />,
  },
  {
    path: "/tv/:id", // مقدار `id` داینامیک شد
    element: <TvDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/popular",
    element: <Popular />,
  },
  {
    path: "/now-playing",
    element: <NowPlaying />,
  },
  {
    path: "/upcoming",
    element: <UpComing />,
  },
  {
    path: "/top-rated",
    element: <TopRated />,
  },
  {
    path: "/populartv",
    element: <PopularTvShows />,
  },
  {
    path: "/genres/:type/:id",
    element: <Genres />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

export default router;
