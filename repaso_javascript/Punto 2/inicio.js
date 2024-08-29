const Productos = require('./punto2');

let productos = new Productos();


console.log("-------------------Punto 1---------------------")
productos.buscarProductos()

console.log("-------------------Punto 2---------------------")
productos.buscarCantidadProductos(5)

console.log("-------------------Punto 3---------------------")
productos.agregarProducto('test product', 13.5, 'lorem ipsum set', 'https://i.pravatar.cc', 'electronic');

console.log("-------------------Punto 4---------------------")
productos.buscarProducto(6)

console.log("-------------------Punto 5---------------------")
productos.eliminarProducto(3);