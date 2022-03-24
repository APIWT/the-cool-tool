import { Container, Text, Header, Label } from '../../styles/Common'
import { Link } from 'react-router-dom'
import {useMemo, useState} from 'react'
import jsonic from "jsonic";

export function JsonBeautifierTool() {
    const [inputValue, setInputValue] = useState('')
    const [useTabs, setUseTabs] = useState(false);
    const [spaceCount, setSpaceCount] = useState(4);

    const outputValue = useMemo(() => {
        let parsed;

        try {
            parsed = JSON.parse(inputValue);
        }
        catch {
            try {
                parsed = jsonic(inputValue);
            }
            catch {
                return "Invalid JSON value";
            }
        }

        return JSON.stringify(parsed, null, useTabs ? "\t" : spaceCount);
    }, [inputValue, useTabs, spaceCount]);

    let spacesInput = null;

    if (!useTabs) {
        spacesInput = (
            <Label>
                Indent Space Count:
                <input type="number" defaultValue={spaceCount} onChange={e => setSpaceCount(parseInt(e.target.value, 10))} />
            </Label>
        );
    }

    return (
        <>
            <Container>
                <Header>
                    <Text>JSON beautifier tool</Text>
                </Header>
                <Label>
                    <Text>Enter JSON</Text>
                    <textarea
                        onChange={e => setInputValue(e.target.value)}
                        rows={10}
                        cols={100}
                    />
                </Label>

                <Label>
                    Use Tabs:
                    <input type="checkbox" checked={useTabs} onClick={e => setUseTabs(!useTabs)} />
                </Label>

                {spacesInput}

                <Label>
                    <Text>Output JSON</Text>
                    <textarea
                        readOnly
                        value={outputValue}
                        rows={10}
                        cols={100}
                    />
                </Label>

                <Link to="/">Go home</Link>
            </Container>
        </>
    )
}
