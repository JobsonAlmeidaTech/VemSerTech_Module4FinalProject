const express = require("express")

const app = express()

//Rota pública de bem vindo.
app.get("/", (req, res)=>{
    res.status(200).json({
        msg: "Bem vindo à nossa API! Nesta API são disponibilizados dados referentes ao marketplace ABC Livros."
    })
}) 


//Levantando o servidor na porta PORT
const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`API rodando na porta ${PORT}`)
} )