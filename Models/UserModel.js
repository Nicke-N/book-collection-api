const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        default: 'https://lh3.googleusercontent.com/proxy/MmO1h4JozCQtk_2pBKQJk2Jg5h9DMy6Fhlc-GG96AEkAYlitonnAoOWASpyfdecxMGWsP_vMoTade5b6ZN0nnb6vXCUQEgbDxeGkuo6Ira_UlRu3o0vE0Iywrq0BkysMCSsdlac7ToJ-SJftQAN_z04KXB7P8ejqx'
    },
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
    instagram: {
        type: String,
        default: 'None'
    },
    goodReads: {
        type: String,
        default: 'None'
    },
    description: {
        type: String,
        default: 'None'
    },
})

const users = mongoose.model('user', userSchema)

module.exports = {

    async getUserDetails (username) {

        const theUsername = typeof username === 'object' ? username.username : username

        try {
            const user = await users.findOne({username: theUsername})

            if (typeof username !== 'object') {
  
                return { image: user.image, name: user.name, email: user.email, description: user.description, instagram: user.instagram, goodReads: user.goodReads, }
            } else {
     
                return user
            }
            
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
                        return "User was added"
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

                const validPassword = await bcrypt.compare(password, user.password)

                if(validPassword) {

                    const token = jwt.sign(user.toJSON(), process.env.SECRET)
                   
                    return token
                } else {
                    return 'Wrong password!'
                }

            } else {
                return "Username doesn't exist!"
            }

        } catch (error) {
            return error
        }
    },

    async editUser (userID, user) {

        try {
            if (user.oldPassword && user.password) {
                const existingUser = await findUser(user.username)
                if (existingUser) {
                    
                    const validPassword = await bcrypt.compare(user.oldPassword, existingUser.password)
    
                    if (validPassword) {
                        var details = {}
    
                        Object.entries(user).map((element) => element[0] !== 'oldPassword' ? details[element[0]] = element[1] : null)
                        const hashedPassword =  await bcrypt.hash(user.password, 10)
                        details.password = hashedPassword
                        
                        users.findByIdAndUpdate(
                            userID,
                            details,
                            (err, result) => {
                                if (err) return err
                                return result
                            }
                        )
                        
                    }
    
                }
            } else {
                users.findByIdAndUpdate(
                    userID,
                    user,
                    (err, result) => {
                        if (err) return err
                        return result
                    }
                )
            }
                    
            
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