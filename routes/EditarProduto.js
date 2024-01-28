const express = require("express")
const checkAuthentication = require("../passports/checkAuthentication")
const routeEditarProduto = express.Router()

routeEditarProduto.put("/editarProduto", checkAuthentication, (req, res)=>{

    

})

module.exports = routeEditarProduto