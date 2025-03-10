import React from "react";
import Navigation from "./navigation";
import SearchBox from "./searchBox";
import FollowUs from "./followUs";
import HeaderSlider from "./HeaderSlider";
import Background from "./background";

export default function Header() {
  return (
    <header className="transition-all duration-500 bg-cover bg-center">
      <Navigation />
      <Background />
      <div className="container">
        <SearchBox />
      </div>
    </header>
  );
}
