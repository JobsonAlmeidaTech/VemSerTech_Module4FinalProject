const express = require("express")
const routeEditarProduto = express.Router()
const checkAuthentication = require("../passports/checkAuthentication")
const jwt = require("jsonwebtoken")
const Book = require("../models/Book")
const fs = require("fs")
const path = require("path")
const upload =  require("../configurations/MulterConfigurations") 

routeEditarProduto.put("/editarProduto", checkAuthentication, upload.single("photo"), async (req, res)=>{

    const {ISBN, newTitle, newCategory, NewISBN} = req.body

    //Getting the user ID of the already verified token
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    const decoded = jwt.decode(token)
    const userId = decoded.id

    // Verifying if the user has the product
    const recoveredBook = await Book.findOne({ISBN: ISBN, userId: userId })

    if(!recoveredBook){

        fs.unlink(path.join(__dirname, "../", "/uploads", req.file.filename), function(error){
            if(error){
                console.log(`Erro ao deletar o arquivo ${req.filename} da pasta uploads`) 
            }
        })

        return res.status(422).json({
            msg: `O usuário não possui o livro com ISBN ${ISBN} cadastrado no sistema. Utilize outro ISBN.`
        })
    }
    
    try{

        //Reading new product's properties
        if(newTitle)    recoveredBook.title = newTitle
        if(newCategory) recoveredBook.category = newCategory
        if(NewISBN)     recoveredBook.ISBN = NewISBN
        if(req.file)    {            
            var oldPhotoName = recoveredBook.photoName            
            recoveredBook.photoName = req.file.filename
        } 
        
        //Updating product in the server
        await recoveredBook.save()
        
        //Deleting the old photo from uploads folder
        fs.unlink(path.join(__dirname, "../", "/uploads", oldPhotoName), function(error){
            if(error){
                console.log("Produto editado no banco de dados, mas a deleção da imagem antiga na pasta uploads falhou. Mensagem de erro: ", error.message)
            }
        })
    
        res.status(201).json({
            msg: "Produto editado com sucesso!",
        })
     
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg: "Aconteceu um erro no servidor ao tentar editar o usuário. Tente mais tarde!"})
    }
   
})

module.exports = routeEditarProduto