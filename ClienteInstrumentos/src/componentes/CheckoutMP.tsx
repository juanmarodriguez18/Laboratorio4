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
    initMercadoPago('TEST-18c092bd-f68f-451d-a689-08da4f78d7d3', {locale: 'es-AR'});

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