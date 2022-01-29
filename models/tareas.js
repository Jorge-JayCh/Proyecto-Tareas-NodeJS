require ('colors');
const Tarea = require('./tarea');
class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea ( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray ( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {   
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarCompleto () {
        const listado = this.listadoArr;
        console.log();
        listado.forEach( ( tarea, i ) => {
            const indice = `${ i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            console.log(`${indice}  ${desc}  ::  ${estado}`);
        });
    }

    listarCompletadosPendientes ( completadas = true ) {

        const listado = this.listadoArr;
        let contador = 0;
        console.log();
        listado.forEach( ( tarea ) => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                //Mostrar Completadas
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green }  ${ desc }  ::  ${ completadoEn.green }`);
                }
            } else {    
                //Mostrar Pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green }  ${ desc }  ::  ${ estado }`);
                }
            }
        });

    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

            this.listadoArr.forEach( tarea => {
                if ( !ids.includes(tarea.id) ) {
                    this._listado[tarea.id].completadoEn = null;
                }
            });
        });

    }
}

module.exports = Tareas;