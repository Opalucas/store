import axios from "axios";

const urlBase = "http://localhost:8000";

export default async function apiAxios({
  rota,
  metodo = "GET",
  body = null,
  headers = {},
}) {
  try {
    const response = await axios({
      url: `${urlBase}/${rota}`,
      method: metodo,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...headers,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
}

export async function login(body) {
  console.log(body);
  try {
    const response = await axios({
      url: `${urlTeste}/api/logar`,
      method: "POST",
      data: body,
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw response.data.message;
    }
  } catch (error) {
    return error;
  }
}
