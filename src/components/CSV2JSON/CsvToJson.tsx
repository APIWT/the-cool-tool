import { Container, Text } from '../../styles/Common'
import { useState } from "react";

export function CsvToJson() {
    const [inputValue, setInputValue] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [json, setJson] = useState<string>('');

    const urlRegex: RegExp = new RegExp("^https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/2PACX-.*\/pub.*");
    const urlTypeRegex: RegExp = new RegExp("^.*csv");

    function getSheet()
    {
        var error: string = validateUrl(inputValue);

        if (error)
        {
            setErrorMessage(error);
            return;
        }

        setErrorMessage("");
        setLoading(true);
        fetch(inputValue)
            .then(response => response.text())
            .then(processResponse)
    }

    function processResponse(response: string)
    {
        response = sanitizeData(response);

        var headers: string[] = [];
        var body: string[][] = [];

        var rows: string[] = response.split('\r\n');
        rows.forEach((row, i) => {
            var rowBody: string[] = [];
            var columns: string[] = row.split(',');
            columns.forEach(column => {
                if (i == 0)
                    headers.push(column);
                else
                    rowBody.push(column);
            });

            if (i != 0)
                body.push(rowBody);
        });

        var results: object[] = [];
        body.forEach(item => {
            var tempObj:{[key: string]: any} = {}
            headers.forEach((prop, i) => {
                if (item.length >= i)
                    if (item[i].length > 0)
                        if (isNaN(parseFloat(item[i])))
                            tempObj[prop] = item[i];
                        else
                            tempObj[prop] = parseFloat(item[i]);
            })
            results.push(tempObj);
        });
        console.log(results);
        setJson(JSON.stringify(results));

        setLoading(false);
    }

    function sanitizeData(data: string): string
    {
        //This should really find a clever way of solving for
        //commas, quotation marks, etc in a CSV. I REALLY dislike
        //the way Google Sheets handles these characters, so I didn't do it :p.

        return data;
    }

    function validateUrl(url: string): string
    {
        if (url.length == 0)
            return 'Please enter a URL';

        if (!urlRegex.test(url))
            return 'Invalid Google Sheets link';

        if (!urlTypeRegex.test(url))
            return 'Please publish as a CSV';

        return '';
    }

    return (
        <>
            <Container style={styles.page}>
                <Text>
                    <h1>Google Sheets CSV to JSON Converter</h1>
                    <div style={styles.filebar}>
                        <input style={styles.input} type="text" placeholder="Google Sheet Url" onChange={e => setInputValue(e.target.value)} />
                        <button style={styles.button} onClick={getSheet}>Fetch Sheet</button><br/>
                        <div style={styles.error}>{errorMessage}</div>
                    </div>
                    <div style={styles.results}>
                        {loading ? <div style={styles.load} className="Loading">Loading...</div> : <div style={styles.json} className="Result">{ json }</div>}
                    </div>
                </Text>
            </Container>
        </>
    )
}

const styles = {
    page: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    },
    filebar: {
        textAlign: "center"
    },
    input: {
        padding: 10,
        border: "none",
        borderRadius: 5,
    },
    button: {
        backgroundColor: "green",
        borderRadius: 5,
        border: "1px solid white",
        padding: 10,
        marginLeft: 30
    },
    error: {
        color: "red",
        padding: 20,
        textAlign: "center",
        height: 12,
    },
    results: {
        position: "relative",
        margin: 20,
        padding: 20,
        border: "1px solid white",
        width: window.innerWidth / 2,
        height: window.innerWidth / 2,
        overflow: scroll,
    },
    load: {
        position: "absolute",
        left: window.innerWidth / 4,
        top: window.innerWidth / 4,
        transform: "translate(-50%,-50%)",
    },
    json: {
        
    }
};