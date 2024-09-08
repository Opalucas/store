import React, { useContext } from 'react';
import {AccountContext} from "../../context/AccountContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddressForm = () => {
  const { accountData } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const form = document.querySelector('form');
    const formData = new FormData(form);

    const addressData = {
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
    };

    const finalData = { ...accountData, ...addressData };

    try {
      await axios.post('/api/create-account', finalData);
      navigate('/success');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Dados de Endereço</h2>
                  <form>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input name="address" placeholder="Endereço" type="text" className="form-control form-control-lg" />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input name="city" placeholder="Cidade" type="text" className="form-control form-control-lg" />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input name="state" placeholder="Estado" type="text" className="form-control form-control-lg" />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input name="zip" placeholder="CEP" type="text" className="form-control form-control-lg" />
                    </div>
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
    </section>
  );
};

export default AddressForm;
