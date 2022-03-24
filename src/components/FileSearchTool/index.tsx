import { Container, Text } from '../../styles/Common'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface SearchResult {
    lineNumber: number,
    value: string
}

export function FileSearchTool() {
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null)
    const [searchPattern, setSearchPattern] = useState('')
    const [searchResults, setSearchResults] = useState(new Map<string, SearchResult[]>())

    useEffect(() => {
        if (
            searchPattern.length === 0 ||
            selectedFiles === null ||
            selectedFiles.length === 0
        ) {
            return
        }

        const re = new RegExp(searchPattern, 'gm')

        selectedFiles.forEach(file => {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onloadend = evt => {
                if (
                    evt?.target === null ||
                    !evt.target.result ||
                    evt.target.readyState !== FileReader.DONE
                ) {
                    return
                }

                const fileContent = evt.target.result as string

                const fileSearchResults: SearchResult[] = []
                let currentMatch: RegExpExecArray | null
                while ((currentMatch = re.exec(fileContent)) !== null) {

                    let lineNumber = 1;
                    for (let i = 0; i < currentMatch.index; i++)
                    {
                        if (fileContent[i] === '\n') {
                            lineNumber++;
                        }
                    }

                    const allLines = fileContent.split('\n')

                    fileSearchResults.push({
                        lineNumber,
                        value: allLines[lineNumber - 1]
                    })
                }

                if (fileSearchResults.length > 0) {
                    setSearchResults(prevResults => new Map<string, SearchResult[]>(prevResults.set(file.path, fileSearchResults)))
                }
            }
        })
    }, [selectedFiles, searchPattern])

    function renderFileSearchResults(file: string, results: SearchResult[]): any {
        const elements: any[] = []
        results.forEach((result, i) => {
            elements.push((
                <li key={i}>
                    <Text>{`[${result.lineNumber}] - ${result.value}`}</Text>
                </li>
            ))
        });

        return (
            <ul>
                <Text>{file}</Text>
                {elements}
            </ul>
        )
    }

    function renderSearchResults(): any {
        const elements: any[] = []
        searchResults.forEach((results, file) => {
            elements.push(<li key={file}>{renderFileSearchResults(file, results)}</li>)
        });

        return <ul>{elements}</ul>
    }

    return (
        <>
            <Container>
                <Text>Search through files using regex.</Text>

                <label>
                    Select the directory to search through
                    <input
                        type="file"
                        directory=""
                        webkitdirectory=""
                        onChange={e => {
                            if (e?.target?.files === null) {
                                return
                            }

                            const files: File[] = []

                            for (let i = 0; i < e.target.files.length; ++i) {
                                files.push(e.target.files[i])
                            }

                            setSelectedFiles(files)
                        }}
                    />
                </label>

                <label>
                    Enter your regex search pattern
                    <input
                        type="text"
                        onChange={e => {
                            setSearchPattern(e.target.value)
                        }}
                    />
                </label>

                <Text>Results</Text>
                <ul>
                    { renderSearchResults() }
                </ul>

                <Link to="/">Go home</Link>
            </Container>
        </>
    )
}
