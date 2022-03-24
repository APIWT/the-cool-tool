import { Container, Text, Label } from '../../styles/Common'
import { Link } from 'react-router-dom'
import * as QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { QRCodeErrorCorrectionLevel } from 'qrcode'

export function QRCodeTool() {
    const [text, setText] = useState('')
    const [dataUrl, setDataUrl] = useState('')
    const [lastError, setLastError] = useState('')
    const [version, setVersion] = useState(1)
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('low')

    useEffect(() => {
        QRCode.toDataURL(
            text,
            {
                version: version,
                errorCorrectionLevel: errorCorrectionLevel as QRCodeErrorCorrectionLevel,
            },
            function (err, url) {
                if (err) {
                    setLastError(err.message)
                    setDataUrl('')
                    return
                }

                setLastError('')
                setDataUrl(url)
            }
        )
    }, [text, version, errorCorrectionLevel])

    let qrcodeImage = null

    if (dataUrl !== '') {
        qrcodeImage = <img src={dataUrl} style={{ maxWidth: '40vw' }} />
    }

    let errorText = null

    if (lastError !== '') {
        errorText = <Text>{lastError}</Text>
    }

    return (
        <>
            <Container>
                <Label>
                    Text:
                    <textarea
                        placeholder="Enter text to generate code for"
                        onChange={e => setText(e.target.value)}
                    />
                </Label>
                <Label>
                    Version:
                    <select onChange={e => setVersion(parseInt(e.target.value, 10))}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                    </select>
                </Label>
                <Label>
                    Error Correction Level:
                    <select onChange={e => setErrorCorrectionLevel(e.target.value)}>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="quartile">quartile</option>
                        <option value="high">high</option>
                    </select>
                </Label>

                {qrcodeImage}
                {errorText}
                <Link to="/">Go home</Link>
            </Container>
        </>
    )
}
