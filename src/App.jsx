import { Button } from "@mui/material"
import ModalHelper from "./components/ModalHelper";
import React from "react";
import FormHelper from "./components/FormHelper";
import TableHelper from "./components/TableHelper";
import { tablaDepartamentos, tablaMunicipios, tablaPersonas, tablaViviendas } from "./utils/formData";
import { departamentos, municipios, personas, viviendas } from "./utils/data";

function App() {
    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = React.useState(tablaPersonas);
    const [data, setData] = React.useState(personas);
    const [selectedTab, setSelectedTab] = React.useState("persona");
    
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
    }, [selectedTab]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{padding: "150px 10%", position: "relative", height: "100vh"}}>
            <Button variant="contained" onClick={handleOpen} style={{position: "absolute", top: "60px", right: "10%"}}>Registrar {selectedTab}</Button>
            <ModalHelper open={open} handleClose={handleClose}>
                <FormHelper selectedTab={selectedTab} data={tableData} variants={data} />
            </ModalHelper>
            <div style={{display: "flex"}}>
                <div className={selectedTab === "persona" ? "tab selected" : "tab"} onClick={() => setSelectedTab("persona")}>Personas</div>
                <div className={selectedTab === "vivienda" ? "tab selected" : "tab"} onClick={() => setSelectedTab("vivienda")}>Viviendas</div>
                <div className={selectedTab === "municipio" ? "tab selected" : "tab"} onClick={() => setSelectedTab("municipio")}>Municipios</div>
                <div className={selectedTab === "departamento" ? "tab selected" : "tab"} onClick={() => setSelectedTab("departamento")}>Departamentos</div>
            </div>
            <TableHelper data={tableData} variants={data} />
        </div>    
    )
}

export default App
