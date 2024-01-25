// Import necessary components and libraries
import { ReactNode } from "react";
import Box from '@mui/material/Box';
import config from "./config.json";

// Define the props for the Background component
// It takes in children components as props
interface Props {
    children: ReactNode;
}

// Define the Background component
// This component renders a Box with a linear gradient background and another Box with a solid color background
// The children components are rendered inside the inner Box
const Background = ({ children }: Props) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            pt={5}
            sx={{
                background: config.color.background,
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                p={1}
                pt={3}
                sx={{
                    background: config.color.innerBoxBackground,
                    width: '70%', // This line sets the width of the inner Box to 70% of its parent Box
                    position: "relative",
                    borderRadius: '15px',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

// Export the Background component as the default export
export default Background;