const Personajes = require('./punto1');

let personajes = new Personajes();

//Punto 1
personajes.buscarPersonaje('Ned Stark');

//Punto 2
personajes.mostrarPersonajes().then(datos => console.log(datos));

//Punto 3
personajes.guardarPersonajes();

//Punto 4-a
personajes.mostrarFamilia('House Stark');

//Punto 4-b
const nuevoPersonaje = {
    firstName: "Aemod",
    lastName: "Targaryen",
    fullName: 'Aemod Targaryen',
    family: 'House Targaryen',
    title: 'Caballero Dragón',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXgqGII6_dwZiJafSGrEGvHpsnPL3MH0jGA&s'
};

personajes.AgregarPersonaje(nuevoPersonaje);

//Punto 4-c
personajes.eliminarPersonajePorID(25);