export class ServiceProducto{
    static async obtenerProductos(){
        /*   const response = await fetch(`https://genium-backend.herokuapp.com/eventos`);
        // response.ok devuelve true o false
        // dependiendo del exito de la operacion
        if (!response.ok) {
            //lanzamos error si no se pudo
            throw new Error('No se pudo obtener todos los eventos')
        } else {
            // devolvemos la consulta
            const eventosJson = await response.json();
            const eventos = eventosJson.map(evento => {
                return(
                    //constructor(nu_evnt, no_evnt, qt_pers, qt_hrs, desc_evnt, ubic, fh_inicio, fh_fin, url_evnt, fg_vig)
                    new Evento(
                        evento.NU_EVNT, 
                        evento.NO_EVNT, 
                        evento.QT_PERS, 
                        evento.QT_HRS,
                        evento.DESC_EVENT,
                        evento.UBIC,
                        evento.FH_INICIO,
                        evento.FH_FIN,
                        evento.URL_EVNT,
                        evento.FG_VIG,
                        evento.URL_FOTO
                    )
                )
            })
            return eventos
        }*/
    }
}