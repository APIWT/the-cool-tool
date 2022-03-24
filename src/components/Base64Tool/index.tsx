import { Container, Text } from '../../styles/Common'
import { Link } from "react-router-dom";
import {useMemo, useState} from "react";
import  { Buffer } from 'buffer';

export function Base64Tool() {
    const [inputValue, setInputValue] = useState('');

    const base64Value = useMemo(() => {
        return Buffer.from(inputValue).toString('base64');
    }, [inputValue]);

    return (
        <>
            <Container>
                <Text>
                    <input type="text" placeholder="Encode me" onChange={e => setInputValue(e.target.value)} />
                    <input type="text" readOnly value={base64Value} />
                    <Link to="/">Go home</Link>
                </Text>
            </Container>
        </>
    )
}
