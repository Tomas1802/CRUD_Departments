/* eslint-disable react/prop-types */
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function AccordionHelper(props) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<IoIosArrowDropdownCircle />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    {props.list[0].text}
                </AccordionSummary>
                <AccordionDetails>
                    {props.list.map((item, index) => {
                        return (
                            <div key={index}>
                                - {item.text}
                            </div>
                        )
                    
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}