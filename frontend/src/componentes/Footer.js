import React, { useEffect, useState } from 'react';
import { ServiceRestaurante } from '../services/ServiceRestaurante';

const Footer = () => {
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await ServiceRestaurante.obtenerHorarios();
        console.log(res)
        const xd = res.data;
        setHorarios(xd);
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    };

    getData()

  }, [])



  return (

    <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <h2>Horarios de atención:</h2>
          {horarios.map(item =>
          (
            <div>
              <h3>{item.name}</h3>
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
  );
};

export default Footer;
