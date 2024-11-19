import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Mypage from "./Mypage/Mypage";
import { Reset } from "styled-reset";

function App() {
  return (
    <>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
