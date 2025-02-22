import React, { useState } from "react";
import Header from "./components/header/header";
import HeaderSlider from "./components/header/HeaderSlider";
import CategorySlider from "./components/CategorySlider";

import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
