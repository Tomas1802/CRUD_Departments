/* eslint-disable react/prop-types */
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@mui/material";
import { FaMale, FaFemale } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import { GiFamilyHouse } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { deleteRoute } from "../services/Requests";



function TableHelper(props) {

    const handleOpenModal = (data) => {
        props.setItem(data);
        props.setOpen(true);
    }

    
    async function handleDelete(obj) {
        let erased = await deleteRoute(props.selectedTab, obj.id);
        
        if(!erased && props.selectedTab === "Persona")
        {
            props.setNotification({text: `Elimine las viviendas pertenecientes a ${obj.nombre} primero`, type: "error"});
            return;
        }
        
        props.getData();
        props.setNotification({text: "Borrado correctamente", type: "success"});
    }

    if (!props.data[props.selectedTab]) {
        return <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div className="loader"></div>
        </div>
    }

    return (
        <div style={{height: "100%"}}>
            {props.data[props.selectedTab].length > 0 ? <table style={{width: "100%"}}>
                <thead>
                    <tr style={{position: "sticky", top: "0", background: "#efefef", zIndex: "2"}}>
                        {
                            props.headers.map((header, index) => {
                                return (
                                    <th style={{textAlign: "left", color: "#5d7e95"}} key={index}>{header.header}</th>
                                )
                            })
                        }
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody style={{color: "#5d7e95"}}>
                    {
                        props.data[props.selectedTab].map((obj, index) => {
                            return (
                                <tr style={index % 2 == 0 ? {height: "60px",background: "#ffffff"} : {height: "60px", background: "#efefef"}} key={index}>
                                    {
                                        props.headers.map((header, i) => {
                                            if(header.type === 'find')
                                            {
                                                if(header.value === 'sexo')
                                                {
                                                    return (obj[header.value] === "F") ? 
                                                        <div style={{display: "flex", alignContent: "center"}}>
                                                            <FaFemale size={"20px"} color="#f7b4a7" style={{marginTop: "20px"}}/> 
                                                        </div>
                                                        : 
                                                        <div style={{display: "flex"}}>
                                                            <FaMale size={"20px"} style={{marginTop: "20px"}} />
                                                        </div>
                                                }
                                                if(header.value === 'vivienda_actual_id')
                                                {
                                                    return ((obj[header.value] && props.data[header.list].length > 0 && props.data[header.list]?.find(v => v.id === obj[header.value])) ? 
                                                        <td key={i} style={{display: "flex", alignItems: "center"}}>
                                                            <div>
                                                                { props.data[header.list]?.find(v => v.id === obj[header.value])?.nombre }
                                                            </div>
                                                            <div>
                                                                { props.data[header.list]?.find(v => v.id === obj[header.value])?.capacidad <= 2 ? <BsFillHouseFill size={"20px"} style={{marginLeft: "10px"}}/> : ( props.data[header.list]?.find(v => v.id === obj[header.value])?.capacidad < 10 ? <GiFamilyHouse size={"20px"} style={{marginLeft: "10px"}}/> : <FaBuilding  size={"20px"} style={{marginLeft: "10px"}}/>) }
                                                            </div>
                                                        </td>
                                                        : 
                                                        <td style={{color: "#f0abc1", fontWeight: "bold"}}>
                                                            Sin Vivienda
                                                        </td>)
                                                }
                                                return(
                                                    <td key={i}>
                                                        {
                                                            props.data[header.list]?.find(v => v.id === obj[header.value])?.nombre
                                                        }
                                                    </td>
                                                )
                                            }
                                            return (
                                                <td key={i}>{obj[header.value]}</td>
                                            )
                                        })
                                    }
                                    <td style={{width: "30px"}}>
                                        <Button onClick={() => handleOpenModal(obj)} variant="contained" style={{background: "#94ddde", color: "#000"}}>
                                            <FaRegEdit />
                                        </Button>
                                    </td>
                                    <td style={{width: "30px"}}>
                                        <Button onClick={() => handleDelete(obj)} variant="contained" style={{background: "#f0abc1", color: "#000"}}>
                                            <RiDeleteBin5Line />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> : 
            <div style={{display: 'flex', flexDirection:'column', justifyContent: "center", alignItems: "center", height: "100%"}}>
                <p>No hay datos en la tabla {props.selectedTab} aún</p>
                <Button variant="contained" style={{background: "#edb0a5", color: "#000", fontWeight: 'bold', marginTop: '20px'}} onClick={handleOpenModal}>Crear</Button>
            </div> }
        </div>
    )
}

export default TableHelper