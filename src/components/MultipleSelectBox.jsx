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
    const [lists, setLists] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [variantName, setVariantName] = React.useState([]);
    

    React.useEffect(() => {
        fetchListData(props.variants).then(() => {
            setLoading(false);
        });
    },[])

    function fetchListData(header) {
        return fetch(`https://localhost:7117/api/${capitalizeFirstLetter(header)}/Get${capitalizeFirstLetter(header)}s`, {
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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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

    if (loading) {
        return <div>Loading...</div>;
    }

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
                renderValue={(selected) => selected.map((x) => x.nombre).join(', ')}
                name={props.item.value}
                MenuProps={MenuProps}
            >
            {lists.undefined.map((variant) => (
                <MenuItem key={variant.id} value={variant}>
                <Checkbox
                    checked={
                    variantName.findIndex((item) => item.id === variant.id) >= 0
                    }
                />
                <ListItemText primary={variant.nombre} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}
