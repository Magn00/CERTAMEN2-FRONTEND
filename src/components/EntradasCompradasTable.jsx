import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

function EntradasCompradasTable({ entradas }) {
    const peliculas = [
        { label: 'Todas', value: 'TODAS' },
        { label: 'Wifi Ralph', value: 'Wifi Ralph' },
        { label: 'Dragon Ball Super Broly', value: 'Dragon Ball Super Broly' },
        { label: 'Carcamusas', value: 'Carcamusas' },
        { label: 'El Grinch', value: 'El Grinch' }
    ];

    const [peliculaFiltro, setPeliculaFiltro] = useState('TODAS');

    // filtrar entradas por película seleccionada

    const entradasFiltradas = peliculaFiltro === 'TODAS'
        ? entradas
        : entradas.filter(entrada => entrada.pelicula === peliculaFiltro);

    // calcular el valor a pagar
    const valorPagarTemplate = (rowData) => {
        const valor = rowData.cantidad * 5000;
        return `$${valor.toLocaleString('es-CL')}`;
    };

    // header con el filtro de película
    const header = (
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Entradas Compradas</h5>
            <div className="d-flex align-items-center gap-2">
                <label htmlFor="filtro-pelicula">Filtrar por película:</label>
                <Dropdown
                    id="filtro-pelicula"
                    value={peliculaFiltro}
                    onChange={(e) => setPeliculaFiltro(e.value)}
                    options={peliculas}
                    placeholder="Seleccione película"
                    style={{ width: '200px' }}
                />
            </div>
        </div>
    );

    return (
        <div>
            <DataTable 
                value={entradasFiltradas} 
                header={header}
                tableStyle={{ minWidth: '50rem' }}
                emptyMessage="No hay entradas compradas"
            >
                <Column field="dia" header="Día"></Column>
                <Column field="pelicula" header="Película"></Column>
                <Column field="cantidad" header="Cantidad de Entradas"></Column>
                <Column header="Valor a Pagar" body={valorPagarTemplate}></Column>
            </DataTable>
        </div>
    );
}

export default EntradasCompradasTable;
