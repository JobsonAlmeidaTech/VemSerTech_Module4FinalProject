const express = require("express")
const routeEditarProduto = express.Router()
const checkAuthentication = require("../passports/checkAuthentication")
const jwt = require("jsonwebtoken")
const Book = require("../models/Book")
const fs = require("fs")
const path = require("path")
const upload =  require("../configurations/MulterConfigurations") 

routeEditarProduto.post("/editarProduto", checkAuthentication, upload.single("photo"), async (req, res)=>{

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

    //Updating product
    if(newTitle)    recoveredBook.title = newTitle
    if(newCategory) recoveredBook.category = newCategory
    if(NewISBN)     recoveredBook.ISBN = NewISBN
    if(req.file) {
        //Deleting the old photo from uploads folder
        fs.unlink(path.join(__dirname, "../", "/uploads", recoveredBook.photoName), function(error){
        if(error){
            console.log(`Erro ao deletar o arquivo ${req.filename} da pasta uploads`) 
        }})

        recoveredBook.photoName = req.file.filename 
    }

    try{

        await recoveredBook.save()  
    
        res.status(201).json({
            msg: "Livro cadastrado com sucesso!",
        })
     
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg: "Aconteceu um erro no servidor ao tentar criar o usuário. Tente mais tarde!"})
    }
   
})

module.exports = routeEditarProduto