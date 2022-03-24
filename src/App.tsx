import { BrowserRouter as Router, Routes, HashRouter, Route, Link } from 'react-router-dom'
import { Links, Wrapper, Nav, Main, Logo } from './styles/Common'
import { Home } from './components/Home'
import { Base64Tool } from './components/Base64Tool'
import { QRCodeTool } from './components/QRCodeTool'
import { UuidTool } from './components/UuidTool'
import { GlobalStyle } from './styles/GlobalStyle'
import { FileSearchTool } from './components/FileSearchTool'
import { JsonYamlTool } from './components/JsonYamlTool'
import { JsonBeautifierTool } from './components/JsonBeautifierTool'

import logo from './assets/logo.png'

const routes = [
    {
        path: '/',
        name: 'Home',
        exact: true,
        sidebar: () => <div>Home</div>,
        main: () => <Home />,
    },
    {
        path: '/base64',
        name: 'Base64 Encoder',
        exact: true,
        sidebar: () => <div>Base64 Tool</div>,
        main: () => <Base64Tool />,
    },
    {
        path: '/qrcode',
        name: 'QR Code Generator',
        exact: true,
        sidebar: () => <div>QR Code Tool</div>,
        main: () => <QRCodeTool />,
    },
    {
        path: '/uuid',
        name: 'UUID Generator',
        exact: true,
        sidebar: () => <div>UUID Tool</div>,
        main: () => <UuidTool />,
    },
    {
        path: '/filesearch',
        name: 'File Search',
        exact: true,
        sidebar: () => <div>File Search Tool</div>,
        main: () => <FileSearchTool />,
    },
    {
        path: '/json-yaml',
        name: 'JSON/YAML Converter',
        exact: true,
        sidebar: () => <div>JSON/YAML Tool</div>,
        main: () => <JsonYamlTool />,
    },
    {
        path: '/json-beautifier',
        name: 'JSON Beautifier',
        exact: true,
        sidebar: () => <div>JSON Beautifier Tool</div>,
        main: () => <JsonBeautifierTool />,
    },
]

export function App() {
    return (
        <>
            <GlobalStyle />
            <HashRouter>
                <Wrapper>
                    <Nav>
                        <Links>
                            {routes.map(({ path, sidebar }, index) => (
                                <Link
                                    key={index}
                                    to={path}
                                    className={window.location.pathname === path ? 'active' : ''}
                                >
                                    {sidebar()}
                                </Link>
                            ))}
                        </Links>
                        <Logo src={logo} alt="logo" />
                    </Nav>
                    <Main>
                        <Routes>
                            {routes.map(({ path, main }) => (
                                <Route key={path} path={path} element={main()} />
                            ))}
                        </Routes>
                    </Main>
                </Wrapper>
            </HashRouter>
        </>
    )
}
