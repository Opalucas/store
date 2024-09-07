import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

const NavBar = ({cartQuantity}) => {
  const navigate = useNavigate();
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

            <a className="nav-item text-black">
              <i className="fa-solid fa-user"></i> Conta
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
