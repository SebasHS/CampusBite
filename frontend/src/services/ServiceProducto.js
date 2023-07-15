import Axios from "axios";

export class ServiceProducto {
  static async obtenerProductos() {
    const res = Axios.get("/api/products");
    return res;
  }
  static async obtenerPorId(item) {
    const res = Axios.get(`/api/products/${item._id}`);
    return res;
  }
  static async obtenerPorSlug(slug) {
    const res = Axios.get(`/api/products/slug/${slug}`);
    return res;
  }
  static async obtenerCategorias() {
    const res = Axios.get(`/api/products/categories`);
    return res;
  }
  static async obtenerQuerys(page, query, category) {
    const res = Axios.get(
      `/api/products/search?page=${page}&query=${query}&category=${category}`
    );
    return res;
  }
}
