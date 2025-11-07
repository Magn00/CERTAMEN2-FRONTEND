import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import SansanMarkToolbar from '../components/SansanMarkToolbar';
import ComprarEntradaForm from '../components/ComprarEntradaForm';
import EntradasCompradasTable from '../components/EntradasCompradasTable';
import { createEntrada, getEntradas } from '../services/EntradasServices';

const SansanMarkContainer = () => {
    const toast = useRef(null);
    const [entradas, setEntradas] = useState([]);

    // Cargar entradas al montar el componente
    useEffect(() => {
        setEntradas(getEntradas());
    }, []);

    const handleEntradaCreate = (entrada) => {
        // Si entrada es null, significa que hubo un error de validación
        if (entrada === null) {
            toast.current.show({
                severity: "error", 
                summary: "Datos inválidos", 
                detail: "Todos los campos son obligatorios y la cantidad debe ser mayor que 0",
                sticky: true
            });
            return;
        }

        // Crear la entrada
        createEntrada(entrada);
        setEntradas(getEntradas());
        
        toast.current.show({
            severity: "success", 
            summary: "Entrada comprada", 
            detail: "La entrada ha sido registrada exitosamente",
            sticky: true
        });
    };

    return (
        <>
            <Toast ref={toast}></Toast>
            <SansanMarkToolbar></SansanMarkToolbar>
            
            <div className='container-fluid mt-5'>
                <div className="row">
                    <div className="col-md-4">
                        <ComprarEntradaForm onCreateEntrada={handleEntradaCreate} />
                    </div>
                    <div className="col-md-8">
                        <EntradasCompradasTable entradas={entradas} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SansanMarkContainer;
