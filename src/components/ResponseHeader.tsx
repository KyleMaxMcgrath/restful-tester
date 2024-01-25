// Import necessary components and libraries
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Define a function to create a data object with a key and a value
// This function is used to create rows for the table
function createData(
    key: string,
    value: string
) {
    return { key, value };
}

// Define the ResponseHeader component
// This component takes in the response headers as a prop and displays them in a table
const ResponseHeader = ({ panelValue }: { panelValue: object }) => {
    // Create an array of rows for the table
    const rows: { key: string; value: string; }[] = []
    // For each entry in the response headers, create a row and add it to the array
    Object.entries(panelValue || {}).map(
        ([key, value]) => rows.push(createData(key, value))
    );
    // Render the ResponseHeader component
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: '#424549' }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.key}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Export the ResponseHeader component as the default export
export default ResponseHeader;