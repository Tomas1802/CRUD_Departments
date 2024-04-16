/* eslint-disable react/prop-types */
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material"
import MultipleSelectBox from "./MultipleSelectBox";
import React from "react";

function FormHelper(props) {

    const [inputValues, setInputValues] = React.useState({});
    const [selectValues, setSelectValues] = React.useState({});
    const [lists, setLists] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const initialValues = {};
        props.data.forEach(header => {
            console.log("header", header)
            console.log("props", props.item)
            initialValues[header.value] = props.item[header.value] || '';
        });
        setInputValues(initialValues);
        setSelectValues(initialValues);

        const headersToFetch = props.data.filter(header => header.type === 'find');
        if (headersToFetch.length > 0) {
            const fetchPromises = headersToFetch.map(header => fetchListData(header));
            Promise.all(fetchPromises).then(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

    }, [props.headers, props.item]);

    function fetchListData(header) {
        return fetch(`https://tomasparra.azurewebsites.net/api/${capitalizeFirstLetter(header.list)}/Get${capitalizeFirstLetter(header.list)}s`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            console.log("data", data)
            setLists(prev => ({
                ...prev,
                [header.value]: data
            }));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if(data.vivienda_actual_id === ""){
            data.vivienda_actual_id = null;
        }
        if(data.propietario_id === ""){
            data.propietario_id = null;
        }
        if(data.municipio_id === ""){
            data.municipio_id = null;
        }
        console.log("data", data)
        if(props.item.id)
        {
            handleUpdate(data, props.item.id);
            return;
        }
        
        console.log("data", data)
        fetch(`https://tomasparra.azurewebsites.net/api/${capitalizeFirstLetter(props.selectedTab)}/Post${capitalizeFirstLetter(props.selectedTab)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            props.setOpen(false);
            props.setLoadData(!props.loadData);
        })
        .catch(error => {
            console.error('Error:', error);
            props.setOpen(false);
            props.setLoadData(!props.loadData);
        });
    }

    const handleUpdate = (data, id) => {
        console.log("data u", data)
        fetch(`https://tomasparra.azurewebsites.net/api/${capitalizeFirstLetter(props.selectedTab)}/Put${capitalizeFirstLetter(props.selectedTab)}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            props.setItem({});
            props.setLoadData(!props.loadData);
            props.setOpen(false);
        })
        .catch(error => {
            console.error('Error:', error);
            props.setItem({});
            props.setLoadData(!props.loadData);
            props.setOpen(false);
        });
    }

    const handleValueChange = (event) => {
        const { name, value } = event.target;
        setInputValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setSelectValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p style={{fontWeight: "bold", textAlign: "center", marginBottom: "20px"}}>Ingresar {props.selectedTab}</p>
            <hr />
            <form onSubmit={handleRegister}>
                {
                    props.data.map((header, i) => {
                        if(header.type === 'find')
                        {
                            return(
                                <FormControl key={i} style={{width: "100%", marginBottom: "20px"}}>
                                    <InputLabel id={"select-label_" + i}>{header.header}</InputLabel>
                                    <Select
                                        labelId={"select-label_" + i}
                                        id={"select_" + i}
                                        label={header.header}
                                        name={header.value}
                                        value={selectValues[header.value] || ''}
                                        onChange={handleSelectChange}
                                    >
                                        {console.log("hhhh", header.value)}
                                        {lists[header.value]?.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )
                        }
                        else if(header.type === 'select')
                        {
                            return(
                                <FormControl key={i} style={{width: "100%", marginBottom: "10px"}}>
                                    <MultipleSelectBox variants={header.list} title={header.header} item={header}/>
                                </FormControl>
                            )
                        }
                        return(
                            <FormControl key={i} style={{width: "100%", marginBottom: "10px"}}>
                                <InputLabel htmlFor={header.value}>{header.header}</InputLabel>
                                <Input name={header.value} id={header.value} type="text" value={inputValues[header.value] || ''} onInput={handleValueChange} />
                            </FormControl>
                        )
                    })
                }
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="contained" color="success" type="submit">Guardar</Button>
                </div>
            </form>

        </div>
    )
}

export default FormHelper