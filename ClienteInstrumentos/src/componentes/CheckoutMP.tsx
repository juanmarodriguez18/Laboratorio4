import { useState } from "react";
import { createPreferenceMP } from "../servicios/FuncionesInstrumento";
import PreferenceMP from "../entidades/mercadopago/PreferenceMP";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";

function CheckoutMP ({montoCarrito = 0}) {
    const [idPreference, setIdPreference ] = useState<string>('');

    const getPreferenceMP = async () => {
        const response:PreferenceMP = await createPreferenceMP({id: 0, fechaPedido: new Date() ,totalPedido: montoCarrito});
        console.log("Preference id: "+ response.id);
        if(response){
            setIdPreference(response.id);
        } else {
            alert("Agregue al menos un instrumento al carrito");
        }
    }
    // es la Public Key se utiliza generalmente en el frontend
    initMercadoPago('TEST-0f1247a0-d436-4430-b0b7-d6fb3d76ff5e', {locale: 'es-AR'});

    //redirectMode es optativo y puede ser self, blank o modal
    return (
        <div>
            <button onClick={getPreferenceMP} className='btMercadoPago'>COMPRAR con <br></br> Mercado Pago</button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
            <Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{  texts:{ valueProp: 'smart_option'}}} />
            </div>
        </div>
    );
}

export default CheckoutMP