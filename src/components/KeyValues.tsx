// Import necessary components and libraries
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import KeyValuesInput from "./KeyValuesInput";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import config from "./config.json"

// Define the KeyValues component
// This component takes in the current key-value pairs and a function to update them as props
// It maintains a state for the key-value pairs and provides functions to add, update, and remove key-value pairs
const KeyValues = ({ panelValue, setPanelValue }: { panelValue: any, setPanelValue: any }) => {
    // Define state variable for the key-value pairs
    const [keyState, setKeyState] = useState(panelValue);

    // Define a function to add a new key-value pair
    const addNewRow = () => {
        setKeyState((state: any) => [
            ...state,
            {
                id: uuidv4(),
                key: "",
                value: "",
            },
        ]);
    };

    // Define a function to update a key-value pair
    const updateRow = (row: { id: any; }, { name, value }: { name: string, value: string }) => {
        setKeyState((state: any) =>
            [...state].map((e) => {
                if (e.id == row.id) {
                    return { ...e, [name]: value }
                }
                return e;
            })
        );
    };

    // Define a function to remove a key-value pair
    const removeRow = (row: { id: any; }) => {
        setKeyState((state: any) =>
            [...state].filter((e) => e.id !== row.id)
        );
    };

    // Update the panel value whenever the key-value pairs change
    useEffect(() => {
        setPanelValue(keyState)
    }, [keyState])

    // Render the KeyValues component
    return (
        <>
            <Box sx={{ border: '0px solid #000' }}>
                {
                    keyState.map((row: { id: React.Key | null | undefined; }) => (
                        <KeyValuesInput
                            row={row}
                            key={row.id}
                            updateRow={updateRow}
                            removeRow={removeRow}
                        />
                    ))
                }
            </Box>
            <Button
                type="button"
                variant="contained"
                onClick={addNewRow}
                sx={{ position: 'relative', top: 10, left: -10, background: config.color.addButton }}
            >
                <AddIcon />
            </Button>
        </>
    );
}

// Export the KeyValues component as the default export
export default KeyValues;