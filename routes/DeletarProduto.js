const express = require("express")
const routeDeletarProduto = express.Router()
const checkAuthentication = require("../passports/checkAuthentication")
const jwt = require("jsonwebtoken")
const Book = require("../models/Book")
const fs = require("fs")
const path = require("path")

routeDeletarProduto.delete("/deletarProduto", checkAuthentication, async (req, res)=>{

    const {ISBN} = req.body

    //Getting the user ID of the already verified token
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    const decoded = jwt.decode(token)
    const userId = decoded.id

    // Verifying if the user has the product
    const recoveredBook = await Book.findOne({ISBN: ISBN, userId: userId })

    if(!recoveredBook){

        return res.status(422).json({
            msg: `O usuário não possui o livro com ISBN ${ISBN} cadastrado no sistema. Utilize outro ISBN.`
        })
    }

    try{

        //Deleting the product in the server
        await Book.findOneAndDelete({ISBN: ISBN, userId: userId })

        //Deleting the old photo from uploads folder
        fs.unlink(path.join(__dirname, "../", "/uploads", recoveredBook.photoName), function(error){
            if(error){
                console.log("Produto deletado no banco de dados, mas a deleção da imagem na pasta uploads falhou. Mensagem de erro: ", error.message)
            }
        })

        res.status(201).json({
            msg: "Produto deletado com sucesso!"
        })

    }
    catch(error){

        console.log(error)
        return res.status(500).json({msg: "Aconteceu um erro no servidor ao tentar deletar o produto. Tente mais tarde!"})

    }

})

module.exports = routeDeletarProduto