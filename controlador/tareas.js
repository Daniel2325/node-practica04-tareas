const fs = require('fs');

let tareasPorHacer = [];

const cargarDB = () => {
    try {
        tareasPorHacer = require('../modelo/data.json');
    } catch (error) {
        tareasPorHacer = [];
    }
}

const guardarDB = () => {
    let data = JSON.stringify(tareasPorHacer);
    fs.writeFile('modelo/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar la data', err);
    });
}

const crear = (descripcion) => {
    cargarDB();
    let tarea = {
        descripcion,
        completado: false
    }
    tareasPorHacer.push(tarea);
    guardarDB();
    return tarea;
}

const getLista = () => {
    cargarDB();
    return tareasPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = tareasPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        tareasPorHacer[index].completado = completado;
        guardarDB();
        confin = "La actualizacion se realizo con exito"
        return confin;
    }

    return false;
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = tareasPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (tareasPorHacer.length === nuevoListado.length) {
        elimi = "La tarea no pudo ser eliminada porque no existe"
        return elimi;
    } else {
        tareasPorHacer = nuevoListado;
        guardarDB();
        eli = "La tarea pudo ser eliminada exitosamente"
        return eli;
    }
}

module.exports = {
    crear,
    getLista,
    actualizar,
    borrar
}