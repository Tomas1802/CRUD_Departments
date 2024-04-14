/* eslint-disable react/prop-types */
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@mui/material";
import AccordionHelper from "./AccordionHelper";

function TableHelper(props) {
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
                                                            header.list.find(v => v.id === obj[header.value]).name
                                                        }
                                                    </td>
                                                )
                                            }
                                            if(header.type === 'select')
                                            {
                                                return(
                                                    <td key={i}>
                                                        <AccordionHelper list={obj[header.value].map(item => {
                                                            return {
                                                                text: header.list.find(v => v.id === item).name
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
                                        <Button variant="contained" style={{background: "#216bfe", color: "#fff"}}>
                                            <FaRegEdit />
                                        </Button>
                                    </td>
                                    <td style={{width: "30px"}}>
                                        <Button variant="contained" style={{background: "#ff5771", color: "#fff"}}>
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