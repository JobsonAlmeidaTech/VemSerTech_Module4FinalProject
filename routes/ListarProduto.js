const express = require("express")
const routeListarProduto = express.Router()
const Book = require("../models/Book")

routeListarProduto.post("/listarProduto", async (req, res)=>{

    const {category, userId} = req.body

    if(!category && !userId){
        return  res.status(422).json({
                    msg: "A categoria do produto ou o id do usuário de ser informado para a busca ser realizada."
                })
    }

    if(!category){
        var recoveredBooks = await Book.find({userId})
    }
    else if(!userId){
        var recoveredBooks = await Book.find({category})
    }
    else{
        var recoveredBooks = await Book.find({category, userId})
    }

    if(recoveredBooks.length===0){
        return res.status(422).json({
            msg: "Nenhum produto encontrado.",
            produtosEncontrados: recoveredBooks
        })
    }

    res.status(201).json({
        msg: "Produtos encontrados",
        produtosEncontrados: recoveredBooks
    })
 
})

module.exports = routeListarProduto