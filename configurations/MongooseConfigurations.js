//ODM Mongoose Configurations

function mongooseInit(){

    const mongoose = require("mongoose")

    mongoose.Promise = global.Promise
    const bancoNome = "ABCLivros"
    mongoose.connect(`mongodb://localhost:27017/${bancoNome}`)
    .then(()=>{
        console.log(`Conectado com sucesso ao banco de dados ${bancoNome}`)
    })
    .catch((erro)=>{
        console.log(`Houve um erro ao se conectar ao banco de dados ${bancoNome}` + erro)
    })

}

module.exports = mongooseInit
