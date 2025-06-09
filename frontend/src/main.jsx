// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// ✅ Import AOS CSS and JS
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.js";

// ✅ Import Swiper CSS
import "swiper/css";
import "app.css";

// ✅ Import your custom styles
import "/public/assets/css/main.css";  // If CSS is in public
// OR import "./assets/css/main.css";   // If moved to src/assets

// Initialize AOS (if used)
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
