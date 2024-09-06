import {BrowserRouter as Router, Route, Routes, Outlet, Navigate} from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/Home/Index";
import Cart from "./components/Cart/Index";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import Header from "./components/Home/Header/Index";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
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
            </Route>
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
