const fs = require('fs');

class Productos{
    constructor(){
        this.urlApi = "https://fakestoreapi.com/products"
    }

    async buscarProductos(){
        try{
            const response = await fetch(this.urlApi);
            if(!response.ok){
                throw new Error("error", response.status)
            }
            const datos = await response.json();
            console.log(datos);
        }catch{
            console.log(error);
        }
    }
    
    async buscarCantidadProductos(limite){
        try{
            const response = await fetch(this.urlApi + "?limit=" + limite);
            if(!response.ok){
                throw new Error("error", response.status)
            }
            const datos = await response.json();
            console.log(datos);
        }catch{
            console.log(error);
        }
    }
        
    async agregarProducto(titulo, precio, descripcion, imagen, categoria){
        try{
            const response = await fetch(this.urlApi, {
                method:"POST",
                body:JSON.stringify({title: titulo,
                    price: precio,
                    description: descripcion,
                    image: imagen,
                    category: categoria})
            });
            if(!response.ok){
                throw new Error("error", response.status)
            }
            const datos = await response.json();
            console.log(datos);
        }catch{
            console.log(error);
        }
    }
    
    async buscarProducto(id){
        try{
            const response = await fetch(this.urlApi + "/" + id);
            if(!response.ok){
                throw new Error("error", response.status)
            }
            const datos = await response.json();
            console.log(datos);
        }catch{
            console.log(error);
        }
    }
    
       
    async eliminarProducto(id){
        try{
            const response = await fetch(this.urlApi + "/" + id, {
                method:"DELETE"
            });
            if(!response.ok){
                throw new Error("error", response.status)
            }
            const datos = await response.json();
            console.log(datos);
        }catch{
            console.log(error);
        }
    }
    
}

module.exports = Productos;