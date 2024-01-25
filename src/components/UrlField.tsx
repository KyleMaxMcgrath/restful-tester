// Import necessary components and libraries
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import RefreshSharpIcon from '@mui/icons-material/RefreshSharp';
import config from "./config.json";

// Define an array of HTTP methods
const methods = ["GET", "POST", "DELETE", "PUT", "PATCH"];

// Define a constant for the border radius
const borderRadius: string = '15px';

// Define the UrlInput component
// This component takes in the current URL, the current HTTP method, a function to send the request, and a boolean indicating whether the request is being sent as props
// It maintains a state for the URL and the HTTP method and provides a form to input the URL and select the HTTP method
const UrlInput = ({ sending, urlState, methodState, onSendRequest }: { sending: boolean, urlState: any, methodState: any, onSendRequest: any }) => {
    // Define state variables for the URL and the HTTP method
    const [URL, setURL] = urlState;
    const [method, setMethod] = methodState;

    // Render the UrlInput component
    return (
        <form onSubmit={onSendRequest} style={{ flexGrow: 1 }}>
            <Box gap={2}
                sx={{
                    display: 'flex',
                }}
            >
                <Select
                    labelId="demo-simple-select-label"
                    label="Method"
                    id="demo-simple-select"
                    value={method}
                    onChange={({ target: { value } }) => setMethod(value)}
                    sx={{
                        position: 'relative', left: 10, boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', background: config.color.method, borderRadius: borderRadius
                    }}
                >
                    {methods.map((methodType) => (<MenuItem key={methodType} value={methodType} >{methodType}</MenuItem>))}
                </Select>

                <TextField id="outlined-basic"
                    label="URL"
                    variant="outlined"
                    type="url"
                    value={URL}
                    required
                    onChange={({ target: { value } }) => setURL(value)}
                    name="url"
                    className="urlbox"
                    placeholder="https://example.com"
                    fullWidth
                    sx={{ display: 'relative', flexGrow: 1, boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', background: config.color.textField, borderRadius: borderRadius }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ position: 'relative', right: 10, boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', background: config.color.sendButton, borderRadius: borderRadius }}>
                    Send {sending ? <RefreshSharpIcon /> : <SendIcon />}
                </Button>

            </Box>
        </form >
    );
}

// Export the UrlInput component as the default export
export default UrlInput;