import jwt from 'jsonwebtoken'

const cookieValidator = (req, res, next) => {

    const token = req.cookies.KawaiifyToken

    if(!token) {
        res.status(401).send("Sem token autorizado!")
        return
    }    

    try {
        jwt.verify(token, "jwtsuperseguro")
    } catch(error) {
        console.log(error)
        res.status(401).send("Ação não autorizada!")
    }

    next()

}

export default cookieValidator