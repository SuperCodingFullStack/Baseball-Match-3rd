import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
=======

import App from "./App.jsx";
import Mypage from "./Mypage/Mypage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Mypage />
>>>>>>> feat.mypage
  </StrictMode>
);
