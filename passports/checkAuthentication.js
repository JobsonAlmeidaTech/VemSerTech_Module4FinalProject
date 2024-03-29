const jwt = require("jsonwebtoken")

function checkAuthentication(req, res, next){

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({
            msg: "Acesso negado!"
        })    
    }

    try{
        const secret = process.env.secret
        jwt.verify(token, secret)

        next()
    }
    catch(error){
        res.status(400).json({msg: "Token inválido!"})

        return
    }

    

}

module.exports = checkAuthentication
