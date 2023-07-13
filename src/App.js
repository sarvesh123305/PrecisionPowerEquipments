import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./Admin/Home";

import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Services from "./pages/Services";
import Products from "./pages/Products";
import AddProducts from "./Admin/AddProducts";
import PageNotFound from "./pages/PageNotFound";
import AuthAdmin from "./Auth/AuthAdmin";
import UserProvider from "./context/loginState";
import AdminAuthProvider from "./context/adminAuthState";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/authAdmin" element={<AuthAdmin />} />
                <Route path="/Admin/" element={<AdminHome />} />
                <Route path="/Admin/addProducts" element={<AddProducts />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </AdminAuthProvider>
        </UserProvider>
      </Provider>
    </>
  );
}

export default App;
