import React, { useState, useEffect, useContext } from "react";

const Cart = () => {
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce((total, item) => {
    return total + item.saleInfo.listPrice.amount * item.quantity;
  }, 0);

  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + change);
    setCart(newCart);
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <div className="row p-4">
      <div className="col-md-8 offset-md-2 d-flex flex-column" style={{ gap: "32px" }}>
        <div className="d-flex justify-content-center">
          <span className="title">
            <p className="font-weight-bold">Carrinho de compras</p>
          </span>
        </div>
        <div className="overflow-x">
          {cart.length > 0 ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">INSB_13</th>
                    <th scope="col">INSB_10</th>
                    <th scope="col">Livro</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Preço</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {item.volumeInfo.industryIdentifiers[0].identifier}
                      </th>
                      <th scope="row">
                        {item.volumeInfo.industryIdentifiers[1].identifier}
                      </th>
                      <td>{item.volumeInfo.title}</td>
                      <td>R${item.saleInfo.listPrice.amount.toFixed(2)}</td>
                      <td>
                        <i
                          className="fa-solid fa-minus cursor-pointer p-1"
                          onClick={() => updateQuantity(index, -1)}
                        ></i>
                        {item.quantity}
                        <i
                          className="fa-solid fa-plus cursor-pointer p-1"
                          onClick={() => updateQuantity(index, 1)}
                        ></i>
                      </td>
                      <td>
                        R${(item.saleInfo.listPrice.amount * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <i
                          style={{ color: "#ff0000" }}
                          className="fa-solid fa-trash cursor-pointer"
                          onClick={() => removeItem(index)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end mt-5" style={{ gap: "16px" }}>
                <div className="d-flex flex-column align-items-end">
                  <span>
                    <strong>Subtotal</strong>
                  </span>
                </div>
                <div className="d-flex flex-column align-items-start">
                  <span>R${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-success">
                  Finalizar compra
                  <i className="fa-solid fa-arrow-right p-2"></i>
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="d-flex flex-column align-items-center" style={{ gap: "16px" }}>
                <span>Seu carrinho está vazio!</span>
                <a href="/">Voltar ao catálogo</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
