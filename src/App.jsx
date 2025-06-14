// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomizePage from "./pages/CustomizePage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import AdminDashboard from "./pages/AdminDashboard";
import UniversoD2DPage from "./pages/UniversoD2DPage";
import VisionLEXPage from './pages/VisionLEXPage';
import UndertakeInfo from "./pages/UndertakeInfo";
import CollaborationPage from "./pages/CollaborationPage";
import StatesPage from "./pages/StatesPage";


function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customize/:category" element={<CustomizePage />} />
          <Route path="/products/vision-lex" element={<VisionLEXPage />} />
          <Route path="/products/universo-d2d" element={<UniversoD2DPage />} />
          <Route path="/products/new" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/undertake" element={<UndertakeInfo />} />
          <Route path="/collaborationPage" element={<CollaborationPage />} />
          <Route path="/states" element={<StatesPage />} />

        </Routes>
      </main>
    </>
  );
}

export default App;
