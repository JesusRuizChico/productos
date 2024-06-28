const ruta = require("express").Router();
const UsuarioClase = require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuariosBD");
const ProductoClase = require("../clases/ProductoClase");
const ProductoBD = require("../bd/ProductoBD");

// Rutas de usuarios


ruta.get("/", async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuariosMySql = await usuariobd.mostrarUsuarios();

        if (usuariosMySql && usuariosMySql.length > 0) {
            const usuariosCorrectos = usuariosMySql.map(usuario => {
                const usuario1 = new UsuarioClase(usuario);
                if (usuario1.nombre && usuario1.celular && usuario1.correo) {
                    return usuario;
                }
            }).filter(usuario => usuario !== undefined);

            res.render("mostrarUsuarios", { usuariosCorrectos });
        } else {
            res.status(404).send('No se encontraron usuarios');
        }
    } catch (error) {
        console.error('Error al obtener los datos de los usuarios:', error);
        res.status(500).send('Error al obtener los datos de los usuarios');
    }
});



ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new UsuarioClase(req.body);
    
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
       usuariobd.nuevoUsuario(usuario1.mostrarDatos);
        //console.log(usuario1.mostrarDatos);
        res.render("inicio",usuario1.mostrarDatos);
    }else{
        res.render("error");


    }
    
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:idusuarios",async(req,res)=>{
    try{
        const usuariobd=new UsuarioBD();
        const usuario=await usuariobd.usuarioId(req.params.idusuarios);
        //console.log(usuario);
        res.render("editarUsuario",usuario);
    }catch(error){

    }
  
    // res.end();
    

});

ruta.post("/editarUsuario",async(req,res)=>{
    try{
        const usuariobd=new UsuarioBD();
        // console.log(req.body);
        await usuariobd.editarUsuario(req.body);
        console.log("Usuario editado correctamente")
        res.redirect("/");
    }catch{
        console.error("Error al editar Usuario");
    }
});

ruta.get("/borrarUsuario/:id",async(req,res)=>{
    try{
        const usuariobd=new UsuarioBD();
        await usuariobd.borrarUsuario(req.params.id);
        res.redirect("/");
    }catch (error){
        console.log(error);
    }

});

module.exports=ruta;

// Rutas de productos
ruta.get("/productos", async (req, res) => {
    const productoBD = new ProductoBD();
    const productosMySql = await productoBD.mostrarProductos();
    var productosCorrectos = [];
    productosMySql.forEach(prod => {
        var producto = new ProductoClase(prod);
        if (producto.nombre != undefined && producto.descripcion != undefined && producto.precio != undefined && producto.stock != undefined) {
            productosCorrectos.push(prod);
        }
    });
    res.render("productos", { productosCorrectos });
});

ruta.post("/agregarProducto", (req, res) => {
    var producto = new ProductoClase(req.body);

    if (producto.nombre != undefined && producto.descripcion != undefined && producto.precio != undefined && producto.stock != undefined) {
        const productoBD = new ProductoBD();
        productoBD.nuevoProducto(producto.mostrarDatos());
        console.log(producto.mostrarDatos());
        res.render("inicio", { producto: producto.mostrarDatos() });
    } else {
        res.render("error");
    }
});

ruta.get("/agregarProductos", (req, res) => {
    res.render("formularioProductos"); // Asegúrate de que esta vista exista
});

ruta.get("/editarProducto/:id", async (req, res) => {
    try {
        const productoBD = new ProductoBD();
        const producto = await productoBD.productoId(req.params.id);
        res.render("editarProducto", { producto });
    } catch (error) {
        console.error(error);
    }
});

ruta.post("/editarProducto", async (req, res) => {
    try {
        const productoBD = new ProductoBD();
        await productoBD.editarProducto(req.body);
        console.log("Producto editado correctamente");
        res.redirect("/productos");
    } catch {
        console.error("Error al editar Producto");
    }
});

ruta.get("/borrarProducto/:id", async (req, res) => {
    try {
        const productoBD = new ProductoBD();
        await productoBD.borrarProducto(req.params.idusariosP);
        res.redirect("/productos");
    } catch (error) {
        console.log(error);
    }
});

module.exports = ruta;