import { Button } from "@mui/material"
import ModalHelper from "./components/ModalHelper";
import React from "react";
import FormHelper from "./components/FormHelper";
import TableHelper from "./components/TableHelper";
import { tablaDepartamentos, tablaMunicipios, tablaPersonas, tablaViviendas } from "./utils/formData";
import { departamentos, municipios, personas, viviendas } from "./utils/data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [open, setOpen] = React.useState(false);
    const [loadData, setLoadData] = React.useState(false);
    const [item, setItem] = React.useState({});
    const [tableData, setTableData] = React.useState(tablaPersonas);
    const [data, setData] = React.useState(personas);
    const [selectedTab, setSelectedTab] = React.useState("persona");
    const [message, setMessage] = React.useState("");
    const notify = (message) => toast(message);
    
    React.useEffect(() => {
        switch(selectedTab) {
            case "persona":
                setData(personas);
                setTableData(tablaPersonas);
                break;
            case "vivienda":
                setData(viviendas);
                setTableData(tablaViviendas);
                break;
            case "municipio":
                setData(municipios);
                setTableData(tablaMunicipios);
                break;
            case "departamento":
                setData(departamentos);
                setTableData(tablaDepartamentos);
                break;
            default:
                setData(personas);
                setTableData(tablaPersonas);
                break;
        }

        fetch(`https://tomasparra.azurewebsites.net/api/${capitalizeFirstLetter(selectedTab)}/Get${capitalizeFirstLetter(selectedTab)}s`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [selectedTab, loadData]);

    const toastifyMessage = (message, type) => {
        setMessage(type);
        setTimeout(() => {
            notify(message);
        }, 200);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{padding: "150px 10%", position: "relative", height: "100vh"}}>
            <Button variant="contained" onClick={handleOpen} style={{position: "absolute", top: "60px", right: "10%"}}>Registrar {selectedTab}</Button>
            <ModalHelper open={open} handleClose={handleClose}>
                <FormHelper loadData={loadData} setLoadData={setLoadData} setOpen={setOpen} selectedTab={selectedTab} data={tableData} variants={data} item={item} setItem={setItem} />
            </ModalHelper>
            <div style={{display: "flex"}}>
                <div className={selectedTab === "persona" ? "tab selected" : "tab"} onClick={() => setSelectedTab("persona")}>Personas</div>
                <div className={selectedTab === "vivienda" ? "tab selected" : "tab"} onClick={() => setSelectedTab("vivienda")}>Viviendas</div>
                <div className={selectedTab === "municipio" ? "tab selected" : "tab"} onClick={() => setSelectedTab("municipio")}>Municipios</div>
                <div className={selectedTab === "departamento" ? "tab selected" : "tab"} onClick={() => setSelectedTab("departamento")}>Departamentos</div>
            </div>
            <TableHelper toastifyMessage={toastifyMessage} loadData={loadData} setLoadData={setLoadData} selectedTab={selectedTab} setItem={setItem} data={tableData} variants={data} setOpen={setOpen}/>
            <div>
                <ToastContainer toastStyle={{ backgroundColor: (message == "error" ? "crimson" : "green"), color: "#fff" }}/>
            </div>
        </div>    
    )
}

export default App
