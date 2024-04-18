
export const tablaPersonas = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre',
        valid: true,
        required: true,
    },
    {
        header: 'Teléfono',
        type: 'number',
        value: 'telefono',
        valid: true,
        required: true,
    },
    {
        header: 'Edad',
        type: 'number',
        value: 'edad',
        valid: true,
        required: true,
    },
    {
        header: 'Sexo',
        type: 'find',
        value: 'sexo',
        list: "Sexo",
        listValue: [],
        valid: true,
        required: true,
    },
    {
        header: 'Municipio',
        type: 'find',
        value: 'municipio_id',
        list: "Municipio",
        listValue: [],
        valid: true,
    },
    {
        header: 'Vivienda actual',
        type: 'find',
        value: 'vivienda_actual_id',
        list: "Vivienda",
        listValue: [],
        valid: true,
    },
    {
        header: 'Cabeza de familia',
        type: 'find',
        value: 'cabeza_familia_id',
        list: "Persona",
        listValue: [],
        valid: true,
    },
]

export const tablaViviendas = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre',
        valid: true,
        required: true,
    },
    {
        header: 'Dirección',
        type: 'text',
        value: 'direccion',
        valid: true,
        required: true,
    },
    {
        header: 'Capacidad',
        type: 'number',
        value: 'capacidad',
        valid: true,
        required: true,
    },
    {
        header: 'Niveles',
        type: 'number',
        value: 'niveles',
        valid: true,
        required: true,
    },
    {
        header: 'Propietario',
        type: 'find',
        value: 'propietario_id',
        list: "Persona",
        listValue: [],
        valid: true,
    },
    {
        header: 'Municipio',
        type: 'find',
        value: 'municipio_id',
        list: "Municipio",
        listValue: [],
        valid: true,
    },
]

export const tablaMunicipios = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre',
        valid: true,
        required: true,
    },
    {
        header: 'Área',
        type: 'number',
        value: 'area',
        valid: true,
        required: true,
    },
    {
        header: 'Presupuesto',
        type: 'number',
        value: 'presupuesto',
        valid: true,
        required: true,
    },
    {
        header: 'Departamento',
        type: 'find',
        value: 'departamento_id',
        list: "Departamento",
        listValue: [],
        valid: true,
    },
]

export const tablaDepartamentos = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre',
        valid: true,
        required: true,
    },
]

export const tablaServicios = [
    {
        header: 'Nombre',
        type: 'text',
        value: 'nombre',
        valid: true,
        required: true,
    },
    {
        header: 'Costo',
        type: 'number',
        value: 'costo',
        valid: true,
        required: true,
    },
    {
        header: 'Municipio',
        type: 'find',
        value: 'municipio_id',
        list: "Municipio",
        listValue: [],
        valid: true,
    },
    {
        header: 'Descripción',
        type: 'text',
        value: 'descripcion',
        valid: true,
        required: true,
    },
    {
        header: 'Persona',
        type: 'find',
        value: 'persona_id',
        list: "Persona",
        listValue: [],
        valid: true,
        required: true,
    },
]