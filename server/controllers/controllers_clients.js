import bcryptjs from 'bcryptjs'

import { User } from '../db.js'

const validGenders = ['Homem', 'Mulher', 'Não Binário', 'Outro', 'Prefiro Não Dizer']

const createClient = async (req, res) => {

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

    if(!dados.email || !dados.password || !dados.username || !dados.birthday || !dados.gender) { 
        console.log("Dados insuficientes para criar usuário!")
        res.status(406).send("Todos os campos devem ser enviados!")
        return
    }

    if(await User.findOne({where: {username: dados.username}})) {
        console.log("Username indisponível!")
        res.status(409).send("Username indisponível!")
        return
    }

    if(await User.findOne({where: {email: dados.email}})) {
        console.log("Email já utilizado!")
        res.status(409).send("Email já utilizado!")
        return
    }

    if(!validGenders.includes(dados.gender)) {
        console.log("Opção de gênero inexistente!")
        res.status(400).send("Opção de gênero não existe!")
        return
    }

    User.create({
        username: dados.username,
        email: dados.email,
        password: bcryptjs.hashSync(dados.password, 10),
        birthday: dados.birthday,
        gender: dados.gender
    })

    console.log("Usuário criado!")
    res.status(201).send("Usuário criado com sucesso!")
    return

}

const deleteClient = async (req, res) => {

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
        console.log("Dados insuficientes para deletar usuário!")
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

    User.destroy({ where: {username: dados.username } })
    console.log("Usuário deletado!")
    res.status(201).send("Usuário deletado com sucesso!")

}

export default { createClient, deleteClient }