import Axios from "axios";

export class ServiceUsuario {
  static async validarUsuario(email, password) {
    const { data } = await Axios.post("/api/users/login", {
      email,
      password,
    });
    const res = data;
    return res;
  }
  static async crearUsuario(name, email, password) {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    const res = data;
    return res;
  }
  static async editarDatos(name, email, password, userInfo) {
    const { data } = await Axios.put(
      "/api/users/profile",
      {
        name,
        email,
        password,
      },
      {
        headers: { Authorization: `Software2 ${userInfo.token}` },
      }
    );
    const res = data;
    return res;
  }
}
