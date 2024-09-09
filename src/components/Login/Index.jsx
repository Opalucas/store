import React, { useContext, useState } from "react";
import apiAxios from "../../services/API";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Loading from "../Loading/Loading";

const Login = () => {
  const { login_user } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
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
        firstname: data.firstname,
      };
      login_user(user_info);

      navigate("/");
    } catch (error) {
      setError("Usuário ou senha incorretos!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
      <div className="d-flex align-items-center py-4">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-5 col-xl-5">
              <div className="card" style={{ borderRadius: "25px" }}>
                <div className="card-body p-5">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
