/* eslint-disable react/prop-types */
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@mui/material";
import AccordionHelper from "./AccordionHelper";
import React from "react";

function TableHelper(props) {

    const [lists, setLists] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const headersToFetch = props.data.filter(header => header.type === 'find');

        if (headersToFetch.length > 0) {
            const fetchPromises = headersToFetch.map(header => fetchListData(header));
            Promise.all(fetchPromises).then(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [props.headers, props.item, props.selectedTab])

    function fetchListData(header) {
        console.log("header", header)
        return fetch(`https://tomasparra.azurewebsites.net/api/${capitalizeFirstLetter(header.list)}/Get${capitalizeFirstLetter(header.list)}s`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            setLists(prev => ({
                ...prev,
                [header.value]: data
            }));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleOpenModal = (data) => {
        console.log("data", data)
        props.setItem(data);
        props.setOpen(true);
    }

    const handleDelete = (data) => {
        console.log("data", data)
        fetch(`https://tomasparra.azurewebsites.net/api/${capitalizeFirstLetter(props.selectedTab)}/Delete${capitalizeFirstLetter(props.selectedTab)}?id=${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            props.setLoadData(!props.loadData);
            props.toastifyMessage("Borrado correctamente", "success");
        })
        .catch(error => {
            console.error('Error:', error);
            props.setLoadData(!props.loadData);
            console.log("tab", props.selectedTab)
            if(props.selectedTab === "persona")
                props.toastifyMessage("Error al borrar, elimine las dependencias primero", "error");
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        {
                            props.data.map((header, index) => {
                                return (
                                    <th style={{textAlign: "left"}} key={index}>{header.header}</th>
                                )
                            })
                        }
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.variants.map((obj, index) => {
                            return (
                                <tr style={index % 2 == 0 ? {background: "#ffffff"} : {background: "#f7f8fc"}} key={index}>
                                    {
                                        props.data.map((header, i) => {
                                            if(header.type === 'find')
                                            {
                                                return(
                                                    <td key={i}>
                                                        {
                                                            lists[header.value]?.find(v => v.id === obj[header.value])?.nombre
                                                        }
                                                    </td>
                                                )
                                            }
                                            if(header.type === 'select')
                                            {
                                                return(
                                                    <td key={i}>
                                                        <AccordionHelper list={obj[header.value]?.map(item => {
                                                            {console.log("list", lists, header.value)}
                                                            return {
                                                                text: lists[header.value]?.find(v => v.id === item)?.name
                                                            }
                                                        })} />
                                                    </td>
                                                )
                                            }
                                            return (
                                                <td key={i}>{obj[header.value]}</td>
                                            )
                                        })
                                    }
                                    <td style={{width: "30px"}}>
                                        <Button onClick={() => handleOpenModal(obj)} variant="contained" style={{background: "#216bfe", color: "#fff"}}>
                                            <FaRegEdit />
                                        </Button>
                                    </td>
                                    <td style={{width: "30px"}}>
                                        <Button onClick={() => handleDelete(obj)} variant="contained" style={{background: "#ff5771", color: "#fff"}}>
                                            <RiDeleteBin5Line />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableHelper