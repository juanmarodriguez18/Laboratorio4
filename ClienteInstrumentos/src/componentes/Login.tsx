import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (nombreUsuario: string, clave: string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(nombreUsuario, clave);
      // Mostrar la respuesta del servidor en la consola
      setError('');
      navigate('/home'); // Redirigir a la página de productos
    } catch (error) {
      setError('Usuario y/o Clave incorrectos, vuelva a intentar');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Clave</label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
};

export default Login;
