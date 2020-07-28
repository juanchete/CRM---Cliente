import React, {useEffect, useState, useContext} from 'react'
import Select from 'react-select'
import {gql, useQuery} from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext'

const OBTENER_PRODUCTOS = gql`
query obtenerProductos{
  obtenerProductos{
    id
    nombre
    existencia
    precio
  }
}`;

function AsignarProductos() {

    //state local del componetne
    const [productos, setProductos] = useState([])

    //Context de pedidos

    const pedidoContext = useContext(PedidoContext)
    const{agregarProducto} = pedidoContext;

    //Consulta a BDD
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS)

    useEffect(() => {
        agregarProducto(productos);
    }, [productos])

    const seleccionarProducto = producto =>{
       setProductos(producto);
    }

    if (loading) return null
    

    const{ obtenerProductos } = data


    return (
        <>

        

        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Selecciona o busca los productos</p>
        <Select
        className="mt-3"
                options={obtenerProductos}
                onChange= { opcion => {seleccionarProducto(opcion)}}
                isMulti={true}
                getOptionValue={opciones=>opciones.id}
                getOptionLabel={opciones=>`${opciones.nombre} - ${opciones.existencia} Disponibles`}
                placeholder="Busque o seleccione el producto"
                noOptionsMessage= { () => "No hay resultados"}
        />
        
    </>
    )
}

export default AsignarProductos
