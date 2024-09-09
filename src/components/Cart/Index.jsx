import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import apiAxios from "../../services/API";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const navigate = useNavigate();

  const [step, setStep] = useState("cart"); // Gerenciar as etapas do checkout
  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    sameAsBilling: true,
    billingAddress: "",
  });
  const [orderSummary, setOrderSummary] = useState(null);

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

  const handleNextStep = () => {
    if (step === "cart") {
      if (cart.length === 0) {
        toast.error("Seu carrinho está vazio!", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
      setStep("shipping");
    } else if (step === "shipping") {
      // Validação simples dos dados de envio
      const { fullName, address, city, state, zipCode, country } = shippingData;
      if (
        !fullName ||
        !address ||
        !city ||
        !state ||
        !zipCode ||
        !country
      ) {
        toast.error("Por favor, preencha todos os campos obrigatórios.", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
      setStep("confirmation");
    }
  };

  const handlePrevStep = () => {
    if (step === "shipping") {
      setStep("cart");
    } else if (step === "confirmation") {
      setStep("shipping");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "sameAsBilling") {
      setShippingData((prev) => ({
        ...prev,
        sameAsBilling: checked,
        billingAddress: checked ? prev.address : "",
      }));
    } else {
      setShippingData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleConfirmOrder = () => {
    setOrderSummary({
      cart,
      shippingData,
      subtotal,
      total: subtotal, // Aqui você pode adicionar cálculos de frete, impostos, etc.
    });
    setStep("finalize");
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const itens = cart.map((item) => ({
      product: item.volumeInfo.title,
      quantity: item.quantity,
      unit_price: item.saleInfo.listPrice.amount,
      total_price: item.saleInfo.listPrice.amount * item.quantity,
      data: new Date().toISOString(),
    }));
    const body = {
      user_id: user.user_id,
      items: itens,
      shipping: shippingData,
      // Adicione mais campos conforme necessário
    };
    try {
      const response = await apiAxios({
        rota: "api/checkout/",
        metodo: "POST",
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("Compra finalizada com sucesso", {
          position: "top-right",
          autoClose: 2000,
        });
        setStep("success");
      }
    } catch (error) {
      toast.error(`Ocorreu um erro ao tentar finalizar a compra: ${error}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="row p-4">
        <div
          className="col-md-8 offset-md-2 d-flex flex-column"
          style={{ gap: "32px" }}
        >
          <div className="d-flex justify-content-center">
            <h2 className="text-center py-5 mb-3">Carrinho de compras</h2>
          </div>
          
          {/* Etapa do Carrinho */}
          {step === "cart" && (
            <div className="overflow-x">
              {cart.length > 0 ? (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ISBN_13</th>
                        <th scope="col">ISBN_10</th>
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
                            R$
                            {(
                              item.saleInfo.listPrice.amount * item.quantity
                            ).toFixed(2)}
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
                  <div
                    className="d-flex justify-content-end mt-5"
                    style={{ gap: "16px" }}
                  >
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
                    <button className="btn btn-success" onClick={handleNextStep}>
                      Próximo
                      <i className="fa-solid fa-arrow-right p-2"></i>
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ gap: "16px" }}
                  >
                    <h5 className="text-center">
                      Seu carrinho está vazio!
                    </h5>
                    <h5 className="text-center">
                      <a href="/">Voltar ao catálogo</a>
                    </h5>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Etapa de Envio */}
          {step === "shipping" && (
            <div className="shipping-form">
              <h3>Dados de Entrega</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={shippingData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Endereço</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={shippingData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={shippingData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">Estado</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={shippingData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={shippingData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">País</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={shippingData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sameAsBilling"
                    name="sameAsBilling"
                    checked={shippingData.sameAsBilling}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="sameAsBilling">
                    Usar o mesmo endereço para faturamento
                  </label>
                </div>
                {!shippingData.sameAsBilling && (
                  <>
                    <h4>Dados de Faturamento</h4>
                    <div className="mb-3">
                      <label htmlFor="billingAddress" className="form-label">Endereço de Faturamento</label>
                      <input
                        type="text"
                        className="form-control"
                        id="billingAddress"
                        name="billingAddress"
                        value={shippingData.billingAddress}
                        onChange={handleInputChange}
                        required={!shippingData.sameAsBilling}
                      />
                    </div>
                  </>
                )}
              </form>
              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={handlePrevStep}>
                  Voltar
                </button>
                <button className="btn btn-success" onClick={handleNextStep}>
                  Próximo
                  <i className="fa-solid fa-arrow-right p-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Etapa de Confirmação */}
          {step === "confirmation" && (
            <div className="confirmation">
              <h3>Confirme seus Dados</h3>
              <div className="mb-3">
                <h4>Dados de Entrega</h4>
                <p><strong>Nome:</strong> {shippingData.fullName}</p>
                <p><strong>Endereço:</strong> {shippingData.address}, {shippingData.city}, {shippingData.state}, {shippingData.zipCode}, {shippingData.country}</p>
                {!shippingData.sameAsBilling && (
                  <>
                    <h4>Dados de Faturamento</h4>
                    <p><strong>Endereço:</strong> {shippingData.billingAddress}</p>
                  </>
                )}
              </div>
              <div className="mb-3">
                <h4>Resumo do Pedido</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Livro</th>
                      <th scope="col">Quantidade</th>
                      <th scope="col">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>{item.volumeInfo.title}</td>
                        <td>{item.quantity}</td>
                        <td>R${(item.saleInfo.listPrice.amount * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <strong>Subtotal: R${subtotal.toFixed(2)}</strong>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={handlePrevStep}>
                  Voltar
                </button>
                <button className="btn btn-primary" onClick={handleConfirmOrder}>
                  Confirmar Pedido
                  <i className="fa-solid fa-check p-2"></i>
                </button>
              </div>
            </div>
          )}

          {/* Etapa de Finalização */}
          {step === "finalize" && orderSummary && (
            <div className="finalize">
              <h3>Finalizar Compra</h3>
              <button className="btn btn-success" onClick={handleCheckout}>
                Finalizar Compra
                <i className="fa-solid fa-arrow-right p-2"></i>
              </button>
              <button className="btn btn-secondary mt-3" onClick={() => setStep("confirmation")}>
                Voltar
              </button>
            </div>
          )}

          {/* Etapa de Sucesso */}
          {step === "success" && (
            <div className="success">
              <h3>Compra Realizada com Sucesso!</h3>
              <p>Obrigado por sua compra, {user?.name}!</p>
              <p>Número do Pedido: #{Math.floor(Math.random() * 1000000)}</p>
              <p>Você receberá uma confirmação por e-mail em breve.</p>
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Voltar ao Catálogo
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;