import Express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../db.js'

const loginAuth = async (req, res) => { 

    try {
        var dados = req.body
    } catch(error) {
        res.status(500).send("Erro interno do servidor")
        console.log("Erro no servidor!")
        console.log(error)
        console.log(req.body)
        return
    }

    console.log(dados)

    if(!dados.username || !dados.password) { 
        console.log("Dados insuficientes para logar!")
        res.status(406).send("Todos os campos devem ser enviados!")
        return
    }

    let user = await User.findOne({ where: { username: dados.username } })

    if(!user) {
        console.log("Username não existe!")
        res.status(404).send("Username não encontrado!!")
        return
    }

    if(!bcryptjs.compareSync(dados.password, user.password)) {
        console.log("Senha incorreta!")
        res.status(401).send("Senha incorreta!")
        return
    }

    const token = jwt.sign(
        {
            nome: user.nome,
            email: user.email,
            _id: user.id
        },
        "jwtsuperseguro",
        { expiresIn: 1000*60*60 }
    )

    console.log(token)
    res.cookie("KawaiifyToken", token).send("Token efetuado com sucesso!")

}

const logoutAuth = async (req, res) => { 
    
    res.cookie('KawaiifyToken', 'none')
    res.send("Logout efetuado com sucesso!")

}

export default { loginAuth, logoutAuth }