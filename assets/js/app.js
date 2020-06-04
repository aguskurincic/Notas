// Variables

const listaNotas = document.getElementById('lista-notas');

// Event Listeners

eventListeners();

function eventListeners() {
    //Cuando se envía el form
    document.querySelector('#formulario').addEventListener('submit', agregarNota);

    //Borrar notas
listaNotas.addEventListener('click', borrarNota);

    //Contenido cargado
document.addEventListener('DOMContentLoaded', localStorageListo);

}

// Funciones

// Añadir nota del form

function agregarNota(e) {
    e.preventDefault();
    //Leer valor textarea
    const nota = document.getElementById('nota').value;
    //Crear botón de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-nota';
    botonBorrar.textContent = 'X';
    //Crear elemento y añadir contenido a la lista
    const li = document.createElement('li');  
    li.innerText = nota;
    //Añade botón a la nota
    li.appendChild(botonBorrar);
    //Añade la nota a la lista
    listaNotas.appendChild(li);
    //Añadir a Local Storage
    agregarNotaLocalStorage(nota);
}

//Eliminar nota del DOM
function borrarNota(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-nota'){
        e.target.parentElement.remove();
        borrarNotaLocalStorage(e.target.parentElement.innerText);
    }
}

//Mostrar datos de LS en la lista
function localStorageListo() {
    let notas;
    notas = obtenerNotasLocalStorage();
    notas.forEach(function(nota) {
        //Crear botón de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-nota';
        botonBorrar.innerText = 'X';
        //Crear elemento y añadir contenido a la lista
        const li = document.createElement('li');  
        li.innerText = nota;
        //Añade botón a la nota
        li.appendChild(botonBorrar);
        //Añade la nota a la lista
        listaNotas.appendChild(li);
    });
}

//Agregar nota a Local Storage
function agregarNotaLocalStorage(nota) {
    let notas;
    notas = obtenerNotasLocalStorage();
    //Añadir la nueva nota
    notas.push(nota);
    //Convetir de string a array para LS
    localStorage.setItem('notas', JSON.stringify(notas));  //De json a string
}

//Comprobar que haya elementos en LS, retorna un array
function obtenerNotasLocalStorage() {
    let notas;
    //Revisamos valores LS
    if(localStorage.getItem('notas') === null) {
        notas = [];
    } else {
        notas = JSON.parse(localStorage.getItem('notas'));
    }
    return notas;
}

//Eliminar nota de LS
function borrarNotaLocalStorage(nota) {    
    let notas, notaBorrar;
    
    notaBorrar = nota.substring(0, nota.length - 1);  //Para eliminar la X final

    notas = obtenerNotasLocalStorage();

    notas.forEach(function(nota, index) {  //Index para saber la posición
        if(notaBorrar === nota) {
            notas.splice(index, 1);  //Cuantos elementos quiero eliminar del array
        }
    });
    localStorage.setItem('notas', JSON.stringify(notas));
}