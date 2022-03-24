import { Container, Text, Label } from '../../styles/Common'
import { Link } from "react-router-dom";
import {useMemo, useState, useEffect} from "react";
import  { Buffer } from 'buffer';

export function Base64Tool() {
    const [inputValue, setInputValue] = useState('');
    const [fileValue, setFileValue] = useState<File | null>(null);
    const [hexValue, setHexValue] = useState('');
    const [fileContents, setFileContents] = useState<Buffer | null>(null);
    const [typeValue, setTypeValue] = useState('');
    const [encodeDecodeValue, setEncodeDecodeValue] = useState('encode');
    const [base64Value, setBase64Value] = useState('');

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

    const hexContents = useMemo<Buffer>(() => {
        const hexValueSanitized = hexValue.replace(/[^0-9a-fA-F]/g, '');

        if (hexValueSanitized.length % 2 !== 0) {
            return Buffer.from([]);
        }

        const bytes = [];

        for (let index = 0; index < hexValueSanitized.length; index += 2) {
            bytes.push(parseInt(hexValueSanitized.substring(index, index + 2), 16));
        }

        return Buffer.from(bytes);
    }, [hexValue]);

    const encodeDecodeChanger = (
        <Label>
            Encode/Decode?:
            <select onChange={e => setEncodeDecodeValue(e.target.value)}>
                <option value="encode">Encode</option>
                <option value="decode">Decode</option>
            </select>
        </Label>
    );

    if (encodeDecodeValue === "decode") {
        const doDecode = () => {
            try {
                return Buffer.from(base64Value, 'base64').toString('utf8');
            }
            catch {
                return "";
            }
        };

        const decodedValue = doDecode();

        return (
            <>
                <Container>
                    <Text>
                        {encodeDecodeChanger}
                        <Label>
                            Input:
                            <textarea placeholder="Enter encoded base64 here" onChange={e => setBase64Value(e.target.value)} />
                        </Label>
                        <Label>
                            Decoded Value:
                            <textarea readOnly value={decodedValue} />
                        </Label>
                        <Link to="/">Go home</Link>
                    </Text>
                </Container>
            </>
        );
    }

    let input;

    if (typeValue === "file") {
        input = (
            <input type="file" onChange={(e) => setFileValue(e?.target?.files === null ? null : e.target.files[0])} />
        );
    } else if (typeValue === "hex") {
        input = (
            <textarea placeholder="Enter HEX here to encode" onChange={e => setHexValue(e.target.value)} />
        );
    } else {
        input = (
            <textarea placeholder="Encode me" onChange={e => setInputValue(e.target.value)} />
        );
    }

    const doEncode = () => {
        if (typeValue === "file" && fileContents !== null) {
            return fileContents.toString('base64');
        }

        if (typeValue === "hex" && hexContents !== null) {
            return hexContents.toString('base64');
        }

        // Default to text input
        return Buffer.from(inputValue).toString('base64');
    };

    const encodedValue = doEncode();

    return (
        <>
            <Container>
                <Text>
                    {encodeDecodeChanger}
                    <Label>
                        Mode:
                        <select onChange={e => setTypeValue(e.target.value)}>
                            <option value="text">From Text</option>
                            <option value="file">From File</option>
                            <option value="hex">From Hex</option>
                        </select>
                    </Label>
                    <Label>
                        Input:
                        {input}
                    </Label>
                    <Label>
                        Encoded Value:
                        <textarea readOnly value={encodedValue} />
                    </Label>
                    <Link to="/">Go home</Link>
                </Text>
            </Container>
        </>
    )
}
