import React from 'react';

const Footer = () => {
  const horas = [
    { dia: 'Lunes - Viernes', horario: '7:00 AM - 6:00 PM' },
    { dia: 'Sábado', horario: '7:00 AM - 2:00 PM' },
    { dia: 'Domingo', horario: 'Cerrado' },
  ];

  return (
    <div>
      <h2>Horario de atención:</h2>
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
