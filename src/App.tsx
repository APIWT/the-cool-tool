import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import { Home } from "./components/Home";
import { Base64Tool } from "./components/Base64Tool";
import { QRCodeTool } from "./components/QRCodeTool";
import { GlobalStyle } from "./styles/GlobalStyle";
import { FileSearchTool } from './components/FileSearchTool';

export function App() {
    return (
        <>
            <GlobalStyle />
            <HashRouter>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/base64" element={ <Base64Tool /> } />
                    <Route path="/qrcode" element={ <QRCodeTool /> } />
                    <Route path="/filesearch" element={ <FileSearchTool /> } />
                </Routes>
            </HashRouter>
        </>
    )
}
