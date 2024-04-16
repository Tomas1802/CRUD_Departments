import { departamentos, municipios, personas, sexos, viviendas } from "./data";

export const tablaPersonas = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'name'
    },
    {
        header: 'Teléfono',
        type: 'text',
        value: 'phone'
    },
    {
        header: 'Edad',
        type: 'text',
        value: 'age'
    },
    {
        header: 'Sexo',
        type: 'find',
        value: 'sex',
        list: sexos
    },
    {
        header: 'Municipio',
        type: 'find',
        value: 'municipio',
        list: municipios
    },
    {
        header: 'Vivienda actual',
        type: 'find',
        value: 'viviendaActual',
        list: viviendas
    },
    {
        header: 'Viviendas',
        type: 'select',
        value: 'viviendas',
        list: viviendas
    },
    {
        header: 'Cabeza de familia de',
        type: 'select',
        value: 'cabezaDeFamiliaDe',
        list: personas
    },
]

export const tablaViviendas = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'name'
    },
    {
        header: 'Dirección',
        type: 'text',
        value: 'direccion'
    },
    {
        header: 'Capacidad',
        type: 'text',
        value: 'capacidad'
    },
    {
        header: 'Niveles',
        type: 'text',
        value: 'niveles'
    },
    {
        header: 'Propietario',
        type: 'find',
        value: 'propietario',
        list: personas
    },
    {
        header: 'Municipio',
        type: 'find',
        value: 'municipio',
        list: municipios
    },
]

export const tablaMunicipios = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'name'
    },
    {
        header: 'Área',
        type: 'text',
        value: 'area'
    },
    {
        header: 'Presupuesto',
        type: 'text',
        value: 'presupuesto'
    },
    {
        header: 'Viviendas',
        type: 'select',
        value: 'viviendas',
        list: viviendas
    },
    {
        header: 'Departamento',
        type: 'find',
        value: 'departamento',
        list: departamentos
    },
]

export const tablaDepartamentos = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre'
    },
]