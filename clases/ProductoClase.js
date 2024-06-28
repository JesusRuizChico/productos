class Producto {
    constructor(usuarioP) {
        this.idusuariosP = usuarioP.idusuariosP;
        this.nombre = usuarioP.nombre;
        this.descripcion = usuarioP.descripcion;
        this.precio = usuarioP.precio;
        this.stock = usuarioP.stock;
    }

    set id(idusuariosP) {
        this._idP = idusuariosP;
    }

    set nombre(nombre) {
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexNombre.test(nombre)) {
            this._nombre = nombre;
        }
    }

    set descripcion(descripcion) {
        var regexDescripcion = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexDescripcion.test(descripcion)) {
            this._descripcion = descripcion;
        }
    }

    set precio(precio) {
        var regexPrecio = /^\d+(\.\d{1,2})?$/; // Ajustado para aceptar decimales (hasta dos decimales)
        if (regexPrecio.test(precio)) {
            this._precio = parseFloat(precio); // Convertir el precio a tipo float
        }
    }

    set stock(stock) {
        var regexStock = /^\d+$/;
        if (regexStock.test(stock)) {
            this._stock = parseInt(stock, 10); // Convertir el stock a tipo entero
        }
    }

    get nombre() {
        return this._nombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    get precio() {
        return this._precio;
    }

    get stock() {
        return this._stock;
    }

    get id() {
        return this._idP;
    }

    get mostrarDatos() {
        return {
            id: this._idP,
            nombre: this._nombre,
            descripcion: this._descripcion,
            precio: this._precio,
            stock: this._stock
        };
    }
}

module.exports = Producto;