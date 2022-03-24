import { Text, Label } from '../../styles/Common'
import { Link } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { Buffer } from 'buffer'

export function Base64Tool() {
    const [inputValue, setInputValue] = useState('')
    const [fileValue, setFileValue] = useState<File | null>(null)
    const [hexValue, setHexValue] = useState('')
    const [fileContents, setFileContents] = useState<Buffer | null>(null)
    const [typeValue, setTypeValue] = useState('')

    useEffect(() => {
        if (fileValue === null) {
            return
        }

        const reader = new FileReader()
        reader.readAsArrayBuffer(fileValue)
        reader.onloadend = evt => {
            if (
                evt?.target === null ||
                !evt.target.result ||
                evt.target.readyState !== FileReader.DONE
            ) {
                return
            }

            setFileContents(Buffer.from(evt.target.result as ArrayBuffer))
        }
    }, [fileValue])

    const hexContents = useMemo<Buffer>(() => {
        const hexValueSanitized = hexValue.replace(/[^0-9a-fA-F]/g, '')

        if (hexValueSanitized.length % 2 !== 0) {
            return Buffer.from([])
        }

        const bytes = []

        for (let index = 0; index < hexValueSanitized.length; index += 2) {
            bytes.push(parseInt(hexValueSanitized.substring(index, index + 2), 16))
        }

        return Buffer.from(bytes)
    }, [hexValue])

    const base64Value = useMemo(() => {
        if (typeValue === 'file' && fileContents !== null) {
            return fileContents.toString('base64')
        }

        if (typeValue === 'hex' && hexContents !== null) {
            return hexContents.toString('base64')
        }

        // Default to text input
        return Buffer.from(inputValue).toString('base64')
    }, [typeValue, fileContents, inputValue, hexContents])

    let input = null

    if (typeValue === 'file') {
        input = (
            <input
                type="file"
                onChange={e => setFileValue(e?.target?.files === null ? null : e.target.files[0])}
            />
        )
    } else if (typeValue === 'hex') {
        input = (
            <textarea
                placeholder="Enter HEX here to encode"
                onChange={e => setHexValue(e.target.value)}
            />
        )
    } else {
        input = <textarea placeholder="Encode me" onChange={e => setInputValue(e.target.value)} />
    }

    return (
        <>
            <Text>
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
                    <textarea readOnly value={base64Value} />
                </Label>
            </Text>
        </>
    )
}
