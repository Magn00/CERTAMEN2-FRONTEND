import { Panel } from 'primereact/panel';
import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';

function ComprarEntradaForm({ onCreateEntrada = (entrada) => {} }) {
    const diasSemana = [
        { label: 'Lunes', value: 'Lunes' },
        { label: 'Martes', value: 'Martes' },
        { label: 'Miércoles', value: 'Miércoles' },
        { label: 'Jueves', value: 'Jueves' },
        { label: 'Viernes', value: 'Viernes' }
    ];

    const tiposPago = ['Efectivo', 'Tarjeta'];
    
    const peliculas = [
        { label: 'Wifi Ralph', value: 'Wifi Ralph' },
        { label: 'Dragon Ball Super Broly', value: 'Dragon Ball Super Broly' },
        { label: 'Carcamusas', value: 'Carcamusas' },
        { label: 'El Grinch', value: 'El Grinch' }
    ];

    const [dia, setDia] = useState(null);
    const [tipoPago, setTipoPago] = useState('Efectivo');
    const [cantidad, setCantidad] = useState(null);
    const [ciudad, setCiudad] = useState('');
    const [pelicula, setPelicula] = useState(null);

    const handleClick = () => {
        // Acumular todos los errores
        const errores = [];
        
        if (!dia) {
            errores.push("Debe seleccionar un día de la semana");
        }
        
        if (!tipoPago) {
            errores.push("Debe seleccionar un tipo de pago");
        }
        
        if (!cantidad || cantidad <= 0) {
            errores.push("La cantidad debe ser mayor que 0");
        }
        
        if (!ciudad || ciudad.trim() === '') {
            errores.push("Debe ingresar una ciudad");
        }
        
        if (!pelicula) {
            errores.push("Debe seleccionar una película");
        }

        // enviar todos los errores
        if (errores.length > 0) {
            onCreateEntrada({ error: errores.join(", ") });
            return;
        }

        const entrada = {
            dia: dia,
            tipoPago: tipoPago,
            cantidad: cantidad,
            ciudad: ciudad,
            pelicula: pelicula
        };
        
        onCreateEntrada(entrada);
        
        // Limpiar formulario
        setDia(null);
        setTipoPago('Efectivo');
        setCantidad(null);
        setCiudad('');
        setPelicula(null);
    };

    return (
        <Panel header="Comprar Entrada">
            <div className="mb-3 d-flex flex-column">
                <label htmlFor="dia-dropdown">Día</label>
                <Dropdown 
                    id="dia-dropdown" 
                    value={dia} 
                    onChange={(e) => setDia(e.value)} 
                    options={diasSemana} 
                    placeholder="Seleccione el día de la semana" 
                    checkmark={true}
                />
            </div>

            <div className="mb-3 d-flex flex-column">
                <label htmlFor="tipo-pago-select">Tipo de Pago</label>
                <SelectButton 
                    id='tipo-pago-select' 
                    options={tiposPago} 
                    value={tipoPago} 
                    onChange={e => setTipoPago(e.value)} 
                />
            </div>

            <div className="mb-3 d-flex flex-column">
                <label htmlFor="cantidad-input">Cantidad de Entradas</label>
                <InputNumber 
                    id='cantidad-input' 
                    value={cantidad} 
                    onValueChange={e => setCantidad(e.value)} 
                    min={0}
                    placeholder="Ingrese la cantidad (debe ser mayor que 0)"
                />
            </div>

            <div className="mb-3 d-flex flex-column">
                <label htmlFor="ciudad-txt">Ciudad</label>
                <InputText 
                    id="ciudad-txt"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ingrese la ciudad"
                />
            </div>

            <div className="mb-3 d-flex flex-column">
                <label htmlFor="pelicula-listbox">Película</label>
                <ListBox 
                    id="pelicula-listbox"
                    value={pelicula} 
                    onChange={e => setPelicula(e.value)} 
                    options={peliculas}
                    placeholder="Seleccione una película"
                />
            </div>

            <div className="mb-3 mt-2">
                <Button onClick={handleClick} label='Comprar' severity='success' />
            </div>
        </Panel>
    );
}

export default ComprarEntradaForm;
