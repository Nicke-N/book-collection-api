var chai = require('chai'),
chaiHttp = require('chai-http')
const { expect } = chai
const app = require('../app')
const db = require('../Database/db')
chai.use(chaiHttp)

const userModel = require('../Models/UserModel')


describe('This test will confirm the users model is working as expected', async () => {

    beforeEach( async function () {
        await db.connect()

        const user = {
            username: 'nicke',
            password: 'nicke',
            name: 'nicke',
            email: 'Nick1e@nicke.se',
            description: 'nickenickenicke'
        }


        this.currentTest.token = await userModel.loginUser(user.username, user.password)

    })

    it ('should add a user to DB', function (done) {

        const user = {
                username: 'nicke1',
                password: 'nicke',
                name: 'nicke',
                email: 'Nicke1@nicke.se',
                description: 'nickenickenicke'
        }
        const post = JSON.stringify(user)
       
        chai.request(app)
        .post(`/user/register`)
        .set('Content-Type', 'application/json')
        .send(post)
        .end((err, res) => {
    
            expect(res.text).to.equal('User was created!')
            expect(res).to.have.status(200)
            done()
            
        })

    })

    it ('should login an user', function (done) {

        const user = {
            username: 'nicke1',
            password: 'nicke'
        }



        const loginInfo = JSON.stringify(user)

        chai.request(app)
        .post('/user/login')
        .set('Content-Type', 'application/json')
        .send(loginInfo)
        .end((err, res) => {
  
            expect((res.body).charAt(0)).to.equal('e')
            expect(res).to.have.status(200)
            
            done()
        })
    })

    it ('should fail to update an user', function (done) {

        const user = {
            username: 'nicke123'
        }
       
        const patch = JSON.stringify(user)
        setTimeout( async function () {
            const userID = await userModel.getUserDetails('nicke')

            chai.request(app)
            .patch(`/user/${userID._id}`)
            .set('Content-Type', 'application/json')
            .send(patch)
            .end((err, res) => {

                expect(res.text).to.equal('Unauthorized')
                expect(res).to.have.status(401)
                done()

            })
        }, 0);
        

    })

    it ('should update an user', function (done) {

        const user = {
            username: 'nicke123'
        }
       
        const patch = JSON.stringify(user)
        const token = this.test.token
        setTimeout( async function () {
            const userID = await userModel.getUserDetails('nicke1')
          
            chai.request(app)
            .patch(`/user/${userID._id}`)
            .set('Content-Type', 'application/json')
            .set('token', `Bearer ${token}`)
            .send(patch)
            .end((err, res) => {

                expect(res.text).to.equal('User was updated!')
                expect(res).to.have.status(200)
                done()

            })
        }, 0);
        

    })

    it ('should get user details', function (done) {


        chai.request(app)
        .get(`/user/`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
  
            expect(res).to.have.status(200)
            expect(res.body.username).to.equal('nicke123')
            done()
            
        })

    })

    

    it ('should fail to delete an user', function (done) {

        
        setTimeout(async function () {
            const userID = await userModel.getUserDetails('nicke')

            chai.request(app)
            .delete(`/user/${userID._id}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {

                expect(res.text).to.equal('Unauthorized')
                expect(res).to.have.status(401)
                done()
            
        })
        }, 0);
        

    })

    it ('should delete an user', function (done) {

        const token = this.test.token
        setTimeout(async function () {
            const userID = await userModel.getUserDetails('nicke123')

            chai.request(app)
            .delete(`/user/${userID._id}`)
            .set('Content-Type', 'application/json')
            .set('token', `Bearer ${token}`)
            .end((err, res) => {

                expect(res.text).to.equal('User was deleted!')
                expect(res).to.have.status(200)
                done()
            
        })
        }, 0);
        

    })

 
})
