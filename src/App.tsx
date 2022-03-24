import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import { Home } from "./components/Home";
import { Base64Tool } from "./components/Base64Tool";
import { QRCodeTool } from "./components/QRCodeTool";
import { UuidTool } from "./components/UuidTool";
import { GlobalStyle } from "./styles/GlobalStyle";
import { FileSearchTool } from './components/FileSearchTool';
import { JsonYamlTool } from './components/JsonYamlTool'

export function App() {
    return (
        <>
            <GlobalStyle />
            <HashRouter>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/base64" element={ <Base64Tool /> } />
                    <Route path="/uuid" element={ <UuidTool /> } />
                    <Route path="/qrcode" element={ <QRCodeTool /> } />
                    <Route path="/filesearch" element={ <FileSearchTool /> } />
                    <Route path="/json-yaml" element={<JsonYamlTool />} />
                </Routes>
            </HashRouter>
        </>
    )
}
