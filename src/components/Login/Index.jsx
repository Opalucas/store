import React, { useContext, useState } from "react";
import apiAxios from "../../services/API";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { login_user } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await apiAxios({
        rota: "api/login/",
        metodo: "POST",
        body: { username, password },
      });

      const data = response.data;

      const user_info = {
        user_id: data.user_id,
        username: data.username,
        email: data.email,
      };
      login_user(user_info);

      navigate("/");
    } catch (error) {
      setError("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-md-4">
          <h2 className="mb-5 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Usuário"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Senha"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary px-5">
              Entrar
            </button>
            <a className="px-5" href="/newaccount">
              Criar uma conta
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
