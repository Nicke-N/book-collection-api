var chai = require('chai'),
chaiHttp = require('chai-http')
const { request, expect } = chai
const app = require('../app')
const db = require('../Database/db')
chai.use(chaiHttp)

const userModel = require('../Models/UserModel')


// describe('This test will confirm the users model is working as expected', async function () {

//     beforeEach( async function () {
//         await db.connect()

//         const user = {
//             username: 'nicke',
//             password: 'nicke',
//             name: 'nicke',
//             email: 'Nicke@nicke.se',
//             description: 'nickenickenicke'
//         }

//         await userModel.registerUser(user)

//         const token = await userModel.loginUser({username: user.username, password: user.password})
//         console.log(token)
//     })

// })