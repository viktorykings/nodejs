const parseJson = (req, res) => {
    res.send = (data) => {
        if (!res.headersSent) {
            res.writeHead(200, { "Content-type": "application/json" })
        }
        res.end(JSON.stringify(data))
    }

}
export default parseJson