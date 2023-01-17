const { time } = require("console");
var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.static('static'))
var path = require("path")




app.use(express.json())
let currentTab = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
]

let table = []
let timek = new Date()

app.post("/restart", (req, res) => {
    currentTab = [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0]
    ]
    table = []
    res.send(table)
})

app.post("/czas_serwer", (req, res) => {
    console.log(req.body)
    if (req.body.status == "start") {
        timek = new Date()
        res.send(timek)
    } else if (req.body.status == "aktualna") {
        let actual = new Date()
        console.log(actual)
        let diff = actual - timek
        console.log(diff)
        res.send(diff.toString())
    }

})


app.post("/aktualizacja_tablicy", (req, res) => {
    console.log(req.body.table)
    currentTab = req.body.table
    console.log(currentTab)
    res.send("no moze nie")
})

app.post("/porownywanie_tablic", (req, res) => {
    res.send(currentTab)
})

app.post("/waiting", (req, res) => {
    if (table.length < 2) {
        res.send({ "moznagrac": false })
    } else {
        res.send({ "moznagrac": true })
    }
})


app.post("/log", (req, res) => {
    console.log(req.body.name)
    login = req.body.name

    if (table.length <= 1) {
        if (table.length == 0) {
            table.push(login)
            res.send({ "flag": 1, "text": "Grasz jako " + login })
        } else {
            if (table[0] == login) {
                res.send({ "flag": 0, "text": "Taki login jest zajęty" })
            } else {
                table.push(login)
                res.send({ "flag": 2, "text": "Grasz jako " + login })
            }
        }

    } else {
        res.send({ "flag": 0, "text": "Za dużo graczy" })
    }

})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})