import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [rol, setRol] = useState('Visor');
    const [mensaje, setMensaje] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/register', { nombreUsuario, clave, rol });
            alert('Usuario registrado exitosamente');
            navigate('/login'); // Redirige a la página de login
        } catch (error) {
            setMensaje('Error al registrar el usuario');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
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
                <div>
                    <label>Rol</label>
                    <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                        <option value="Admin">Admin</option>
                        <option value="Operador">Operador</option>
                        <option value="Visor">Visor</option>
                    </select>
                </div>
                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Register;
