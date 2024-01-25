// Import necessary components and libraries
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RequestTabs from "./RequestTab";
import UrlInput from "./UrlField";
import axios from "axios";
import config from "./config.json";

// Define initial state for key-value pairs
const initialKeyValueState = () => [
    {
        id: uuidv4(),
        key: "",
        value: "",
    },
];

// Define a function to detect the type of data
// If the data is an object, it is stringified and formatted
// Otherwise, the data is returned as is
const detectType = (data: any) => {
    if (typeof data == "object") {
        return JSON.stringify(data, null, 2)
    }
    return data
}

// Define a function to convert an array of key-value pairs to an object
const toObject = (obj: any[]) => {
    return obj.reduce((result: { [x: string]: any; }, { key, value }: any) => {
        if (key !== "") result[key] = value
        return result;
    }, {});
};

// Define the Request component
// This component handles the sending of HTTP requests
const Request = ({ setResponse, sendingState }: { setResponse: any, sendingState: any }) => {
    // Define state variables for the request
    const [sending, setSending] = sendingState;
    const [URL, setURL] = useState(config.initialURL);
    const [method, setMethod] = useState(config.initialMethod);
    const [queryParams, setQueryParams] = useState(initialKeyValueState);
    const [headers, setHeaders] = useState(initialKeyValueState);
    const [initialBody] = useState(config.initialBody);
    const [body, setBody] = useState(initialBody);

    // Define a function to handle the sending of the request
    const onSendRequest = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setSending(true);

        let data
        try {
            data = JSON.parse(body.toString())
        } catch (err) {
            setSending(false);
            return alert("There is something wrong with your JSON body. Please check again.")
        }

        let time = new Date().getTime()
        try {
            const request = {
                url: URL.trim(),
                method,
                headers: toObject(headers),
                params: toObject(queryParams),
                data,
                id: uuidv4()
            };

            const response = await axios(request);
            const modifiedResponse = {
                ...response, customData: { time: new Date().getTime() - time }
            }

            setResponse({
                ...modifiedResponse,
                data: detectType(response?.data)
            });

        } catch (error) {
            setResponse({
                status: 404, customData: { time: new Date().getTime() - time }, data: ""
            });
            console.log(error)
        } finally {
            setSending(false);
        }
    };

    // Render the Request component
    return (
        <>
            <UrlInput
                urlState={[URL, setURL]}
                methodState={[method, setMethod]}
                sending={sending}
                onSendRequest={onSendRequest}
            />
            <RequestTabs
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                headers={headers}
                setHeaders={setHeaders}
                body={initialBody}
                setBody={setBody}
            />
        </>
    );
}

// Export the Request component as the default export
export default Request;