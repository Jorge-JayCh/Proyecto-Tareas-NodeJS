require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList 
} = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

// console.clear();

const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) {
        //Cargar las tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        // console.log( { opt });
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                // console.log( desc );
                tareas.crearTarea(desc);
                break;
            case '2':
                // console.log( tareas.listadoArr );
                tareas.listarCompleto();
                break;
            case '3':
                // console.log( tareas.listadoArr );
                tareas.listarCompletadosPendientes(true);
                break;
            case '4':
                // console.log( tareas.listadoArr );
                tareas.listarCompletadosPendientes(false);
                break;
            case '5':
                //Completado || Pendientes
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                // console.log(ids);
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if ( id !== '0' ) {
                    //Realizar confirmacion
                    const ok = await confirmar('¿Estas Seguro?');
                    // console.log({ ok });
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea Borrada');
                    }
                }
                break;
            default:
                break;
        }

        guardarDB( tareas.listadoArr );

        // const tarea = new Tarea('Comprar comida');
        // tareas._listado[tarea.id] = tarea;
        // console.log(tareas);

        await pausa();
    } while ( opt !== '0');

}

main();
