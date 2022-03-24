import { Container, Text } from '../../styles/Common'
import { Link } from "react-router-dom";
import {useMemo, useState, useEffect} from "react";
import  { Buffer } from 'buffer';

export function Base64Tool() {
    const [inputValue, setInputValue] = useState('');
    const [fileValue, setFileValue] = useState<File | null>(null);
    const [fileContents, setFileContents] = useState<Buffer | null>(null);
    const [typeValue, setTypeValue] = useState('');

    useEffect(() => {
        if (fileValue === null) {
            return;
        }
        
        const reader = new FileReader();
        reader.readAsArrayBuffer(fileValue);
        reader.onloadend = (evt) => {
            if (evt?.target === null || !evt.target.result || evt.target.readyState !== FileReader.DONE) {
                return;
            }
            
            setFileContents(Buffer.from(evt.target.result as ArrayBuffer));
        };
    }, [fileValue]);

    const base64Value = useMemo(() => {
        if (typeValue === "file" && fileContents !== null) {
            return fileContents.toString('base64');
        }

        // Default to text input
        return Buffer.from(inputValue).toString('base64');
    }, [typeValue, fileContents, inputValue]);

    let input = null;

    if (typeValue === "text") {
        input = (
            <input type="text" placeholder="Encode me" onChange={e => setInputValue(e.target.value)} />
        );
    }

    let filePicker = null;

    if (typeValue === "file") {
        filePicker = (
            <input type="file" onChange={(e) => setFileValue(e?.target?.files === null ? null : e.target.files[0])} />
        );
    }

    return (
        <>
            <Container>
                <Text>
                    <select onChange={e => setTypeValue(e.target.value)}>
                        <option value="text">From Text</option>
                        <option value="file">From File</option>
                        <option value="hex">From Hex</option>
                    </select>
                    {input}
                    {filePicker}
                    <input type="text" readOnly value={base64Value} />
                    <Link to="/">Go home</Link>
                </Text>
            </Container>
        </>
    )
}
