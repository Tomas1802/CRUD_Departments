export const sexos = [
    {
        id: 'M',
        name: 'Masculino',
    },
    {
        id: 'F',
        name: 'Femenino',
    },
    {
        id: 'O',
        name: 'Otro',
    }
]

export const personas = [
{
    id: 1,
    name: 'Persona 1',
    phone: '3105746050',
    age: 25,
    sex: 'M',
    municipio: 1,
    viviendaActual: 1,
    viviendas: [1, 2],
    cabezaDeFamiliaDe: [1, 4],
},
{
    id: 2,
    name: 'Persona 2',
    phone: '3101234567',
    age: 30,
    sex: 'F',
    municipio: 1,
    viviendaActual: 1,
    viviendas: [1, 2],
    cabezaDeFamiliaDe: [1, 4],
},
{
    id: 3,
    name: 'Persona 3',
    phone: '3109876543',
    age: 40,
    sex: 'M',
    municipio: 1,
    viviendaActual: 1,
    viviendas: [1, 2],
    cabezaDeFamiliaDe: [1, 4],
},
{
    id: 4,
    name: 'Persona 4',
    phone: '3105555555',
    age: 35,
    sex: 'F',
    municipio: 1,
    viviendaActual: 1,
    viviendas: [1, 2],
    cabezaDeFamiliaDe: [1, 4],
},
{
    id: 5,
    name: 'Persona 5',
    phone: '3101111111',
    age: 50,
    sex: 'M',
    municipio: 1,
    viviendaActual: 1,
    viviendas: [1, 2],
    cabezaDeFamiliaDe: [1, 4],
}];

export const viviendas = [
{
    id: 1,
    name: 'vivienda 1',
    direccion: 'direccion 1',
    capacidad: 25,
    niveles: 2,
    propietario: 1,
    municipio: 1,
},
{
    id: 2,
    name: 'vivienda 2',
    direccion: 'direccion 2',
    capacidad: 25,
    niveles: 2,
    propietario: 2,
    municipio: 1,
},
{
    id: 3,
    name: 'vivienda 3',
    direccion: 'direccion 3',
    capacidad: 25,
    niveles: 2,
    propietario: 3,
    municipio: 1,
}];

export const municipios = [
{
    id: 1,
    name: 'Municipio 1',
    area: 100,
    presupuesto: 1000000,
    viviendas: [1, 2, 3],
    departamento: 2,
},
{
    id: 2,
    name: 'Municipio 2',
    area: 200,
    presupuesto: 2000000,
    viviendas: [1, 2, 3],
    departamento: 1,
},
{
    id: 3,
    name: 'Municipio 3',
    area: 300,
    presupuesto: 3000000,
    viviendas: [1, 2, 3],
    departamento: 1,
},
{
    id: 4,
    name: 'Municipio 4',
    area: 300,
    presupuesto: 3000000,
    viviendas: [1, 2, 3],
    departamento: 1,
},
{
    id: 5,
    name: 'Municipio 5',
    area: 300,
    presupuesto: 3000000,
    viviendas: [1, 2, 3],
    departamento: 1,
}
]

export const departamentos = [
{
    id: 1,
    name: 'Departamento 1',
    municipios: [1, 2],
},
{
    id: 2,
    name: 'Departamento 2',
    municipios: [3],
},
{
    id: 3,
    name: 'Departamento 3',
    municipios: [4, 5],
}
]

