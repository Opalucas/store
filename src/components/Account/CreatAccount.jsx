import React, { useState } from "react";
import { useAccount } from "../../context/AccountContext";
import { useNavigate } from "react-router-dom";
import apiAxios from "../../services/API";

const CreateAccount = () => {
  const { updatePersonalData } = useAccount();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    const { password, firstName, lastName } = formData;
    let passwordErrors = {};

    if (password.length < 8) {
      passwordErrors.length =
        "Sua senha precisa conter pelo menos 8 caracteres.";
    }
    if (password.match(/^\d+$/)) {
      passwordErrors.numeric = "Sua senha não pode ser inteiramente numérica.";
    }
    if (
      password.toLowerCase().includes(firstName.toLowerCase()) ||
      password.toLowerCase().includes(lastName.toLowerCase())
    ) {
      passwordErrors.similar =
        "Sua senha não pode ser muito parecida com o resto das suas informações pessoais.";
    }

    const commonPasswords = ["12345678", "password", "qwerty"];
    if (commonPasswords.includes(password)) {
      passwordErrors.common =
        "Sua senha não pode ser uma senha comumente utilizada.";
    }
    return passwordErrors;
  };

  const handleSubmit = async () => {
    const passwordErrors = validatePassword();
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "As senhas informadas não coincidem!" });
      return;
    }

    try {
      const response = await apiAxios({
        rota: "api/check-username/",
        metodo: "POST",
        body: { username: formData.username },
      });
      if (response.status == 200) {
        updatePersonalData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        navigate("/address");
      }
    } catch (error) {
      if (error.response.status == 400) {
        setErrors({ username: error.response.data.error });
      }
    }
  };

  return (
    <div className="d-flex align-items-center h-100 py-4">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-5">
            <div className="card" style={{ borderRadius: "25px" }}>
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Crie uma nova conta</h2>

                <form>
                  <div className="form-outline mb-3">
                    <input
                      name="firstName"
                      placeholder="Nome"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      name="lastName"
                      placeholder="Sobrenome"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      name="username"
                      placeholder="Nome de usuário"
                      type="text"
                      className="form-control form-control-md"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <p className="text-danger">{errors.username}</p>
                    )}
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      name="email"
                      placeholder="Email"
                      type="email"
                      className="form-control form-control-md"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      name="password"
                      placeholder="Senha"
                      type="password"
                      className="form-control form-control-md"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.length && (
                      <p className="text-danger">{errors.length}</p>
                    )}
                    {errors.similar && (
                      <p className="text-danger">{errors.similar}</p>
                    )}
                    {errors.common && (
                      <p className="text-danger">{errors.common}</p>
                    )}
                    {errors.numeric && (
                      <p className="text-danger">{errors.numeric}</p>
                    )}
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      name="confirmPassword"
                      placeholder="Repita a senha"
                      type="password"
                      className="form-control form-control-md"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className="text-danger">{errors.confirmPassword}</p>
                    )}
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
                  </p>
                  <p className="text-center">
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
  );
};

export default CreateAccount;
