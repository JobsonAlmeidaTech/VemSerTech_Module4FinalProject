const express = require("express")
const routeCadastrarProduto = express.Router()
const checkAuthentication = require("../passports/checkAuthentication")
const Book = require("../models/Book")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
const upload =  require("../configurations/MulterConfigurations") 

routeCadastrarProduto.post("/cadastrarProduto", checkAuthentication, upload.single("photo"), async (req, res) => {
 
    const {title, category, ISBN} = req.body

    //validations
    if(!title){
        deleteImageFromUploads(req)
        return res.status(422).json({msg: "O titulo é obrigatório!"})
    }
    if(!category){
        deleteImageFromUploads(req)
        return res.status(422).json({msg: "A categoria é obrigatório!"})
    }
    if(!ISBN){
        deleteImageFromUploads(req)
        return res.status(422).json({msg: "O ISBN é obrigatório!"})
    }

    if(!req.file){
        deleteImageFromUploads(req)
        return res.status(422).json({msg: "A foto obrigatória!"})
    }
    
    //Getting the user ID of the already verified token
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    const decoded = jwt.decode(token)
    const userId = decoded.id

    //checking if book is already related to the user 
    const relationExists = await Book.findOne({userId: userId, ISBN: ISBN })

    if(relationExists){ 

        deleteImageFromUploads(req)

        return res.status(422).json({msg: `O usuário já possui o livro com ISBN ${ISBN} cadastrado no sistema. Utilize outro ISBN.`})
    }

    //creating book
    const book = new Book({
        title,
        category,
        ISBN,
        photoName: req.file.filename,
        userId: userId
    })

    try{

        await book.save()
    
        res.status(201).json({
            msg: "Livro cadastrado com sucesso!",
        })
     
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg: "Aconteceu um erro no servidor ao tentar criar o usuário. Tente mais tarde!"})
    }

})

function deleteImageFromUploads(req){
    fs.unlink(path.join(__dirname, "../", "/uploads", req.file.filename), function(error){
        if(error){
            console.log(`Erro ao deletar o arquivo ${req.filename} da pasta uploads`) 
        }
    })
}

module.exports = routeCadastrarProduto