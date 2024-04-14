/* eslint-disable react/prop-types */
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material"
import MultipleSelectBox from "./MultipleSelectBox";

function FormHelper(props) {
    return (
        <div>
            <p style={{fontWeight: "bold", textAlign: "center", marginBottom: "20px"}}>Ingresar {props.selectedTab}</p>
            <hr />
            <form>
                {
                    props.data.map((header, i) => {
                        console.log(header);
                        if(header.type === 'find')
                        {
                            return(
                                <FormControl key={i} style={{width: "100%", marginBottom: "20px"}}>
                                    <InputLabel id={"select-label_" + i}>{header.header}</InputLabel>
                                    <Select
                                        labelId={"select-label_" + i}
                                        id={"select_" + i}
                                        label={header.header}
                                    >
                                        {
                                            header.list.map((item, index) => {
                                                return(
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            )
                        }
                        else if(header.type === 'select')
                        {
                            return(
                                <FormControl key={i} style={{width: "100%", marginBottom: "10px"}}>
                                    <MultipleSelectBox variants={header.list} title={header.header} />
                                </FormControl>
                            )
                        }
                        return(
                            <FormControl key={i} style={{width: "100%", marginBottom: "10px"}}>
                                <InputLabel htmlFor={header.value}>{header.header}</InputLabel>
                                <Input name={header.value} id={header.value} type="text" />
                            </FormControl>
                        )
                    })
                }
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="contained" color="success">Guardar</Button>
                </div>
            </form>

        </div>
    )
}

export default FormHelper