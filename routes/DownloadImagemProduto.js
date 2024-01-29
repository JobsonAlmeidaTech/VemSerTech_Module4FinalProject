const express = require("express")
const routeDownloadImagemProduto = express.Router()
const Book = require("../models/Book")
const path = require("path")

routeDownloadImagemProduto.get("/downloadImagemProduto", async (req, res)=>{

    const {ISBN} = req.body

    if(!ISBN){
        return  res.status(422).json({
                    msg: "O ISBN para a busca não pode ser nulo!"
                })
    }

    try{
        var recoveredBooks = await Book.find({ISBN})
    }
    catch{
        return res.status(500).json({msg: "Aconteceu um erro no servidor ao tentar editar o usuário. Tente mais tarde!"})
    }

    if(recoveredBooks.length===0){
        return res.status(422).json({
            msg: `Nehum livro com ISBN ${ISBN} cadastrado no sistema. Utilize outro ISBN.`
        })
    }

    for(let book of recoveredBooks){        
        if(book.ISBN === ISBN){
            // res.status(200).json({msg: "Download realizado com sucesso."})
            console.log(path.join(__dirname, "/uploads", book.photoName))
            return res.download(path.join(__dirname, "../", "/uploads", book.photoName))
        }
    }

})

module.exports = routeDownloadImagemProduto