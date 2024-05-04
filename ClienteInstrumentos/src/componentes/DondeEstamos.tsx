import React from 'react';
import Encabezado from './Encabezado';

const DondeEstamos: React.FC = () => {
  return (
    <div>
      <Encabezado></Encabezado>
      <h2>Ubicación</h2>
      <iframe
        title="Ubicacion"
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.504268403837!2d-68.85264198533005!3d-32.89674188093578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967b09b81420c2bf%3A0x16f37e5577dc2a41!2sAv.%20Las%20Heras%20%26%20Av.%20San%20Mart%C3%ADn%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1619592604482!5m2!1ses-419!2sar"
      ></iframe>
    </div>
  );
};

export default DondeEstamos;
