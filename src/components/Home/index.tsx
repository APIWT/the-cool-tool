import { Container, Text } from '../../styles/Common'
import { Link } from 'react-router-dom'

export function Home() {
    return (
        <>
            <Container>
                <Text>

                    This is the home page!<br />
                    <Link to="/base64">Go to base64 tool</Link><br />
                    <Link to="/uuid">Go to UUID tool</Link><br />
                    <Link to="/qrcode">Go to QR code tool</Link><br />
                    <Link to="/filesearch">Go to File Search tool</Link>
                    <Link to="/json-yaml">Go to JSON/YAML tool</Link>
                </Text>
            </Container>
        </>
    )
}
