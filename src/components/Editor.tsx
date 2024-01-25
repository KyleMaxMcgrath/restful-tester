// Import necessary components and libraries
import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, insertTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import Box from '@mui/material/Box';
import config from "./config.json"

// Define a keymap for the Tab key
const indentWithTab = {
    key: "Tab",
    run: insertTab,
};

// Define a theme for the editor
const theme = {
    "&": {
        backgroundColor: config.color.codeEditor
    }
}

// Define the extensions for the editor
const extensions = [
    basicSetup,
    keymap.of([...defaultKeymap, indentWithTab]),
    json(),
    EditorState.tabSize.of(3),
    EditorView.theme(theme),
];

// Define the JsonEditor component
// This component takes in the current value of the panel, a function to update it, and a boolean indicating whether the editor is editable as props
// It maintains a reference to the editor and updates the editor when the value of the panel changes
const Editor = ({ panelValue, setPanelValue = null, editable = true }: { panelValue: any, setPanelValue?: any, editable?: boolean }) => {
    const jsonEditor = useRef();

    useEffect(() => {
        if (jsonEditor.current === "null") return;

        const state = EditorState.create({
            doc: panelValue,
            extensions: [
                ...extensions,
                EditorView.updateListener.of((view) => {
                    if (view.docChanged) {
                        setPanelValue(view.state.doc);
                    }
                }),
                EditorView.editable.of(editable)
            ],
        });

        const view = new EditorView({
            state,
            parent: jsonEditor.current,
        });

        return () => {
            view.destroy();
        };
    }, [jsonEditor, panelValue]);

    return <Box ref={jsonEditor} ></Box>;
}

// Export the JsonEditor component as the default export
export default Editor;