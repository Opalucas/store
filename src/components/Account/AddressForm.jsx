import React, { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../services/API";

const AddressForm = () => {
  const { accountData } = useContext(AccountContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    neighborhood: "",
    state: "",
    number: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const finalData = {
      personal: accountData.personal,
      address: formData,
    };
    try {
      const response = await apiAxios({
        rota: "api/create-user/",
        metodo: "POST",
        body: finalData,
      });
      if(response.status == 201){
        navigate('/login');
      }
    } catch (error) {
      if (error.response.status == 400) {
        setErrors({ fields: error.response.data.error });
      }
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-7 col-lg-5 col-xl-5">
            <div className="card" style={{ borderRadius: "25px" }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-5">Dados de Endereço</h2>
                <form>
                  <div data-mdb-input-init className="form-outline mb-3">
                    <input
                      name="street"
                      placeholder="Endereço"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-3">
                    <input
                      name="number"
                      placeholder="Numero"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-3">
                    <input
                      name="city"
                      placeholder="Cidade"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-3">
                    <input
                      name="neighborhood"
                      placeholder="Bairro"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.neighborhood}
                      onChange={handleChange}
                    />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-3">
                    <input
                      name="state"
                      placeholder="Estado"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.fields && (
                      <p className="text-danger">{errors.fields}</p>
                    )}
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-success btn-block btn-lg gradient-custom-4"
                      onClick={handleSubmit}
                    >
                      Finalizar Cadastro
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
