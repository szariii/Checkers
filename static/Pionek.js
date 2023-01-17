class Pionek extends THREE.Mesh {

    constructor(color) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        this.color = color
        this.nrcolor = ""
        this.posx = ""
        this.posy = ""
        this.posyy = ""
        this.geometry = new THREE.CylinderGeometry(5, 5, 5, 64);
        this.material = new THREE.MeshPhongMaterial({ color: this.color });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        return (this.cube)
    }

    set nrcolor(val) {
        this._nrcolor = val
    }

    get posyy() {
        return this._posyy
    }

    set posyy(val) {
        this._posyy = val
    }

    get nrcolor() {
        return this._nrcolor
    }

    set posx(posx) {
        this._posx = posx
    }

    get posx() {
        return this._posx
    }

    set posy(posy) {
        this._posy = posy
    }

    get posy() {
        return this._posy
    }


}