import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkoutPage";
import AdminPage from "./pages/adminPage"
import { CookieProvider } from "./global/CookieContext";

function App() {
  return (
    <CookieProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CookieProvider>
  );
}

export default App;
