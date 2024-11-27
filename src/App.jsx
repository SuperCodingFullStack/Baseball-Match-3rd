import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PartyPost from "./pages/partyPost/PartyPost";
import PartyPostLists from "./pages/partyPost/partyPostLists";
import PartyPostWrite from "./pages/partyPost/PartyPostWrite";
import { Reset } from "styled-reset";
import Mypage from "./pages/Mypage";
import Signup from "./pages/Signup";
import TeamInfo from "./components/CrawlingPage/TeamInfo";
import WebSocketComponent from "./components/WebSocket/WebSocketComponent";

function App() {
  return (
    <>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/partyPosts" element={<PartyPostLists />} />
          <Route path="/partyPost/:id" element={<PartyPost />} />
          <Route path="/postWrite" element={<PartyPostWrite />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/api/teamInfo/:teamName" element={<TeamInfo />} />
          <Route path="/portfolio" element={<WebSocketComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
