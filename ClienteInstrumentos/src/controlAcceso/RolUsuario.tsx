import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Roles } from '../entidades/Roles';
import Usuario from '../entidades/Usuario';

interface Props {
    rol: Roles[];
}

function RolUsuario({ rol }: Props) {
    const [jsonUsuario, setJSONUsuario] = useState<string | null>(localStorage.getItem('usuario'));
    const usuarioLogueado: Usuario | null = jsonUsuario ? JSON.parse(jsonUsuario) as Usuario : null;

    if (usuarioLogueado && rol.includes(usuarioLogueado.rol)) {
        return <Outlet />;
    } else if (usuarioLogueado) {
        return <Navigate replace to='/grilla' />;
    } else {
        return <Navigate replace to='/login' />;
    }
}

export default RolUsuario;
