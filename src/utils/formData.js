
export const tablaPersonas = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre'
    },
    {
        header: 'Teléfono',
        type: 'text',
        value: 'telefono'
    },
    {
        header: 'Edad',
        type: 'text',
        value: 'edad'
    },
    {
        header: 'Sexo',
        type: 'find',
        value: 'sexo',
        list: "sexo",
        listValue: []
    },
    {
        header: 'Municipio',
        type: 'find',
        value: 'municipio_id',
        list: "municipio",
        listValue: []
    },
    {
        header: 'Vivienda actual',
        type: 'find',
        value: 'vivienda_actual_id',
        list: "vivienda",
        listValue: []
    },
    {
        header: 'Cabeza de familia',
        type: 'find',
        value: 'cabeza_familia_id',
        list: "persona",
        listValue: []
    },
]

export const tablaViviendas = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre'
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
        value: 'propietario_id',
        list: "persona",
        listValue: []
    },
    {
        header: 'Municipio',
        type: 'find',
        value: 'municipio_id',
        list: "municipio",
        listValue: []
    },
]

export const tablaMunicipios = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre'
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
        header: 'Departamento',
        type: 'find',
        value: 'departamento_id',
        list: "departamento",
        listValue: []
    },
]

export const tablaDepartamentos = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre'
    },
]