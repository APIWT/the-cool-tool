import { Text, Header, Button } from '../../styles/Common'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Buffer } from 'buffer'
import YAML from 'yaml'

export function JsonYamlTool() {
    const [inputValue, setInputValue] = useState('')
    const [outputValue, setOutputValue] = useState('')

    const convertJsonToYaml = () => {
        const json = JSON.parse(inputValue)
        const yamlDoc = new YAML.Document(json)
        yamlDoc.contents = json
        setOutputValue(yamlDoc.toString())
    }

    return (
        <>
            <Header>
                <Text>JSON/YAML tool</Text>
            </Header>
            <label>
                <Text>Enter JSON</Text>
                <textarea
                    onChange={e => setInputValue(e.target.value)}
                    id="json-input"
                    rows={10}
                    cols={100}
                />
            </label>
            <label>
                <Button onClick={() => convertJsonToYaml()}>Submit</Button>
            </label>

            <label>
                <Text>Output</Text>
                <textarea id="yaml-output" rows={10} cols={100} value={outputValue} readOnly />
            </label>
        </>
    )
}
