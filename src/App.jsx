import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import "./App.css";
// src/App.js 또는 src/index.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./pages/Register";
import Auction from "./pages/Auction";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import GlobalStyle from "./css/GlobalStyle";
import UploadThings from "./pages/UploadThings";
import UploadList from "./pages/UploadList";
import { TotalCategory } from "./pages/TotalCategory";
import ProductDetail from "./pages/ProductDetail";
import Inspection from "./pages/Inspection";
import Search from "./pages/Search";
import AuctionProduct from "./pages/AuctionProduct"
import UpcomingDetail from "./pages/UpcomingDetail";
import DoneDetail from "./pages/DoneDetail";
import Admin from "./pages/Admin";
import { Previous } from "./pages/Previous";
import { SearchBid } from "./pages/SearchBid";
import EditProfile from "./pages/EditProfile";
function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Navbar /> {/* Navbar 항상 하단에 고정 */}
          <Routes>
            <Route path="/" element={<Auction />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/previous-bids" element={<Previous />} />
            
            <Route path="/search-bids" element={<SearchBid />} />
            <Route path="/uploadlist" element={<UploadList />} />
            <Route path="/upload" element={<UploadThings />} />
            <Route path="/category-page" element={<TotalCategory />} />
            <Route path="/product/:productId" element={<ProductDetail />} />

            <Route path="/auctionproduct/:auctionId" element={<AuctionProduct />} />

            <Route path="/upcoming/:productId" element={<UpcomingDetail />} />
            <Route path="/done/:productId" element={<DoneDetail/>} />

            <Route path="/inspection" element={<Inspection />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/edit" element={<EditProfile />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
