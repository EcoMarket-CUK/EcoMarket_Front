import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Auction from "./pages/Auction";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import GlobalStyle from "./css/GlobalStyle";
import UploadThings from "./pages/UploadThings";
import UploadList from "./pages/UploadList";
import Inspection from "./pages/Inspection";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Navbar /> {/* 항상 하단에 고정되는 Navbar */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Auction />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/uploadlist" element={<UploadList />} />
            <Route path="/upload" element={<UploadThings />} />
            <Route path="/inspection" element={<Inspection />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
