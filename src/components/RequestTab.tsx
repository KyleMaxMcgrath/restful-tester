// Import necessary components and libraries
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import KeyValues from './KeyValues';
import Editor from './Editor';

// Define a type for the props of the CustomTabPanel component
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// Define a function to render a custom tab panel
// This function takes in the current tab value, the index of the tab, and other props
// It renders a div that contains the children if the current tab value matches the index
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

// Define the RequestTabs component
// This component takes in the query parameters, headers, and body of the request as props
// It defines three tabs: one for the query parameters, one for the headers, and one for the body
// Each tab has a corresponding set function to update its value
const RequestTabs = ({ queryParams, setQueryParams, headers, setHeaders, body, setBody }: { queryParams: any, setQueryParams: any, headers: any, setHeaders: any, body: any, setBody: any }) => {

    const tabs = [
        {
            id: 0,
            name: "Query Params",
            value: queryParams,
            setValue: setQueryParams,
            tabPanel: KeyValues,
        },
        {
            id: 1,
            name: "Headers",
            value: headers,
            setValue: setHeaders,
            tabPanel: KeyValues,
        },
        {
            id: 2,
            name: "Body",
            value: body,
            setValue: setBody,
            tabPanel: Editor,
        },
    ];

    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Render the RequestTabs component
    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value}
                    onChange={handleChange}
                    aria-label="basic tabs"
                    textColor="primary"
                    indicatorColor="primary"
                    centered
                >
                    {tabs.map((tab) => (<Tab label={tab.name} key={tab.name} {...a11yProps(tab.id)} />))}
                </Tabs>
            </Box>
            {
                tabs.map((tab) => (
                    <CustomTabPanel key={tab.name} value={value} index={tab.id}>
                        <tab.tabPanel panelValue={tab.value} setPanelValue={tab.setValue} />
                    </CustomTabPanel>
                ))
            }
        </Box >
    );
}

// Export the RequestTabs component as the default export
export default RequestTabs;