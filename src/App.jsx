import { Button } from "@mui/material"
import ModalHelper from "./components/ModalHelper";
import React from "react";
import FormHelper from "./components/FormHelper";
import TableHelper from "./components/TableHelper";
import { tablaDepartamentos, tablaMunicipios, tablaPersonas, tablaViviendas, tablaServicios } from "./utils/formData";
import 'react-toastify/dist/ReactToastify.css';
import ToastifyMessage from "./components/ToastifyMessage";
import { getRoute } from "./services/Requests";

function App() {
    const [notification, setNotification] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState({});
    const [headers, setHeaders] = React.useState(tablaPersonas);
    const [data, setData] = React.useState({});
    const [selectedTab, setSelectedTab] = React.useState("Persona");
    const [modalContent, setModealContent] = React.useState("form");

    React.useEffect(() => {
        handleTabChange(selectedTab);
        getData();
    }, []);

    const handleTabChange = (tab) => {
        switch(tab) {
            case "Persona":
                setHeaders(tablaPersonas);
                setSelectedTab("Persona");
                break;
            case "Vivienda":
                setHeaders(tablaViviendas);
                setSelectedTab("Vivienda");
                break;
            case "Municipio":
                setHeaders(tablaMunicipios);
                setSelectedTab("Municipio");
                break;
            case "Departamento":
                setHeaders(tablaDepartamentos);
                setSelectedTab("Departamento");
                break;
            case "Servicio":
                setHeaders(tablaServicios);
                setSelectedTab("Servicio");
                    break;
            default:
                setHeaders(tablaPersonas);
                setSelectedTab("Persona");
                break;
        }
        setTimeout(() => {
            getData();
        }, 500);
    }

    async function getData() {
        const list = ["Persona", "Vivienda", "Municipio", "Departamento", "Sexo", "Servicio"];

        const promises = list.map(async (item) => {
            const result = await getRoute(item);
            if (result.error) {
                setNotification({text: `Error al cargar los datos de la tabla ${item}`, type: "error"});
            }
            else{
                return { key: item, value: result };
            }
        });

        const results = await Promise.all(promises);
        const newData = results.reduce((acc, current) => {
            if (current) { 
                acc[current.key] = current.value;
            }
            return acc;
        }, {});

        setData(newData);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setModealContent("form")
        setOpen(false)
        setItem({});
    };

    const openTeamModal = () => {
        setModealContent("team")
        setOpen(true);
    }

    const checkWork = async (name) => {
        const result = await getRoute("Revision")

        setNotification({text: `Hola, soy ${name}, y yo ${result.find(r => r.nombre === name).revisado ? "revisé este trabajo" : "NO he revisado este trabajo"}`, type: `${result.find(r => r.nombre === name).revisado ? "success" : "error"}`})
    }

    return (
        <div style={{padding: "100px 20px", position: "relative", height: "100vh", background: "#efefef"}}>
            <a style={{position: "absolute", bottom: "3%", left: "2%", textDecoration: 'underline', cursor: 'pointer'}} onClick={openTeamModal}>
                Grupo 8 - Vitalit
            </a>
            <Button variant="contained" onClick={handleOpen} style={{position: "absolute", width: "64px", height: '64px', fontSize: '32px', background: "#f7b4a7",  bottom: "3%", right: "2%"}}>+</Button>
            <ModalHelper open={open} handleClose={handleClose}>
                {modalContent === "form" ?
                <FormHelper setNotification={setNotification} data={data} getData={getData} setOpen={setOpen} selectedTab={selectedTab} headers={headers} item={item} setItem={setItem} />
                : 
                <div>
                    <h1 style={{fontSize: '28px', fontWeight: 'bold'}}>Grupo 8 - Vitalit</h1>
                    <br />
                    <ol>
                        <li style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>Tomás Parra <Button variant="contained" onClick={() => checkWork("Tomás")} style={{background: "#f7b4a7", color: "black"}}>Hablar</Button></li>
                        <li style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>Juan Jose Ramirez <Button variant="contained" onClick={() => checkWork("Juan Jose")} style={{background: "#f7b4a7", color: "black"}}>Hablar</Button></li>
                        <li style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>Julian Vargas <Button variant="contained" onClick={() => checkWork("Julian Vargas")} style={{background: "#f7b4a7", color: "black"}}>Hablar</Button></li>
                        <li style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>Sebastian Medina <Button variant="contained" onClick={() => checkWork("Sebastian")} style={{background: "#f7b4a7", color: "black"}}>Hablar</Button></li>
                    </ol>
                </div> 
                }
                </ModalHelper>
            <div style={{display: "flex", padding:"1%", fontWeight: "bold", color: "#5d7e95", justifyContent: "space-between", position: "fixed", top: "0px", left: "0px", right: "0px"}}>
                <div style={{display: "flex", padding:"1%", fontWeight: "bold", color: "#5d7e95", alignItems: "center"}}>
                    <h1 style={{fontWeight: 'bold', fontSize: "24px"}}>Laboratorio Bases de datos</h1>
                </div>
                <div style={{display: "flex"}}>
                    <div className={selectedTab === "Persona" ? "tab selected" : "tab"} onClick={() => handleTabChange("Persona")}>Personas</div>
                    <div className={selectedTab === "Vivienda" ? "tab selected" : "tab"} onClick={() => handleTabChange("Vivienda")}>Viviendas</div>
                    <div className={selectedTab === "Municipio" ? "tab selected" : "tab"} onClick={() => handleTabChange("Municipio")}>Municipios</div>
                    <div className={selectedTab === "Departamento" ? "tab selected" : "tab"} onClick={() => handleTabChange("Departamento")}>Departamentos</div>
                    <div className={selectedTab === "Servicio" ? "tab selected" : "tab"} onClick={() => handleTabChange("Servicio")}>Servicios</div>
                </div>
            </div>
            <div style={{height: "100%", overflow: "auto"}}>
                <TableHelper setNotification={setNotification} data={data} headers={headers} getData={getData} selectedTab={selectedTab} setItem={setItem} setOpen={setOpen}/>
            </div>
            {notification.text && <ToastifyMessage notification={notification} />}
        </div>    
    )
}

export default App
