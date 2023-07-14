import Axios from "axios";

export class ServiceRestaurante {
  static async obtenerHorarios() {
    const res = Axios.get("/api/restaurantes/horarios-restau");
    return res;
  }
}
