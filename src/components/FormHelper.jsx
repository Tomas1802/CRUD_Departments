/* eslint-disable react/prop-types */
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React from "react";
import { postRoute, putRoute } from "../services/Requests";

function FormHelper(props) {

    const [inputValues, setInputValues] = React.useState({});
    const [selectValues, setSelectValues] = React.useState({});

    React.useEffect(() => {
        const initialValues = {};

        props.headers.forEach(header => {
            initialValues[header.value] = props.item[header.value] || '';
        });
        setInputValues(initialValues);
        setSelectValues(initialValues);
    }, [props.headers, props.item]);

    async function handleRegister(e) {
        e.preventDefault();
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        for (const key in data) {
            if (data[key] === "") {
                data[key] = null;
            }
        }

        if(!validateData(data)) return;
        
        if(props.item.id)
        {
            handleUpdate(data, props.item.id);
            return;
        }
        
        const result = await postRoute(props.selectedTab, data);

        if(result.error)
        {
            props.setNotification("Error al registrar", "error");
            props.setOpen(false);
            props.setItem({})
            props.getData();
            return;
        }

        props.setNotification({text: "Registrado correctamente", type: "success"});
        props.setOpen(false);
        props.setItem({})

        setTimeout(() => {
            props.getData();
        }, 500);
    }

    const validateData = (data) => {
        for (const key in data) {
            console.log(key);
            if (isRequiredField(key)) {
                if(!data[key])
                {
                    props.setNotification({text: "Todos los campos son obligatorios con * son obligatorios", type: "error"});
                    return false;
                }
                if((key === "nombre" || key === "direccion") && data[key].length <= 2)
                {
                    props.setNotification({text: `El campo '${key}' debe tener más de 2 caracteres`, type: "error"});
                    return false;
                }
                if(key === "edad" && data[key] < 0)
                {
                    props.setNotification({text: "La edad no puede ser negativa", type: "error"});
                    return false;
                }
                if(key === "edad" && (data[key].includes("-") || data[key].includes("+") || data[key].includes("*") || data[key].includes("/") || data[key].includes("%") || data[key].includes("e") || data[key].includes("E") || data[key].includes(".")))
                {
                    props.setNotification({text: "La edad no puede tener caracteres especiales", type: "error"});
                    return false;
                }
                if(key === "telefono" && (data[key].length < 7 || data[key].length > 10))
                {
                    props.setNotification({text: "El teléfono debe tener mínimo 7 dígitos y máximo 10", type: "error"});
                    return false;
                }
            }
        }
        return true;
    }

    const isRequiredField = (key) => {
        const requiredFields = props.headers.filter(header => header.required);
        let r = requiredFields.some(field => field.value === key);
        console.log(r);
        return r;
    }

    const handleUpdate = (data, id) => {

        const result = putRoute(props.selectedTab, data, id);

        if(result.error)
        {
            props.setNotification("Error al actualizar", "error");
            props.setOpen(false);
            props.setItem({})
            props.getData();
            return;
        }

        props.setNotification({text: "Actualizado correctamente", type: "success"});
        props.setOpen(false);
        props.setItem({})

        setTimeout(() => {
            props.getData();
        }, 500);
    }

    const handleValueChange = (event) => {
        const { name, value } = event.target;

        if(event.target.type === 'number' && (value.includes("-") || value.includes("+") || value.includes("*") || value.includes("/") || value.includes("%") || value.includes("e") || value.includes("E") || value.includes("."))) 
        {
            setInputValues(prev => ({
                ...prev,
                [name]: ""
            }));
            props.setNotification({text: "Solo se permiten números enteros positivos", type: "error"});
            return;
        }

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

    if (!props.data) {
        return <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div className="loader"></div>
        </div>
    }

    return (
        <div>
            <p style={{fontWeight: "bold", color: "#5d7e95", textAlign: "center", marginBottom: "20px", fontSize: "24px"}}>Ingresar {props.selectedTab}</p>
            <hr />
            <form onSubmit={handleRegister} style={{marginTop: "20px"}}>
                {
                    props.headers.map((header, i) => {
                        if(header.type === 'find' && props.data[header.list].length)
                        {
                            return(
                                <FormControl key={i} style={{width: "100%", marginBottom: "20px"}}>
                                    <InputLabel id={"select-label_" + i}>{header.header + (header.required ? " *" : "")}</InputLabel>
                                    <Select
                                        labelId={"select-label_" + i}
                                        id={"select_" + i}
                                        label={(header.header) + (header.required ? " *" : "")}
                                        name={header.value}
                                        value={selectValues[header.value] || ''}
                                        onChange={handleSelectChange}
                                        disabled={!props.data[header.list].length > 0}
                                    >
                                        {props.data[header.list]?.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>{item.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )
                        }
                        else if(header.type === 'text' || header.type === 'number'){
                            return(
                                <FormControl key={i} style={{width: "100%", marginBottom: "10px"}}>
                                    <TextField name={header.value} label={(header.value === "area" ? header.header + " (m2)" : header.header) + (header.required ? " *" : "")} id={header.value} type={header.type == "number" ? "number" : "text"}  inputProps={{ min: "0", max: header.value === "edad" ? "130" : "", step: "1" }} value={inputValues[header.value] || ''} onInput={handleValueChange} />
                                </FormControl>
                            )
                        }
                    })
                }
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="contained" style={{background: "#edb0a5", color: "#000"}} type="submit">Guardar</Button>
                </div>
            </form>

        </div>
    )
}

export default FormHelper