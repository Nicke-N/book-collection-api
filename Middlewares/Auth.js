const jwt = require('jsonwebtoken')

module.exports = {

    admin: (req, res, next) => {

        if (!req.headers.token) return res.sendStatus(401)

        const token = req.headers.token.replace('Bearer ', '')

        try {
            const payload = jwt.verify(token, process.env.SECRET)
            req.user = payload
            next()
        } catch (error) { 
           
            console.log(error)
            res.sendStatus(401)
        }
        
    }
}