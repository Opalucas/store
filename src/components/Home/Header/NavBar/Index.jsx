import React, { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavBar = ({ cartQuantity }) => {
  const navigate = useNavigate();
  const { user, logout_user } = useContext(UserContext);

  const handleLogout = () => {
    logout_user();
    navigate("/");
  };

  const newAccountSubmit = () => {
    navigate("/newaccount");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            Livraria Online
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <a className="nav-link text-black" href="/cart">
                  {cartQuantity > 0 && (
                    <span className="badge bg-secondary me-1">
                      {cartQuantity}
                    </span>
                  )}
                  <i className="fa-solid fa-cart-shopping"></i> Carrinho
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-black"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user px-1"></i>
                  {user ? user.firstname : "Conta"}
                </a>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  {user ? (
                    <>
                      <li>
                        <a className="dropdown-item" href="/orders">
                          Histórico de compras
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/profile">
                          Perfil
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={handleLogout}>
                          Sair
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a className="dropdown-item" href="/login">
                          Entrar
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={newAccountSubmit}>
                          Criar uma conta
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
