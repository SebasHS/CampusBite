import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../componentes/LoadingBox";
import MessageBox from "../componentes/MessageBox";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function EditarProductoScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, loadingUpdate, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [weekDay, setWeekDay] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrecio(data.price);
        setImage(data.image);
        setCategoria(data.category);
        setStock(data.countInStock);
        setDescription(data.description);
        setWeekDay(data.WeekDay);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    getData();
  }, [productId]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    if (e.target.checked === true) {
      setDiasSemana([...diasSemana, parseInt(e.target.value)]);
    } else if (e.target.checked === false) {
      let freshArray = diasSemana.filter(
        (val) => parseInt(val) !== parseInt(e.target.value)
      );
      setDiasSemana([...freshArray]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name: name,
          slug: slug,
          price: precio,
          image: image,
          category: categoria,
          countInStock: stock,
          description: description,
          WeekDay: diasSemana,
        },
        {
          headers: { Authorization: `Software2 ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      console.log("Producto actualizado correctamente");
      navigate("/admin/productos");
    } catch (err) {
      console.log(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <Container fluid="sm">
      <Helmet>
        <title> Editar producto ${productId}</title>
      </Helmet>
      <h1 className="mb-3">Editar producto ${productId}</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label> Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoria">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Imagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Weekday">
            <Form.Label>Dias de la semana</Form.Label>
            <Form.Check
              type="checkbox"
              name="Lunes"
              id="Lunes"
              label="Lunes"
              value={1}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              name="Martes"
              id="Martes"
              label="Martes"
              value={2}
              onChange={handleChange}
            />
            <Form.Check
              autoComplete=""
              type="checkbox"
              name="Miercoles"
              id="Miercoles"
              label="Miercoles"
              value={3}
              onChange={handleChange}
            />
            <Form.Check
              autoComplete=""
              type="checkbox"
              name="Jueves"
              id="Jueves"
              label="Jueves"
              value={4}
              onChange={handleChange}
            />
            <Form.Check
              autoComplete=""
              type="checkbox"
              name="Viernes"
              id="Viernes"
              label="Viernes"
              value={5}
              onChange={handleChange}
            />
            <Form.Check
              autoComplete=""
              type="checkbox"
              name="Sabado"
              id="Sabado"
              label="Sabado"
              value={6}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Confirmar cambios
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
}
