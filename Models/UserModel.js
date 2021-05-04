const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
})

const users = mongoose.model('user', userSchema)

module.exports = {

    async getUserDetails (username) {
        const theUser = username ? username : 'nicke123'

        try {
            const user = await users.findOne({username: theUser})
            // return { name: user.name, description: user.description, email: user.email }
    
            return user
        } catch (error) {
            return error
        }
    },

    async registerUser (userInfo) {
    
        try {
            
            await bcrypt.hash(userInfo.password, 10, async (error, hashedPassword) => {
          
                try {
                    
                    userInfo.password = hashedPassword

                    const user = new users(userInfo).save(err => {
        
                        if (err) return err
                        return `User was added`
                    })
                    
                } catch (err) {
                    return err
                }
            })     
            
        } catch (error) {
            return error
        }
    },

    async userExists (email) {

        try {
            const user = await users.findOne({email: email})
            
            if(user) return true
            return false
            
        } catch (error) {
            return error
        }
    },

    async loginUser (username, password) {

        try {
            const user = await findUser(username)

            if(user) {

                await bcrypt.compare(password, user.password, async (err, result) => {
                    if (err) console.log(err)
                    if(result) {
  
                        const token = await jwt.sign(user.toJSON(), process.env.SECRET)
                        const response = {token: token, msg: 'Logged in successfully!'}
                        console.log('model')
                        console.log(response)
                        return response // {token: token, msg: 'Logged in successfully!'}
                    } else {
                        
                        return 'Wrong password!'
                    }
                })
            } else {
                return "Username doesn't exist!"
            }

        } catch (error) {
            return error
        }
    },

    async editUser (userID, user) {

        try {
            
            users.findByIdAndUpdate(
                userID,
                user,
                (err, result) => {
                    if (err) return err
                    return result
                }
            )

        } catch (error) {
            return error
        }
    },

    async deleteUser (userID) {

        try {
            
            users.findByIdAndRemove(
                userID,
                (err, result) => {
                    if (err) console.log(err)
                    return `User was deleted!`
                }
            )

        } catch (error) {
            return error
        }
    }

}


const findUser = async (username) => {

    const user = await users.findOne({username: username})

    if(user) return user
    return null
}