import { Container, Text } from '../../styles/Common'
import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <Container>
                <Text>
                    This is the home page!
                    <Link to="/base64">Go to base64 tool</Link>
                </Text>
            </Container>
        </>
    )
}
