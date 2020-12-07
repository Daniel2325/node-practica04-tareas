const argv = require('./config/yargs').argv;
const tareas = require('./controlador/tareas');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = tareas.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let lista = tareas.getLista();
        console.log("============== TAREAS =============".green);
        for (let tarea of lista) {
            console.log(`Desripcion: ${tarea.descripcion}`.blue);
            console.log(`Completado: ${tarea.completado}\n`.red);
        }
        console.log("===================================".green);
        break;
    case 'actualizar':
        let resp = tareas.actualizar(argv.descripcion, argv.completado);
        console.log(resp.green);
        break;
    case 'borrar':
        let borrado = tareas.borrar(argv.descripcion);
        console.log(borrado.yellow);
        break;
    default:
        console.log('Comando no reconocido');
}