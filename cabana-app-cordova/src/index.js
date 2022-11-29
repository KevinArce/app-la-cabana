import React from "react";
import MyApp from "./MyApp";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      const root = createRoot(container);
      root.render(<MyApp />);
    },
    false
  );
} else {
  const root = createRoot(container);
  root.render(<MyApp />);
}