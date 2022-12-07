import app from "./app.js"

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log('listening on port 5000')
})