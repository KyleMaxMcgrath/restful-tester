// Import necessary components and hooks
import Background from "./components/Background";
import Request from "./components/Request";
import Response from "./components/Response";
import { useState } from "react";

// Define the main App component
function App() {
  // Initialize the response state with a default value
  const initialResponse = { data: "{\n\t\n}", new: true }
  const [data, setData] = useState(initialResponse);

  // Initialize the sending state to track whether a request is being sent
  const [sending, setSending] = useState(false);

  // Render the App component
  return (
    <>
      <Background>
        {/* The Request component is responsible for sending the HTTP request. 
            It receives the setData function as a prop to update the response state,
            and the sending state to track the request status. */}
        <Request setResponse={setData} sendingState={[sending, setSending]} />

        {/* The Response component is responsible for displaying the response data.
            It receives the response data as a prop. */}
        <Response response={data} />
      </Background>
    </>
  );
}

// Export the App component as the default export
export default App;