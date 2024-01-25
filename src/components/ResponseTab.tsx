// Import necessary components and libraries
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ResponseHeader from './ResponseHeader';
import Editor from './Editor';

// Define the properties for the TabPanel component
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// Define a custom TabPanel component
// This component displays its children only if its index matches the current value
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

// Define a function to generate accessibility props for a tab
// This function takes in the index of the tab and returns an object with the id and aria-controls props
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// Define the ResponseTabs component
// This component takes in the response body and response header as props
// It defines two tabs: one for the response body and one for the response header
const ResponseTabs = ({ responseBody, responseHeader }: { responseBody: any, responseHeader: any }) => {

    const tabs = [
        {
            id: 0,
            name: "Response Body",
            value: responseBody,
            tabPanel: Editor
        },
        {
            id: 1,
            name: "Response Header",
            value: responseHeader,
            tabPanel: ResponseHeader
        }
    ];

    // Initialize the state for the currently selected tab
    const [value, setValue] = React.useState(0);

    // Define a function to handle tab changes
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Render the ResponseTabs component
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    {/* Render the tabs. The currently selected tab is determined by the `value` state. */}
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {tabs.map((tab) => (<Tab label={tab.name} key={tab.name} {...a11yProps(tab.id)} />))}
                    </Tabs>
                </Box>
                {/* Render the tab panels. The currently displayed panel is determined by the `value` state. */}
                {tabs.map((tab) => (
                    <CustomTabPanel key={tab.name} value={value} index={tab.id}>
                        <tab.tabPanel panelValue={tab.value} editable={false} />
                    </CustomTabPanel>
                ))}
            </Box>
        </>
    );
}

// Export the ResponseTabs component as the default export
export default ResponseTabs;