var chai = require('chai'),
chaiHttp = require('chai-http')
const { request, expect } = chai
const app = require('../app')
const db = require('../Database/db')
chai.use(chaiHttp)

const userModel = require('../Models/UserModel')


describe('This test will confirm the users model is working as expected', async () => {

    beforeEach( async () => {
        await db.connect()
    })

    it ('should get all books', function (done) {
       
        chai.request(app)
        .get(`/collection/`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
       
            const length = (res.body).length
     
            expect(length).to.equal(1)
            expect(res).to.have.status(200)
            done()
        })
    })

    it ('should add a user to DB', (done) => {

        const user = {
                username: 'nicke',
                password: 'nicke',
                name: 'nicke',
                email: 'Nicke@nicke.se',
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

    it ('should update an user', (done) => {

        const user = {
            username: 'nicke123'
        }
       
        const patch = JSON.stringify(user)
        setTimeout( async () => {
            const userID = await userModel.getUserDetails('nicke')

            chai.request(app)
            .patch(`/user/${userID._id}`)
            .set('Content-Type', 'application/json')
            .send(patch)
            .end((err, res) => {

                expect(res.text).to.equal('User was updated!')
                expect(res).to.have.status(200)
                done()

            })
        }, 0);
        

    })

    it ('should get user details', (done) => {


        chai.request(app)
        .get(`/user/`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.username).to.equal('nicke123')
            done()
            
        })

    })

    it ('should login an user', (done) => {

        const user = {
            username: 'nicke123',
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

    it ('should delete an user', (done) => {

        
        setTimeout(async () => {
            const userID = await userModel.getUserDetails('nicke123')

            chai.request(app)
            .delete(`/user/${userID._id}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {

                expect(res.text).to.equal('User was deleted!')
                expect(res).to.have.status(200)
                done()
            
        })
        }, 0);
        

    })

 
})
