import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import apiAxios from "../../services/API";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const { user } = useContext(UserContext);
  const { cart, updateQuantity, removeItem, removeAll } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [order_id, setOrderId] = useState();
  const [step, setStep] = useState("cart");
  const [shippingData, setShippingData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    neighborhood: "",
    number: "",
    newAddress: false,
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce((total, item) => {
    return total + item.saleInfo.listPrice.amount * item.quantity;
  }, 0);

  const userAddresses = async () => {
    try {
      const body = { username: user.username };
      const response = await apiAxios({
        rota: "api/user-address/",
        metodo: "POST",
        body: body,
      });
      if (response.data.length === 0) {
        toast.error(
          "Não há cadastro de endereço para o usuário, por favor cadastre um endereço antes de realizar a compra",
          { position: "top-right", autoClose: 4000 }
        );
        return [];
      } else {
        const formattedAddresses = response.data.addresses.map((address) => ({
          ...address,
          fullName: address.fullname,
        }));
        return formattedAddresses;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const handleNextStep = async () => {
    if (step === "cart" && !user) {
      navigate("/login");
    } else {
      if (step === "cart") {
        if (cart.length === 0) {
          toast.error("Seu carrinho está vazio!", {
            position: "top-right",
            autoClose: 2000,
          });
          return;
        }

        const response = await userAddresses();
        setAddresses(response);
        setStep("shipping");
      } else if (step === "shipping") {
        if (!selectedAddress && !shippingData.newAddress) {
          toast.error("Por favor, selecione um endereço ou preencha um novo.", {
            position: "top-right",
            autoClose: 2000,
          });
          return;
        }

        if (shippingData.newAddress) {
          const { fullName, street, city, state, neighborhood, number } =
            shippingData;
          if (
            !fullName ||
            !street ||
            !city ||
            !state ||
            !neighborhood ||
            !number
          ) {
            toast.error("Por favor, preencha todos os campos obrigatórios.", {
              position: "top-right",
              autoClose: 2000,
            });
            return;
          }
        }

        setStep("confirmation");
      } else if (step == "confirmation") {
        handleCheckout();
      }
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
    if (type === "checkbox") {
      setShippingData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setShippingData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    setShippingData({
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      state: address.state,
      neighborhood: address.neighborhood,
      number: address.number,
      newAddress: false,
    });
  };

  const handleCheckout = async () => {
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
    };

    try {
      const response = await apiAxios({
        rota: "api/checkout/",
        metodo: "POST",
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        removeAll();
        toast.success("Compra finalizada com sucesso", {
          position: "top-right",
          autoClose: 2000,
        });
        setOrderId(response.data.order_id);
        setStep("success");
      }
    } catch (error) {
      toast.error(`Erro ao finalizar a compra: ${error}`, {
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

          {step === "shipping" && (
            <div className="shipping-form col-md-5 offset-md-4">
              <h3>Dados de Entrega</h3>
              <form>
                <h6>
                  Selecione um endereço cadastrado ou cadastre um novo endereço
                  abaixo:
                </h6>
                <div className="d-flex">
                  {addresses.length > 0 && (
                    <>
                      {addresses.map((address, index) => (
                        <div className="form-check py-4 px-3" key={index}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selectedAddress"
                            id={`address-${index}`}
                            onChange={() => handleAddressSelection(address)}
                            checked={selectedAddress?.street === address.street}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`address-${index}`}
                          >
                            <div className="card" style={{ width: "20rem" }}>
                              <div className="card-body">
                                <h3 className="card-title">
                                  {address.fullName}
                                </h3>
                                <p className="card-text py-0">
                                  Rua: {address.street}
                                </p>
                                <p className="card-text py-0">
                                  Número: {address.number}
                                </p>
                                <p className="card-text py-0">
                                  Cidade: {address.city}
                                </p>
                                <p className="card-text py-0">
                                  Bairro: {address.neighborhood}
                                </p>
                                <p className="card-text py-0">
                                  Estado: {address.state}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="form-check mt-4 mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="newAddress"
                    id="newAddress"
                    checked={shippingData.newAddress}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="newAddress">
                    Usar um novo endereço
                  </label>
                </div>

                {shippingData.newAddress && (
                  <>
                    <div className="mb-2">
                      <label htmlFor="fullName" className="form-label">
                        Nome Completo
                      </label>
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
                    <div className="mb-2">
                      <label htmlFor="street" className="form-label">
                        Endereço
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        value={shippingData.street}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="city" className="form-label">
                        Cidade
                      </label>
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
                    <div className="mb-2">
                      <label htmlFor="state" className="form-label">
                        Estado
                      </label>
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
                    <div className="mb-2">
                      <label htmlFor="neighborhood" className="form-label">
                        Bairro
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="neighborhood"
                        name="neighborhood"
                        value={shippingData.neighborhood}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="number" className="form-label">
                        Número
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        name="number"
                        value={shippingData.number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          )}

          <div className="col-md-8 offset-md-2">
            {step === "cart" && (
              <div className="cart-items">
                {cart.length === 0 ? (
                  <>
                    <div className="row">
                      <div className="col col-md-4 offset-md-2">
                        <p className="text-center">Seu carrinho está vazio.</p>
                      </div>
                      <div className="col-md-5">
                        <button
                          className="btn btn-primary"
                          style={{ marginLeft: "30px" }}
                          onClick={() => navigate("/")}
                        >
                          Voltar ao Catálogo
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <img
                        src={item.volumeInfo.imageLinks.thumbnail}
                        alt={item.volumeInfo.title}
                        style={{ width: "100px" }}
                      />
                      <div className="ms-3">
                        <h5>{item.volumeInfo.title}</h5>
                        <p>
                          {item.saleInfo.listPrice.currencyCode}{" "}
                          {item.saleInfo.listPrice.amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="d-flex ms-auto align-items-center">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger ms-3"
                          onClick={() => removeItem(item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {step === "confirmation" && (
              <div className="order-summary">
                <h3>Resumo do Pedido</h3>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.volumeInfo.title} - {item.quantity} unidade(s)
                    </li>
                  ))}
                </ul>
                <h4>Subtotal: R$ {subtotal.toFixed(2)}</h4>
              </div>
            )}
            {step === "success" && (
              <div className="order-success">
                <h3>Pedido #{order_id.toString().padStart(5, '0')} Finalizado com Sucesso!</h3>
                <p>
                  Acesse seu histórico de compras para mais detalhes. Agradecemos a preferência!
                </p>
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="d-flex justify-content-between py-3 mt-2">
              {step !== "cart" && (
                <button className="btn btn-secondary" onClick={handlePrevStep}>
                  Voltar
                </button>
              )}
              {step !== "success" && (
                <button className="btn btn-primary" onClick={handleNextStep}>
                  {step === "confirmation" ? "Finalizar Compra" : "Próximo"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
