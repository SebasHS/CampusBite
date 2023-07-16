import Axios from "axios";

export class ServiceRestaurante {
  static async obtenerHorarios() {
    const res = Axios.get("/api/restaurantes/horarios-restau");
    return res;
  }
  static async crearProducto(id, userInfo) {
    return Axios.post(
      "/api/products",
      { id },
      {
        headers: { Authorization: `Software2 ${userInfo.token}` },
      }
    );
  }
}
