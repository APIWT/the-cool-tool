import { Text, Label } from '../../styles/Common'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

export function UuidTool() {
    const [uuid, setUuid] = useState(uuidv4())
    const [excludeDashes, setExcludeDashes] = useState(false)
    const [capsLock, setCapsLock] = useState(false)

    const generateUuid = () => {
        setUuid(uuidv4())
    }

    let renderedUuid = uuid

    if (excludeDashes) {
        renderedUuid = renderedUuid.replace(/-/g, '')
    }

    if (capsLock) {
        renderedUuid = renderedUuid.toUpperCase()
    }

    return (
        <>
            <Text>
                <Label>
                    UUID: <input type="text" readOnly value={renderedUuid} />
                </Label>
                <Label>
                    Exclude Dashes:
                    <input
                        type="checkbox"
                        onClick={e =>
                            setExcludeDashes(
                                e.target !== null ? (e.target as HTMLInputElement).checked : false
                            )
                        }
                    />
                </Label>
                <Label>
                    Caps Lock:
                    <input
                        type="checkbox"
                        onClick={e =>
                            setCapsLock(
                                e.target !== null ? (e.target as HTMLInputElement).checked : false
                            )
                        }
                    />
                </Label>
                <Label>
                    <button onClick={e => generateUuid()}>Generate UUID</button>
                </Label>
            </Text>
        </>
    )
}
