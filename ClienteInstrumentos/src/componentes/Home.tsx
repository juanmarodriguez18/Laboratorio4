import React from 'react';
import Slider from './Slider';
import './css/Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-container">
        <h2>Musical Hendrix</h2>
        <p>
          Musical Hendrix es una tienda de instrumentos musicales con más de 15 años de experiencia.
          Tenemos el conocimiento y la capacidad para informarte acerca de las mejores elecciones para tu compra musical.
        </p>
        <Slider />
      </div>
    </div>
  );
};

export default Home;
