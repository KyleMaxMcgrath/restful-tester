// Import necessary components and libraries
import ResponseTabs from "./ResponseTab";
import bytes from "bytes";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import config from "./config.json";

// Define the Response component
const Response = ({ response }: { response: any }) => {
    // If the response is new, display a Chip with the label "Response"
    if (response.new) return (
        <Stack direction="row" spacing={1} >
            <Chip label={<h3>Response</h3>} />
        </Stack>
    )

    // Define a function to calculate the size of the response data and headers
    const size = () => bytes(
        (response.data ? JSON.stringify(response.data).length : 0) +
        (response.headers ? JSON.stringify(response.headers).length : 0)
    )

    // Define a function to get the response time
    const time = () => 'customData' in response && response.customData.time

    // Define a function to get the response status
    const status = (): any => {
        return response?.status || 0
    }

    // Render the Response component
    return (
        <>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" >
                <Chip label={<h3>Response</h3>} />
                <div style={{ display: "flex", position: 'absolute', right: 20, gap: 10 }}>
                    <Chip label={'Status : ' + status()} variant="outlined" sx={{ bgcolor: config.color.httpStatus[status() as keyof typeof config.color.httpStatus] }} />
                    <Chip label={'Time : ' + time() + " ms"} variant="outlined" sx={{ bgcolor: config.color.httpStatus[status() as keyof typeof config.color.httpStatus] }} />
                    <Chip label={'Size : ' + size()} variant="outlined" sx={{ bgcolor: config.color.httpStatus[status() as keyof typeof config.color.httpStatus] }} />
                </div>
            </Stack >
            <ResponseTabs responseBody={response?.data} responseHeader={response?.headers} />
        </>
    );
}

// Export the Response component as the default export
export default Response;