const fs = require('fs');

class Personajes{

    constructor() {
        this.urlApi = 'https://thronesapi.com/api/v2/Characters';
    }

    async buscarPersonaje(fullName) {
        try {
            const response = await fetch(this.urlApi);
            if (!response.ok){ 
                throw new Error('Error ' + response.status);
            }
            const datos = await response.json();
            const personaje = datos.find(personaje => personaje.fullName === fullName);
            if (personaje) {
                console.log(personaje);
            } else {
                console.log('Personaje no encontrado');
            }
        } catch(error) {
            console.log('error ', error);
        }
    }
    
    
    async mostrarPersonajes() {
        try{
            const response = await fetch(this.urlApi);
            if (!response.ok){ 
                throw new Error('Error ' + response.status)
            } 
            const datos = await response.json();
            return datos;
        }catch(error){
            console.log('error ', error);
            return null;
        }
    }
    
    async guardarPersonajes() {
        const personajes = await this.mostrarPersonajes();
        fs.writeFileSync('./personajes.json', JSON.stringify(personajes, null, 2));
    }
    
    mostrarFamilia(familia) {
        const datos = fs.readFileSync('personajes.json');
        const personajes = JSON.parse(datos);
        const familiaFiltrada = personajes.filter(personaje => personaje.family === familia);
        console.log(familiaFiltrada);
    }
    
    AgregarPersonaje(nuevo) {
        const datos = fs.readFileSync('personajes.json');
        const personajes = JSON.parse(datos);
        const ultimoId = personajes[personajes.length - 1].id;
        nuevo.id = ultimoId + 1;
        personajes.push(nuevo);
        fs.writeFileSync('personajes.json', JSON.stringify(personajes, null, 2));
    }
    
    eliminarPersonajePorID(idEliminar) {
        const datos = fs.readFileSync('personajes.json');
        const personajes = JSON.parse(datos);
        const personajesID = personajes.filter(personaje => personaje.id <= idEliminar);
        fs.writeFileSync('personajes.json', JSON.stringify(personajesID, null, 2));
    }
}

module.exports = Personajes;