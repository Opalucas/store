import React, { useContext} from "react";
import { UserContext } from "../../../context/UserContext";

const NavBar = ({ cartQuantity }) => {
  const { user, logout_user } = useContext(UserContext);

  const handleLogout = ()=>{
    logout_user()
  };

  return (
    <>
      <div className="navbar navbar-expand-lg">
        <div className="container justify-content-between">
          <a className="nav-brand" href="/">
            Livraria Online
          </a>
          <div className="nav-items d-flex" style={{ gap: "48px" }}>
            <a className="nav-item text-black" href="/cart">
              {cartQuantity > 0 && (
                <span className="badge bg-secondary">{cartQuantity}</span>
              )}
              <i className="fa-solid fa-cart-shopping"></i> Carrinho
            </a>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-black"
                  style={{ marginTop: "-7px" }}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user px-1"></i>Conta
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/orders">
                      Historico de compras
                    </a>
                  </li>
                  <li>
                    {user ? (
                      <a className="dropdown-item" onClick={handleLogout}>Sair</a>
                    ) : (
                      <a className="dropdown-item" href="/login">
                        Entrar
                      </a>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
