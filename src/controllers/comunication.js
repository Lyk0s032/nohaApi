const { plan, comunication } = require('../db/db');

module.exports = {
    // Creamos el registro de la comunicacion
    async newClient(req, res){
        try{
            const {nameUser, phoneUser, userCase} = req.body; 
            // Validamos que los datos entren correctamente
            if(!nameUser || !phoneUser) return res.status(501).json({msg: 'Los parametros no son validos.'});

            // Avanzamos...
            // Buscamos si hay peticiones pendientes.

            const searchPeticion = await comunication.findOne({
                where: {
                    phoneUser,
                    state: 'active'
                }
            }).catch(err => {
                console.log(err);
                return null;
            });

            // Si existe una respuesta. 
            if(searchPeticion) return res.status(200).json({msg: 'Ya hay una peticion de comunicacion abierta.'});
         
            if(userCase){
                // Creamos la solicitud a caso especifico
                const createPeticion = await comunication.create({
                    nameUser,
                    phoneUser,
                    userCase,
                    state: 'active'
                }).catch(err => {
                    console.log(err); 
                    return null;
                });

                // Validos que sea con exito, sino, Enviamos respuesta 401. Not created
                if(!createPeticion) return res.status(401).json({msg: 'Lo sentimos, no hemos podido crear esto.'})

                // Caso contrario, enviamos respuesta 201. ¡Exito!
                return res.status(201).json(createPeticion);
            }
            
            // Creamos la solicitud a caso especifico
            const createPeticion = await comunication.create({
                nameUser,
                phoneUser,
                userCase: 'default',
                state: 'active'
            }).catch(err => {
                console.log(err); 
                return null;
            });

            // Validos que sea con exito, sino, Enviamos respuesta 401. Not created
            if(!createPeticion) return res.status(401).json({msg: 'Lo sentimos, no hemos podido crear esto.'})

            // Caso contrario, enviamos respuesta 201. ¡Exito!
            return res.status(201).json(createPeticion);
            
        }catch(err){
            console.log(err);
            res.status(500).json({msg: 'Ha ocurrido un error en la principal de esta funcion'});
        }
    },


    async changeStateNewClient(req, res){
        try{
            const { newState, userPhone } = req.body;
            // Validamos que los parametros entre correctamente.
            if(!userPhone || !newState) return res.status(501).json({msg: 'Los parametros no son validos.'});
        
            // Caso contrario, avanzamos.
            
        }catch(err){
            console.log(err);
            res.status(500).json({msg: 'Ha ocurrido un error al cambiar la principal.'});
        }
    }
    
}