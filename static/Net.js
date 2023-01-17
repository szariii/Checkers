//komunikacja z serwerem - fetch
class Net {
    constructor() {
    }

    restartfetch = () => {
        const op = {
            method: "POST",
        }

        fetch("/restart", op)
            .then(response => response)
            .then(data => console.log(data))
            .catch(error => console.log(error))

    }

    logfetch = (name) => {
        console.log(name)
        let data = {};
        data.name = name;
        console.log(data)


        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(data)
        }

        console.log(options)

        fetch("/log", options)
            .then(respons => respons.json())
            .then(data => {
                console.log(data)
                if (data.flag == 0) {
                    ui.bladlogowania(data.text)
                } else if (data.flag == 1) {
                    ui.graczjeden(data.text)
                } else if (data.flag == 2) {
                    ui.graczdrugi(data.text)
                }
            })
            .catch(error => console.log(error))
    }

    waitfetch = (waitinginterval) => {
        let wynik = 0
        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: ""
        }

        fetch("/waiting", options)
            .then(respons => respons.json())
            .then(data => {
                console.log(data)
                if (data.moznagrac == true) {
                    game.playerjeden(1)
                    clearInterval(waitinginterval)
                    document.getElementById("waiting").remove()


                }
            })
            .catch(error => console.log(error))

        return (wynik)
    }

    aktaulizacjaTab = (table) => {
        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({ "table": table })
        }

        fetch("/aktualizacja_tablicy", options)
            .then(respons => respons)
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }




    sprawdzTablice = (table, int, inteerval, barwy) => {
        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: ""
        }

        fetch("/porownywanie_tablic", options)
            .then(respons => respons.json())
            .then(data => {
                console.log(data)
                console.log(int)

                if (JSON.stringify(table) != JSON.stringify(data)) {
                    document.getElementById("sekundnik").remove()
                    setTimeout(function () {
                        document.getElementById("czasnawykonanieruchu").style.display = "inline"
                        let pokazczasdokoncaruch = setInterval(async () => {
                            
                            let czas = await net.takeCzas()
                            if (czas == undefined) {
                                document.getElementById("czasnawykonanieruchu").innerText = 30
                            } else {
                                document.getElementById("czasnawykonanieruchu").innerText = Math.round(czas / 1000)
                            }

                            if (czas < 0) {
                                alert("Przegrałeś")
                            }
                        }, 1000)

                        game.podmianaTablic(data, barwy, pokazczasdokoncaruch)
                        clearInterval(inteerval)
                    }, 500)

                } else {
                    ui.licznik(int)
                }

            })
            .catch(error => console.log(error))
    }



    startCzas = () => {

        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({ "status": "start" })
        }

        fetch("/czas_serwer", options)
            .then(respons => respons.json())
            .then(data => {
                console.log(data)
                console.log("Czas start")
            })
            .catch(error => console.log(error))
    }

    takeCzas = () => {
        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({ "status": "aktualna" })
        }

        let czas = fetch("/czas_serwer", options)
            .then(respons => respons.json())
            .then(data => {
                console.log(data)
                return (30000 - data)
            })
            .catch(error => console.log(error))

        return czas
    }



}