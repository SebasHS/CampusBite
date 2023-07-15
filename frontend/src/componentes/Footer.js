import React, { useEffect, useState } from "react";
import { ServiceRestaurante } from "../services/ServiceRestaurante";

const Footer = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await ServiceRestaurante.obtenerHorarios();
        setHorarios(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
      <div>
        <h2>Horarios de atención:</h2>
        {loading && <div>Loading</div>}
        {!loading && (
          <div className="row">
            {horarios.map((item) => (
              <div key={item._id} className="col">
                <h4>{item.name}</h4>
                <ul>
                  <li> Lunes: {item.horario.Lunes}</li>
                  <li> Martes: {item.horario.Martes}</li>
                  <li> Miercoles: {item.horario.Miercoles}</li>
                  <li> Jueves: {item.horario.Jueves}</li>
                  <li> Viernes: {item.horario.Viernes}</li>
                  <li> Sabado: {item.horario.Sabado}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Footer;
