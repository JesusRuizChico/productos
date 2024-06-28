const ConectarBD = require("./ConectarBD");

class ProductoBD extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoProducto(prod) {
        const sql = "INSERT INTO producto (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?);";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [prod.nombre, prod.descripcion, prod.precio, prod.stock]);
            console.log("Crea un nuevo producto");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al agregar producto " + error);
            console.error(sql);
        }
    }

    async mostrarProductos() { // Cambiamos el nombre del método para mayor claridad
        const sql = "SELECT * FROM producto;";
        try {
            await this.conectarMySql();
            const [productosMySql] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return productosMySql;
        } catch (error) {
            console.error("Error al obtener los datos de los productos" + error);
            console.error(sql);
        }
    }

    async productoId(id) {
        const sql = "SELECT * FROM producto WHERE id = ?;"; // Suponiendo que la columna id en la tabla producto es "id"
        try {
            await this.conectarMySql();
            const [[prod]] = await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Consulta correcta por Id");
            return prod;
        } catch (error) {
            console.error("Error al consultar por id" + error);
            console.error(sql);
        }
    }

    async editarProducto(prod) { // Cambiamos el nombre del método para mayor claridad
        const sql = `
            UPDATE producto SET 
            nombre = ?, 
            descripcion = ?, 
            precio = ?, 
            stock = ? 
            WHERE id = ?;
        `;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [prod.nombre, prod.descripcion, prod.precio, prod.stock, prod.id]);
            await this.cerrarConexion();
            console.log("Actualizacion correcta de producto");
        } catch (error) {
            console.error("Error al editar producto " + error);
            console.error(sql);
        }
    }

    async borrarProducto(id) { // Cambiamos el nombre del método para mayor claridad
        const sql = "DELETE FROM producto WHERE id = ?;";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Producto Borrado");
        } catch (error) {
            console.error("Error al borrar producto" + error);
            console.error(sql);
        }
    }
}

module.exports = ProductoBD;