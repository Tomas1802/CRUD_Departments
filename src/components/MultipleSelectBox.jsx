/* eslint-disable react/prop-types */
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};


export default function MultipleSelectBox(props) {
    const [variantName, setVariantName] = React.useState([]);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;

        let duplicateRemoved = [];

        value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) 
            {
                duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
            } 
            else 
            {
                duplicateRemoved.push(item);
            }
        });

        setVariantName(duplicateRemoved);
    };

    return (
        <div className='w-full'>
        <FormControl sx={{ width: "100%" }}>
            <InputLabel id="person-select">{props.title}</InputLabel>
            <Select
                labelId="person-select"
                id="persons-multiple-checkbox"
                multiple
                value={variantName}
                onChange={handleChange}
                input={<OutlinedInput label={props.title} />}
                renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                MenuProps={MenuProps}
            >
            {props.variants.map((variant) => (
                <MenuItem key={variant.id} value={variant}>
                <Checkbox
                    checked={
                    variantName.findIndex((item) => item.id === variant.id) >= 0
                    }
                />
                <ListItemText primary={variant.name} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}
