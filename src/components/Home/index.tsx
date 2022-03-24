import { Container, Text, Links } from '../../styles/Common'
import { Link } from 'react-router-dom'

export function Home() {
    return (
        <>
            <Container>
                <Text>This is the home page!</Text>
                <Links>
                    <Link to="/base64">Go to base64 tool</Link>
                    <Link to="/uuid">Go to UUID tool</Link>
                    <Link to="/qrcode">Go to QR code tool</Link>
                    <Link to="/filesearch">Go to File Search tool</Link>
                    <Link to="/json-yaml">Go to JSON/YAML tool</Link>
                </Links>
            </Container>
        </>
    )
}
