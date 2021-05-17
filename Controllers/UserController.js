const users = require('../Models/UserModel')
const whiteList = [
    'nicke@nicke'
]
module.exports = {

    async getUserDetails (req, res, next) {

        try {
            var details
            if (req.user === 'guest') {
                details = await users.getUserDetails(req.headers.user)
            } else {
                details = await users.getUserDetails(req.user)
            }
            
            res.json(details)

        } catch (error) {
            next(error)
        }
    },

    async registerUser (req, res, next) {
        const user = req.body
        if (whiteList.includes(user.email)) {
            try {
     
                const userExists = await users.userExists(user.email)
                
                if (userExists) {
                    res.send('User exists already!')
                   
                } else {
                    await users.registerUser(user)
                    res.status(200).send('User was created!')
                }
            } catch (error) {
                next(error)
            }
        } else {
            res.send('This email in not white-listed!')
        }
       
    },

    async loginUser (req, res, next) {
        const { username, password } = req.body

        try {
            
            const login = await users.loginUser(username, password)
            res.json(login)
  
        } catch (error) {
            next(error)
        }

    },

    async editUser (req, res, next) {

        const user = req.body

        const userID = req.params.userID
        try {
            await users.editUser(userID, user)
            res.status(200).send('User was updated!')
        } catch (error) {
            next(error)
        }

    },

    async deleteUser (req, res, next) {

        const userID = req.params.userID

        try {

            await users.deleteUser(userID)
            res.status(200).send('User was deleted!')
            
        } catch (error) {
            next(error)
        }

    },
    
}