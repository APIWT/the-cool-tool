import { Container, Text } from '../../styles/Common'
import {Link} from "react-router-dom";

export function Base64Tool() {
    return (
        <>
            <Container>
                <Text>
                    This is the base64 tool!
                    <Link to="/">Go home</Link>
                </Text>
            </Container>
        </>
    )
}
