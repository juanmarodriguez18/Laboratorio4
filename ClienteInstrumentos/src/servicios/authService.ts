// servicios/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export async function login(nombreUsuario: string, clave: string): Promise<any> {
    try {
        const response = await axios.post(`${API_URL}/login`, { nombreUsuario, clave });
        const token = response.data.jwt;

        localStorage.setItem('token', token);

        const userResponse = await axios.get(`${API_URL}/currentUser`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        });

        const usuarioLogueado = userResponse.data;
        localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
        // Mostrar la respuesta del servidor en la consola
        console.log('Response from login API:', response.data);
        console.log('Usuario Logueado: ', usuarioLogueado);

        return usuarioLogueado;
    } catch (error) {
        throw new Error('Usuario y/o Clave incorrectos, vuelva a intentar');
    }
}

export async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    // Limpiar cualquier otro estado relacionado con la sesión aquí si es necesario
}
