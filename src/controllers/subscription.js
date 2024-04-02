const { subscription, comunication } = require('../db/db');

module.exports = {
    // Correos de subscripcion
    async newSubscription (req, res){
        try{
            const { email } = req.body;
            // Validamos que los parametros entren correctamente
            if(!email) return res.status(501).json({msg: 'Los parametros no son validos.'});
        
            // Caso contrario, avanzamos...
            // Revisamos si ya existe un registro con ese email
            const searchEmail = await subscription.findOne({
                where: {
                    email,
                    state: 'active'
                }
            }).catch(err => {
                console.log(err);
                return null
            });
            // Si existe, enviamos este mensaje con estado 200.
            if(searchEmail) return res.status(200).json({msg: 'Este email ya esta registrado.'});

            // Caso contrario, avanzamos...
            // Creamos el registro
            const susbscribe = await subscription.create({
                email,
                state: 'active'
            }).catch(err => {
                console.log(err);
                return null;
            });

            if(!susbscribe) return res.status(502).json({msg: 'Ha ocurrido un error, intentalo mas tarde.'});
            
            // Caso contrario, avanzamos...
            // Enviamos respuesta

            res.status(201).json(susbscribe);

        }catch(err){
            console.log(err);
            res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
        }
    }

}