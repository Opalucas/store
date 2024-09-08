import React, { useState } from 'react';
import { useAccount } from '../../context/AccountContext';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const { updatePersonalData } = useAccount();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    updatePersonalData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });

    navigate('/address');
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Crie uma nova conta</h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        name="firstName"
                        placeholder="Nome"
                        type="text"
                        className="form-control form-control-lg"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        name="lastName"
                        placeholder="Sobrenome"
                        type="text"
                        className="form-control form-control-lg"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        className="form-control form-control-lg"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        name="password"
                        placeholder="Senha"
                        type="password"
                        className="form-control form-control-lg"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        name="confirmPassword"
                        placeholder="Repita a senha"
                        type="password"
                        className="form-control form-control-lg"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4"
                        onClick={handleSubmit}
                      >
                        Criar conta
                      </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Você já possui conta?
                      <a href="/login" className="fw-bold text-body">
                        <u> Faça login aqui</u>
                      </a>
                    </p>
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

export default CreateAccount;
