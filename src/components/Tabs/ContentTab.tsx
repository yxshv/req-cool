/* eslint-disable @typescript-eslint/no-explicit-any */

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
import { useEffect, useState } from "react";
import { Content } from "../../types";
import { dracula } from "@uiw/codemirror-theme-dracula";
import Error from '../Error';

const ContentTab = ({ val, setVal }: {
    val: Content;
    setVal: (val: Content | ((prev: Content) => Content)) => void;
}) => {

    const [v, setV] = useState("JSON (application/json)");
    const [error, setError] = useState<string | null>(null);

    let lang: Array<any> = [];

    if (v.startsWith("JSON")) lang = [json()];
    else if (v.startsWith("XML")) lang = [xml()];
    else if (v.startsWith("HTML")) lang = [html()];
    else lang = [];

    useEffect(() => {
        if (v.startsWith("JSON")) {
            try {
                JSON.parse(val.content);
                setError(null);
            } catch {
                setError("Invalid JSON");
            }
            setVal({ ...val, type: "application/json" });
        } else if (v.startsWith("XML")) {
            setVal({ ...val, type: "application/xml" });
        } else if (v.startsWith("HTML")) {
            setVal({ ...val, type: "text/html" });
        } else if (v.startsWith("FORM")) {
            setVal({ ...val, type: "application/x-www-form-urlencoded" });
        } else if (v.startsWith("TEXT")) {
            setVal({ ...val, type: "text/plain" });
        } else {
            setVal({ ...val, type: "custom" });
        }

        if (!v.startsWith("JSON")) setError(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [v])

    return (
        <div className="mt-2 w-full p-5 rounded-md">
            <select
                onChange={(e) => setV(e.target.value)}
                className="my-3 bg-dark-light w-full text-purple-400 px-2 py-2 rounded-md focus:outline-none focus:border-purple-400 border-2 border-transparent"
            >
                <option>JSON (application/json)</option>
                <option>FORM URL Encoded (application/x-www-form-urlencoded)</option>
                <option>HTML (text/html)</option>
                <option>XML (application/xml)</option>
                <option>TEXT (text/plain)</option>
                <option>CUSTOM (from Headers)</option>
            </select>
            <Error error={error} />
            <CodeMirror
                value={val.content}
                height="200px"
                theme={dracula}
                onChange={(c) => {
                    if (v.startsWith("JSON")) {
                        try {
                            JSON.parse(c);
                            setError(null);
                            setVal((prev: any) => {
                                return {
                                    ...prev,
                                    content: c
                                }
                            })
                        } catch {
                            setError("Invaild JSON");
                            return;
                        }
                    }

                    setVal((prev: any) => {
                        return {
                            ...prev,
                            content: c
                        }
                    })
                }}
                extensions={lang}
            />
        </div>
    )
}


export default ContentTab;