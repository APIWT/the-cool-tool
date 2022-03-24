import { Button } from '../Button'
import { Text } from '../../styles/Common'

export function Greetings() {
    function handleSayHello() {
        window.Main.sendMessage('Hello World')

        console.log('Message sent! Check main process log in terminal.')
    }

    return (
        <>
            <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text>
            <Button onClick={handleSayHello}>Send message to main process</Button>
        </>
    )
}
