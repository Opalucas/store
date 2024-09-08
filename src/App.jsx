import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/Home/Index";
import Cart from "./components/Cart/Index";
import Login from "./components/Login/Index";
import Orders from "./components/Orders/Index";
import AddressForm from "./components/Account/AddressForm";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import Header from "./components/Home/Header/Index";
import PrivateRoute from "./utils/PrivateRoute";
import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import { UserProvider } from "./context/UserContext";
import CreatAccount from "./components/Account/CreatAccount";

function App() {
  return (
    <CartProvider>
      <FilterProvider>
        <UserProvider>
          <Router>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* <Route path="/login" element={<Login />} /> */}

                {/* Rotas protegidas */}
                <Route path="/" element={<PrivateRoute />}>
                  <Route
                    element={
                      <>
                        <Header />
                        <Outlet />
                      </>
                    }
                  >
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/newaccount" element={<CreatAccount />} />
                    <Route path="/address" element={<AddressForm />} />
                    {/* <Route path="/success" element={<SuccessPage />} /> */}
                  </Route>
                </Route>

                {/* Página 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </UserProvider>
      </FilterProvider>
    </CartProvider>
  );
}

export default App;
