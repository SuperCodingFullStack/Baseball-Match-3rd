import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import Mypage from "./Mypage/Mypage.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Mypage />
  </StrictMode>
);
