//działania w 3D, generowanie planszy, pionków

class Game {
    constructor() {

        this.szachownica = [

        ];


        function makeplansza(szachownica) {
            for (let i = 0; i < 8; i++) {
                let wiersz = []
                for (let j = 0; j < 8; j++) {
                    if ((i + j) % 2 == 0) {
                        wiersz.push(0)
                    } else {
                        wiersz.push(1)
                    }
                }
                szachownica.push(wiersz)
            }
        }

        this.listaPionkow = []

        this.listaPol = []

        this.pionki = [

            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0]

        ];

        makeplansza(this.szachownica)
        console.log(this.szachownica)


        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.light = new THREE.DirectionalLight(0xffffff, 0.5);
        this.light.position.set(100, 100, 0);
        this.scene.add(this.light);

        this.camera.position.set(0, 100, 200)
        this.camera.lookAt(this.scene.position)




        this.letx = 15 * 4 - 7.5
        this.letz = 15 * 4 - 7.5
        for (let i = 0; i < this.szachownica.length; i++) {
            for (let j = 0; j < this.szachownica[i].length; j++) {
                if (this.szachownica[i][j] == 1) {
                    const geometry = new THREE.BoxGeometry(15, 5, 15);
                    const material = new THREE.MeshPhongMaterial({ color: 0x000000 });
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.x = this.letx - (15 * i)
                    cube.position.z = this.letz - (15 * j)
                    cube.name = { "color": "c", "postabx": i, "postaby": j, "bicie": false }
                    this.listaPol.push(cube)
                    this.scene.add(cube);

                } else {
                    const geometry = new THREE.BoxGeometry(15, 5, 15);
                    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.x = this.letx - (15 * i)
                    cube.position.z = this.letz - (15 * j)
                    cube.name = { "color": "b", "postabx": i, "postaby": j }
                    //this.listaPol.push(cube)
                    this.scene.add(cube);
                }
            }
        }

        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)
        this.scene.background = new THREE.Color(0x4B2D0B);

        document.getElementById("root").append(this.renderer.domElement);




        this.render() // wywołanie metody render

    }

    sprawdzeniewygranej = (barwy) => {
        let czarne = 0
        let biale = 0
        for (let i = 0; i < this.pionki.length; i++) {
            for (let j = 0; j < this.pionki[i].length; j++) {
                if (this.pionki[i][j] == 1) {
                    biale = biale + 1
                } else if (this.pionki[i][j] == 2) {
                    czarne = czarne + 1
                }
            }
        }

        if (czarne == 0) {
            if (barwy == 1) {
                alert("Wygrałeś")
            } else {
                alert("Przegrałeś")
            }
        } else if (biale == 0) {
            if (barwy == 2) {
                alert("Wygrałeś")
            } else {
                alert("Przegrałeś")
            }
        }
    }


    render = () => {
        TWEEN.update();
        requestAnimationFrame(this.render);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        //console.log("render leci")
    }


    tablewriting = (table, odwrot) => {
        if (odwrot == 2) {


            let wypisanatablica = ""
            for (let i = 0; i < table.length; i++) {
                console.log("bylo2")
                for (let j = 0; j < table[i].length; j++) {
                    wypisanatablica = wypisanatablica + " " + table[i][j]
                }
                wypisanatablica = wypisanatablica + "<br/>"
            }
            console.log(wypisanatablica)
            document.getElementById("tab").innerHTML = wypisanatablica
        } else {
            let wypisanatablica = ""
            for (let i = (table.length - 1); i > -1; i--) {
                console.log("bylo2")
                for (let j = (table[i].length - 1); j > -1; j--) {
                    wypisanatablica = wypisanatablica + " " + table[i][j]
                }
                wypisanatablica = wypisanatablica + "<br/>"
            }
            console.log(wypisanatablica)
            document.getElementById("tab").innerHTML = wypisanatablica
        }
    }



    playerjeden = (wejscie) => {
        console.log("wejszlo w playera")
        if (wejscie == 0) {
            ui.waiting()
        } else {
            console.log(this.pionki)
            this.tablewriting(this.pionki, 1)
            this.light.intensity = 1
            for (let i = 0; i < this.pionki.length; i++) {
                for (let j = 0; j < this.pionki[i].length; j++) {
                    if (this.pionki[i][j] == 1) {
                        //color: 0xff0000
                        let pionek = new Pionek(0xcccccc)
                        pionek.position.z = this.letx - (15 * i)
                        pionek.position.x = this.letz - (15 * j)
                        console.log(pionek)
                        pionek.nrcolor = 1
                        pionek.posx = i
                        pionek.posyy = 5
                        pionek.posy = j
                        pionek.position.y = 5
                        this.listaPionkow.push(pionek)
                        //pionek.name = { "color": 1, "posTabx": i, "posTaby": j }
                        this.scene.add(pionek);
                    } else if (this.pionki[i][j] == 2) {
                        //color: 0xcccccc
                        let pionek = new Pionek(0xff0000)
                        pionek.position.z = this.letx - (15 * i)
                        pionek.position.x = this.letz - (15 * j)
                        pionek.nrcolor = 2
                        pionek.posx = i
                        pionek.posyy = 5
                        pionek.posy = j
                        pionek.position.y = 5
                        //pionek.name = { "color": 2, "posTabx": i, "posTaby": j }
                        this.listaPionkow.push(pionek)
                        this.scene.add(pionek);
                    }
                }
            }
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


            document.onmousedown = function (event) {
                console.log(event.clientX)
                game.klik(1, event, pokazczasdokoncaruch)
            }
        }
    }

    playerdwa = () => {
        this.light.intensity = 1
        this.camera.position.set(0, 100, -200)
        this.camera.lookAt(0, 0, 0)
        this.tablewriting(this.pionki, 2)
        for (let i = 0; i < this.pionki.length; i++) {
            for (let j = 0; j < this.pionki[i].length; j++) {
                if (this.pionki[i][j] == 1) {
                    //color: 0xff0000
                    let pionek = new Pionek(0xcccccc)
                    pionek.position.z = this.letx - (15 * i)
                    pionek.position.x = this.letz - (15 * j)
                    pionek.position.y = 5
                    pionek.posyy = 5
                    pionek.nrcolor = 1
                    pionek.posx = i
                    pionek.posy = j
                    //pionek.name = { "color": 1, "posTabx": i, "posTaby": j }
                    this.listaPionkow.push(pionek)
                    this.scene.add(pionek);
                } else if (this.pionki[i][j] == 2) {
                    //color: 0xcccccc
                    let pionek = new Pionek(0xff0000)
                    pionek.position.z = this.letx - (15 * i)
                    pionek.position.x = this.letz - (15 * j)
                    pionek.position.y = 5

                    pionek.nrcolor = 2
                    pionek.posx = i
                    pionek.posyy = 5
                    pionek.posy = j
                    //pionek.name = { "color": 2, "posTabx": i, "posTaby": j }
                    this.listaPionkow.push(pionek)
                    this.scene.add(pionek);
                }
            }
        }
        net.startCzas()
        ui.waitingForOpponentMove(this.pionki, 30, 2)
    }

    klik = (barwy, event, pokazczasdokoncaruch) => {
        console.log(event)
        const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        const mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;

        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

        window.onresize = function () {
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        console.log(this.camera)
        raycaster.setFromCamera(mouseVector, this.camera);

        const intersects = raycaster.intersectObjects(this.scene.children);
        //console.log(intersects.length)


        if (intersects.length > 0) {

            // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:

            // console.log(barwy)
            console.log(intersects[0].object.nrcolor);
            // console.log(intersects[0].object.name.color);
            // console.log(intersects[0].object.name.postabx);
            // console.log(intersects[0].object.name.postaby);
            console.log("8")
            console.log(this.listaPionkow[8].posx)
            console.log(this.listaPionkow[8].posy)
            console.log("9")
            console.log(this.listaPionkow[9].posx)
            console.log(this.listaPionkow[9].posy)
            if (barwy == intersects[0].object.nrcolor) {
                console.log("weszlo")
                console.log(intersects[0].object.material.color);
                //let oldcolor = intersects[0].object.material.color
                intersects[0].object.material.color.set(0xFFFF00)

                //console.log(intersects[0].object.name)

                console.log(this.pionki)
                console.log(intersects[0].object.posx)
                console.log(intersects[0].object.posy)

                let posx = intersects[0].object.posx
                let posy = intersects[0].object.posy


                console.log(this.pionki[10])

                let bicia = []
                let wsp = 0


                if (intersects[0].object.nrcolor == 1) {
                    if (this.pionki[posx + 1] != undefined) {
                        if (this.pionki[posx + 1][posy + 1] == 0) {
                            this.sprawdzaniePolPlanszy(posx + 1, posy + 1, -1)
                        } else if (this.pionki[posx + 2] != undefined && this.pionki[posx + 1][posy + 1] != barwy) {
                            if (this.pionki[posx + 2][posy + 2] == 0) {
                                this.sprawdzaniePolPlanszy(posx + 2, posy + 2, wsp)
                                bicia.push([[posx + 1], [posy + 1]])
                                wsp = wsp + 1
                            }
                        }
                    }

                    if (this.pionki[posx + 1] != undefined) {
                        if (this.pionki[posx + 1][posy - 1] == 0) {
                            this.sprawdzaniePolPlanszy(posx + 1, posy - 1, -1)
                        } else if (this.pionki[posx + 2] != undefined && this.pionki[posx + 1][posy - 1] != barwy) {
                            if (this.pionki[posx + 2][posy - 2] == 0) {
                                this.sprawdzaniePolPlanszy(posx + 2, posy - 2, wsp)
                                bicia.push([[posx + 1], [posy - 1]])
                                wsp = wsp + 1
                            }
                        }
                    }

                } else if (intersects[0].object.nrcolor == 2) {
                    if (this.pionki[posx - 1] != undefined) {
                        if (this.pionki[posx - 1][posy + 1] == 0) {
                            this.sprawdzaniePolPlanszy(posx - 1, posy + 1, -1)
                        } else if (this.pionki[posx - 2] != undefined && this.pionki[posx - 1][posy + 1] != barwy) {
                            if (this.pionki[posx - 2][posy + 2] == 0) {
                                this.sprawdzaniePolPlanszy(posx - 2, posy + 2, wsp)
                                bicia.push([[posx - 1], [posy + 1]])
                                wsp = wsp + 1
                            }
                        }
                    }

                    if (this.pionki[posx - 1] != undefined) {
                        if (this.pionki[posx - 1][posy - 1] == 0) {
                            this.sprawdzaniePolPlanszy(posx - 1, posy - 1, -1)
                        } else if (this.pionki[posx - 2] != undefined && this.pionki[posx - 1][posy - 1] != barwy) {
                            if (this.pionki[posx - 2][posy - 2] == 0) {
                                this.sprawdzaniePolPlanszy(posx - 2, posy - 2, wsp)
                                bicia.push([[posx - 1], [posy - 1]])
                                wsp = wsp + 1
                            }
                        }
                    }
                }


                //console.log(this.listaPionkow[])

                console.log(intersects[0].object.posx)
                console.log(intersects[0].object.posy)

                document.onmousedown = function (event) {
                    game.przemieszczenie(intersects[0].object, event, barwy, bicia, pokazczasdokoncaruch)
                }


            }

        }
    }


    sprawdzaniePolPlanszy = (pospierwsza, posdruga, wsp) => {
        for (let i = 0; i < this.listaPol.length; i++) {
            //console.log(this.listaPol[i].name)
            if (this.listaPol[i].name.postabx == posdruga && this.listaPol[i].name.postaby == pospierwsza) {
                this.listaPol[i].material.color.set(0xFFCC00)
                //console.log("weszlo w kolorek")
                console.log(this.listaPol[i].name)
                this.listaPol[i].name.color = "z"
                this.listaPol[i].name.bicie = wsp
            }
        }
    }



    przemieszczenie = (pion, event, barwy, bicia, pokazczasdokoncaruch) => {
        const raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        const mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;

        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

        window.onresize = function () {
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        console.log(this.camera)
        raycaster.setFromCamera(mouseVector, this.camera);

        const intersects = raycaster.intersectObjects(this.scene.children);


        if (intersects.length > 0) {

            // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
            if (intersects[0].object.name.color == "z") {
                console.log("weszlo")
                console.log(intersects[0].object.name);




                let posx = intersects[0].object.position.x
                let posz = intersects[0].object.position.z

                if (intersects[0].object.name.bicie != -1) {
                    console.log(intersects[0].object.name.bicie)
                    console.log(bicia)
                    let odpowiedniaWspolrzedna = intersects[0].object.name.bicie
                    console.log(bicia[odpowiedniaWspolrzedna])
                    let arr = []
                    for (let i = 0; i < this.listaPionkow.length; i++) {
                        console.log(this.listaPionkow[i].posx)
                        console.log(this.listaPionkow[i].posy)
                        arr.push([this.listaPionkow[i].posx, this.listaPionkow[i].posy])
                        if (this.listaPionkow[i].position.x == this.letx - (15 * bicia[odpowiedniaWspolrzedna][1]) && this.listaPionkow[i].position.z == this.letz - (15 * bicia[odpowiedniaWspolrzedna][0]) && this.listaPionkow[i].position.y == 5) {
                            console.log("bylo w tym do usuwania")
                            console.log(this.listaPionkow[i])
                            this.listaPionkow[i].posyy = 100
                            new TWEEN.Tween(this.listaPionkow[i].position) // co
                                .to({ y: -5 }, 1000) // do jakiej pozycji, w jakim czasie
                                .repeat(0) // liczba powtórzeń
                                .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
                                .onUpdate(() => { /*console.log(pion.position)*/ })
                                .onComplete(() => {
                                    console.log("koniec animacji")
                                }) // funkcja po zakończeniu animacji
                                .start()



                            this.pionki[this.listaPionkow[i].posy][this.listaPionkow[i].posx] = 0
                            //this.pionki[]
                        }
                    }
                    console.log(arr)
                }



                new TWEEN.Tween(pion.position) // co
                    .to({ x: posx, z: posz }, 1000) // do jakiej pozycji, w jakim czasie
                    .repeat(0) // liczba powtórzeń
                    .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
                    .onUpdate(() => { /*console.log(pion.position)*/ })
                    .onComplete(() => {
                        console.log("koniec animacji")
                        document.onmousedown = function (event) {
                            //game.klik(pion.nrcolor, event)
                            //ui.finishedmove(this.pionki)
                        }
                    }) // funkcja po zakończeniu animacji
                    .start()


                this.pionki[pion.posx][pion.posy] = 0

                console.log(intersects[0].object.name.postabx)
                console.log(intersects[0].object.name.postaby)
                this.pionki[intersects[0].object.name.postaby][intersects[0].object.name.postabx] = pion.nrcolor
                pion.posx = intersects[0].object.name.postaby
                pion.posy = intersects[0].object.name.postabx

                console.log(this.pionki)
                console.log(this.szachownica)



                for (let i = 0; i < this.listaPol.length; i++) {
                    this.listaPol[i].name.color = "c"
                    this.listaPol[i].material.color.set(0x000000)
                    this.listaPol[i].name.bicie = "false"
                }


                if (pion.nrcolor == 1) {
                    pion.material.color.set(0xcccccc)
                    //0xFF0000
                } else if (pion.nrcolor == 2) {
                    pion.material.color.set(0xFF0000)
                }
                document.getElementById("czasnawykonanieruchu").style.display = "none"
                document.getElementById("czasnawykonanieruchu").innerHTML = ""
                clearInterval(pokazczasdokoncaruch)

                if (pion.nrcolor == 1) {
                    this.tablewriting(this.pionki, 1)
                } else {
                    this.tablewriting(this.pionki, 2)
                }

                ui.finishedmove(this.pionki, barwy)

            }

        }
    }


    restart = () => {
        this.pionki = [

            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0]

        ];
    }

    podmianaTablic = (table, barwy, pokazczasdokoncaruch) => {
        console.log(table)
        console.log(this.pionki)
        console.log("Weszlo w podminae tablic")

        let kolorekprzeciwnika = 0
        if (barwy == 1) {
            kolorekprzeciwnika = 2
        } else {
            kolorekprzeciwnika = 1
        }



        let posstartx = 0
        let posstartz = 0
        let posfinishx = 0
        let posfinishz = 0
        let posszbiciaz = 0
        let posszbiciax = 0
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table.length; j++) {
                if (table[i][j] != this.pionki[i][j]) {
                    if (this.pionki[i][j] == kolorekprzeciwnika || this.pionki[i][j] == 0) {
                        if (table[i][j] == 0) {
                            posstartz = i
                            posstartx = j
                        } else if (table[i][j] != 0) {
                            posfinishz = i
                            posfinishx = j
                        }
                    } else if (this.pionki[i][j] == barwy) {
                        posszbiciaz = i
                        posszbiciax = j
                    }

                }
            }
        }
        console.log("posstartx " + posstartx)
        console.log("posstartz " + posstartz)

        posstartx = this.letx - (15 * posstartx)
        posstartz = this.letz - (15 * posstartz)



        console.log(posstartx)
        console.log(posstartz)
        //console.log(this.listaPionkow)

        for (let i = 0; i < this.listaPionkow.length; i++) {
            //console.log(this.listaPionkow[i].position)

            //if (this.listaPionkow[i].posx == posszbiciaz && this.listaPionkow[i].posy == posszbiciax && this.listaPionkow[i].position.y == 5) {
            if (this.listaPionkow[i].position.x == this.letx - (15 * posszbiciax) && this.listaPionkow[i].position.z == this.letz - (15 * posszbiciaz) && this.listaPionkow[i].position.y == 5) {
                console.log("weszlo w bicie")
                this.listaPionkow[i].posx = 100
                this.listaPionkow[i].posy = 100
                this.listaPionkow[i].posyy = 100
                new TWEEN.Tween(this.listaPionkow[i].position) // co
                    .to({ y: -5 }, 1000) // do jakiej pozycji, w jakim czasie
                    .repeat(0) // liczba powtórzeń
                    .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
                    .onUpdate(() => { /*console.log(pion.position)*/ })
                    .onComplete(() => {
                        console.log("koniec animacji")
                    }) // funkcja po zakończeniu animacji
                    .start()
            }


            if (this.listaPionkow[i].position.x == posstartx && this.listaPionkow[i].position.z == posstartz && this.listaPionkow[i].position.y == 5) {
                console.log(this.listaPionkow[i])
                console.log(this.listaPionkow[i].posx)
                this.listaPionkow[i].posx = posfinishx
                this.listaPionkow[i].posy = posfinishz
                console.log(this.listaPionkow[i].posx)
                console.log(this.listaPionkow[i].position)
                let posfinishinz = this.letz - (15 * posfinishz)
                let posfinishinx = this.letx - (15 * posfinishx)

                new TWEEN.Tween(this.listaPionkow[i].position) // co
                    .to({ x: posfinishinx, z: posfinishinz }, 1000) // do jakiej pozycji, w jakim czasie
                    .repeat(0) // liczba powtórzeń
                    .easing(TWEEN.Easing.Elastic.Out) // typ easingu (zmiana w czasie)
                    .onUpdate(() => { /*console.log(pion.position)*/ })
                    .onComplete(() => { console.log("koniec animacji") }) // funkcja po zakończeniu animacji
                    .start()

                console.log(this.pionki)
            }
        }

        this.pionki = table


        if (barwy == 1) {
            this.tablewriting(this.pionki, 1)
        } else {
            this.tablewriting(this.pionki, 2)
        }





        setTimeout(function () {
            if (barwy == 1) {
                document.onmousedown = function (event) {
                    console.log(event.clientX)
                    game.klik(1, event, pokazczasdokoncaruch)
                }
            } else if (barwy == 2) {
                document.onmousedown = function (event) {
                    console.log(event.clientX)
                    game.klik(2, event, pokazczasdokoncaruch)
                }
            }

            //wygrana/przegrana//
            game.sprawdzeniewygranej(barwy)

        }, 500)


    }

}