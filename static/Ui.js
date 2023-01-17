//obsługa interfejsu 2D aplikacji (pola txt, przycisk logowania)

class Ui {
    constructor() {
        document.getElementById("login").onclick = this.login
        document.getElementById("restart").onclick = this.restart
    }

    restart = () => {
        net.restartfetch()
        game.restart()
    }

    login = () => {
        let data = document.getElementById("name").value
        net.logfetch(data)
    }

    bladlogowania = (text) => {
        document.getElementById("komunikat").innerText = text
    }

    graczjeden = (text) => {
        document.getElementById("komunikat").innerText = text
        document.getElementById("formik").style.display = "none"
        game.playerjeden(0)
    }

    graczdrugi = (text) => {
        document.getElementById("komunikat").innerText = text
        document.getElementById("formik").style.display = "none"
        game.playerdwa(0)
    }

    waiting = () => {
        let waitinginterval = window.setInterval(function () {
            let wartosc = net.waitfetch(waitinginterval)
            console.log(wartosc)
        }, 100)

        ui.waitingforplayer()


    }

    waitingforplayer = () => {
        let div = document.createElement("div")
        div.id = "waiting"
        let h1 = document.createElement("h1")
        h1.style.color = "red"
        h1.innerText = "Wait for oponent"
        h1.classList.add("h1text")
        div.appendChild(h1)
        let img = document.createElement("img")
        console.log(img)
        img.src = "./img/loading.png"
        img.id = "kreciolek"
        let obrot = 1
        let krecenie = setInterval(function () {
            obrot = obrot + 1
            let deg = 36 * obrot
            //console.log(document.getElementById("asd"))
            if (document.getElementById("kreciolek") == null) {
                clearInterval(krecenie)
            } else {
                document.getElementById("kreciolek").style.transform = "rotate(" + deg + "deg)"
            }

        }, 200)

        div.appendChild(img)

        document.body.appendChild(div)


    }

    finishedmove = (table, barwy) => {
        //console.log("weszlo w finished move")
        net.aktaulizacjaTab(table)
        console.log("-----------tablica-----------------")
        console.log(table)
        console.log("-----------koniec-----------------")
        net.startCzas()
        game.sprawdzeniewygranej(barwy)
        setTimeout(ui.waitingForOpponentMove, 600, table, 30, barwy)
    }

    waitingForOpponentMove = async (table, i, barwy) => {
        console.log(i)
        console.log(table)
        console.log(barwy)

        let czas = await net.takeCzas()

        let sekundy = document.createElement("div")
        sekundy.innerHTML = "<h1><span style='color:brown'>Oczekiwanie na ruch przeciwnika </span> <br/>" + Math.round(czas / 1000) + "</h1>"
        sekundy.id = "sekundnik"
        sekundy.classList.add("h1text")
        document.body.appendChild(sekundy)
        console.log(table)

        let inteerval = setInterval(async function () {
            let czas = await net.takeCzas()
            console.log("Waiting for opponent")
            console.log(czas)
            console.log(i)
            net.sprawdzTablice(table, Math.round(czas / 1000), inteerval, barwy)
            if (czas < 0) {
                alert("wygrałeś")
            }
        }, 1000)
    }


    licznik = (i) => {
        document.getElementById("sekundnik").innerHTML = "<h1><span style='color:brown'>Oczekiwanie na ruch przeciwnika </span><br/>" + i + "</h1>"
    }
}