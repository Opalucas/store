import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/Index";
import { CartContext } from "../../../context/CartContext";

const Header = () => {
  const { cartQuantity } = useContext(CartContext);

  useEffect(() => {
  }, [cartQuantity]);

  return <NavBar cartQuantity={cartQuantity} />;
};

export default Header;
