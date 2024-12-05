import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PartyPost from "./pages/partyPost/PartyPost";
import PartyPostLists from "./pages/partyPost/PartyPostLists";
import PartyPostWrite from "./pages/partyPost/PartyPostWrite";
import { Reset } from "styled-reset";
import Mypage from "./pages/Mypage";
import Signup from "./pages/Signup";
import TeamInfo from "./components/CrawlingPage/TeamInfo";
import WebSocketComponent from "./components/WebSocket/WebSocketComponent";
import Login from "./pages/Login/Login";
import PostModification from "./pages/partyPost/PostModification";
import MyPosts from "./pages/partyPost/Myposts";
import LikedPosts from "./pages/partyPost/LikedPosts";
import Friends from "./pages/Friends";
import ChatSidebar from "./components/WebSocket/Sidebar/ChatSidebar";
import ChatComponent from "./components/WebSocket/ChatComponent";
// import Setting from "./components/Settings/Setting";
function App() {
  return (
    <>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/partyPosts" element={<PartyPostLists />} />
          <Route path="/partyPost/:postId" element={<PartyPost />} />
          <Route path="/postWrite" element={<PartyPostWrite />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/myLikePosts" element={<LikedPosts />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/teamInfo/:teamName" element={<TeamInfo />} />
          <Route path="/portfolio" element={<WebSocketComponent />} />
          <Route path="/modification/:postId" element={<PostModification />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/side" element={<ChatSidebar />} />
          <Route path="/chat" element={<ChatComponent />} />
          {/* <Route path="/settings" element={<Setting />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
