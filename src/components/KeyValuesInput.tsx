// Import necessary components and libraries
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import config from "./config.json"

// Define a constant for the border radius
const borderRadius: string = '15px';

// Define the KeyValuesInput component
// This component takes in the current row, a function to update the row, and a function to remove the row as props
// It renders a TextField for the key, a TextField for the value, and a Button to remove the row
const KeyValuesInput = ({ row, updateRow, removeRow }: { row: any, updateRow: any, removeRow: any }) => {
    return (
        <Box gap={0}
            sx={{
                display: 'flex',
                borderRadius: '50%',
            }}
        >
            <TextField
                type="text"
                placeholder="Key"
                name="key"
                value={row.key}
                onChange={({ target }) => updateRow(row, target)}
                sx={{ position: 'relative', left: -10, borderRadius: borderRadius, background: config.color.textField }}
                InputProps={{
                    style: {
                        borderRadius: borderRadius
                    }
                }}
            />

            <TextField
                type="text"
                placeholder="Value"
                name="value"
                value={row.value}
                onChange={({ target }) => updateRow(row, target)}
                sx={{ display: 'relative', flexGrow: 1, borderRadius: borderRadius, background: config.color.textField }}
                InputProps={{
                    style: {
                        borderRadius: borderRadius
                    }
                }}
            />
            <Button
                type="button"
                variant="contained"
                onClick={() => removeRow(row)}
                sx={{ position: 'relative', right: -10, boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', borderRadius: borderRadius, background: config.color.deleteButton }}
            >
                <DeleteIcon />
            </Button>
        </Box>
    );
}

// Export the KeyValuesInput component as the default export
export default KeyValuesInput;