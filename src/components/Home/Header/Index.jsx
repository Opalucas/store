import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/Index";
import { CartContext } from "../../../context/CartContext";

const Header = () => {
  const { cartQuantity } = useContext(CartContext);

  useEffect(() => {
    console.log("Quantidade de itens no carrinho mudou:", cartQuantity);
  }, [cartQuantity]);

  return <NavBar cartQuantity={cartQuantity} />;
};

export default Header;
