import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Banner from "./components/Bannner/Banner";
import BannerText from "./components/Bannner/BannerText";
import Blog from "./components/Blog/Blog";
import Footer from "./components/Navbar/Footer";
import { UpdateFollower } from "react-mouse-follower";
import Register from "./Login_Register/Register";
import Login from "./Login_Register/Login";
import Admin from "./components/Admin/Admin";
import UserTable from "./components/Admin/UserTable";
import AnalyticsDashboard from "./components/Admin/AnalyticsDashboard";
import PaymentPage from "./components/Payment/PaymentPage";
import Product from "./components/Product/Product";
import DisplayPayment from "./components/Payment/DisplayPayment";
import CheckoutPage from "./components/Product/CheckoutPage";
import OrderDisplayPage from "./components/Order/OrderDisplayPage";

export default function App() {
  return (
    <Router basename="/project-starlight">
      <main className="overflow-x-hidden">
       

        <Routes>
          {/* Home Page (/) */}
          <Route
            path="/"
            element={
              <>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 999,
                    followSpeed: 1.5,
                  }}
                >
                   <Navbar /> 
                  <Hero />
                </UpdateFollower>

                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "black",
                    zIndex: 999,
                    followSpeed: 1.5,
                  }}
                >
                  <Services />
                  <Banner />
                  <BannerText />
                  <Blog />
                  <Footer />
                </UpdateFollower>
              </>
            }
          />

          {/* Register Page (/register) */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserTable />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/displayPayment" element={<DisplayPayment />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orderDisplay" element={<OrderDisplayPage />} />
        </Routes>
      </main>
    </Router>
  );
}
