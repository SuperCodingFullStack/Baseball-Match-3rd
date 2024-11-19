import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PartyPostLists from "./pages/partyPost/PartyPostLists";
import PartyPost from "./pages/partyPost/PartyPost";
import PartyPostWrite from "./pages/partyPost/PartyPostWrite";
import { Reset } from "styled-reset";

function App() {
  return (
    <>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/partyPosts" element={<PartyPostLists />} />
          <Route path="/partyPost" element={<PartyPost />} />
          <Route path="/postWrite" element={<PartyPostWrite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
