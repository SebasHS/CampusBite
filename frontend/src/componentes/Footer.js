import React, { useState } from 'react';
import { ServiceRestaurante } from '../services/ServiceRestaurante';

const Footer = () => {
  const [horarios, setHorarios] = useState([])

  const getData =  async () => {
    try {
      const {horarios} = await ServiceRestaurante.obtenerHorarios();
      setHorarios(horarios);
    } catch (err) {
      setHorarios(err.message)
    }
  }

  return (
    <div>
      <h2>Horarios de atención:</h2>
      <ul>
        {horas.map((hora, index) => (
          <li key={index}>
            {hora.dia}: {hora.horario}
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default Footer;
