const express = require("express")
const routeCadastrarUsuario = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
 
routeCadastrarUsuario.post("/cadastrarUsuario", async (req, res) => {

    const {name, email, password, confirmpassword} = req.body
 
    //validations
    if(!name){
        return res.status(422).json({msg: "O nome é obrigatório!"})
    }
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório!"})
    }
    if(!password){
        return res.status(422).json({msg: "A senha é obrigatória!"})
    }
    
    if(password !== confirmpassword){
        return res.status(422).json({msg: "As senhas não conferem!"})
    }

    //checking if user exists
    const userExists = await User.findOne({email: email})

    if(userExists){
        return res.status(422).json({msg: "Usuário já existente no sistema! Utilize outro email!"})
    }

    //creating password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password,salt)

    //creating a user ID
    let idUser 
    await User.find().count()
    .then((numberOfUsers)=>{
        idUser =  numberOfUsers + 1
        console.log("idUser then: "+ idUser)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).json({msg: "Aconteceu um erro no servidor ao gerar o ID do usuário. Tente mais tarde!"})
    })

    console.log("idUser out: "+ idUser)
    
    //creating a user
    const user = new User({
        id: idUser,
        name,
        email,
        password : passwordHash
    })

    try{

        await user.save()
    
        res.status(201).json({
            msg: "Usuario criado com sucesso!",
            id: idUser
        })
     
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg: "Aconteceu um erro no servidor ao tentar criar o usuário. Tente mais tarde!"})
    }

})

module.exports = routeCadastrarUsuario