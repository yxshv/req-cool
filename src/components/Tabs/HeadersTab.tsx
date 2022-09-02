import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { dracula } from '@uiw/codemirror-theme-dracula';
import Error from '../Error';
import { useState } from 'react';

const HeadersTab = ({ val, setVal }: {
    val: string;
    setVal: (val: string) => void;
}) => {

    const [error, setError] = useState<string | null>(null);

    return (
        <div className="mt-2 w-full p-5 rounded-md">
            <Error error={error} />
            <CodeMirror
                value={val}
                height="200px"
                theme={dracula}
                onChange={(v) => {
                    try {
                        JSON.parse(v);
                        setVal(v)
                        setError(null);
                    } catch {
                        setError("Invalid JSON");
                    }
                }}
                extensions={[json()]}
            />
        </div>
    )
}

export default HeadersTab;