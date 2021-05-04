var chai = require('chai'),
chaiHttp = require('chai-http')
const { expect } = chai
const app = require('../app')
const db = require('../Database/db')
chai.use(chaiHttp)

const userModel = require('../Models/UserModel')
const bookModel = require('../Models/BookModel')

describe('This test will confirm the book model is working as expected', async () => {

    beforeEach( async function () {
        await db.connect()

        const user = {
            username: 'nicke',
            password: 'nicke',
            name: 'nicke',
            email: 'Nick1e@nicke.se',
            description: 'nickenickenicke'
        }
        
        // await userModel.registerUser(user)
        this.currentTest.token = await userModel.loginUser(user.username, user.password)
        const books = await bookModel.getCollection()
        this.currentTest.bookID = books[0]._id
        this.currentTest.bookTitle = books[0].title
    })

    it ('should create a book', function (done) {
        const token = this.test.token

        const book = {
            title: 'The moon',
            author: 'God',
            publisher: 'The universe'
        }

        const post = JSON.stringify(book)

        chai.request(app)
        .post(`/collection/`)
        .set('Content-Type', 'application/json')
        .set('token', `Bearer ${token}`)
        .send(post)
        .end((err, res) => {
    
            expect(res.text).to.equal('Book was added!')
            expect(res).to.have.status(200)
            done()
            
        })

    })

    it ('should fail to create a book', function (done) {

        const book = {
            title: 'The moon 5',
            author: 'God',
            publisher: 'The universe'
        }

        const post = JSON.stringify(book)

        chai.request(app)
        .post(`/collection/`)
        .set('Content-Type', 'application/json')
        .send(post)
        .end((err, res) => {
    
            expect(res.text).to.equal('Unauthorized')
            expect(res).to.have.status(401)
            done()
            
        })
    })

    it ('should get all books', function (done) {
        chai.request(app)
        .get(`/collection/`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
    
            expect(res).to.have.status(200)
            done()
            
        })
    })

    it ('should get a book', function (done) {

       
        chai.request(app)
        .get(`/collection/${this.test.bookID}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
    
            expect(res.body.title).to.equal(this.test.bookTitle)
            expect(res).to.have.status(200)
            done()
            
        })
   
    })

    it ('should rate (update) a book as owner', function (done) {

        const token = this.test.token
        const patch = {personalRating: 5, title: 'Thy book'}
        const post = JSON.stringify(patch)

        chai.request(app)
        .patch(`/collection/${this.test.bookID}`)
        .set('Content-Type', 'application/json')
        .set('token', `Bearer ${token}`)
        .send(post)
        .end((err, res) => {
    
            expect(res.text).to.equal('Book was updated!')
            expect(res).to.have.status(200)
            done()
            
        })
    })

    it ('should rate (update) a book as guest', function (done) {
 
        const patch = {personalRating: 5, title: 'Should not change'}
        const post = JSON.stringify(patch)

        chai.request(app)
        .patch(`/collection/${this.test.bookID}`)
        .set('Content-Type', 'application/json')
        .send(post)
        .end((err, res) => {
    
            expect(res.text).to.equal('Book was updated!')
            expect(res).to.have.status(200)
            done()
            
        })
    })

    it ('should fail delete a book', function (done) {

        chai.request(app)
        .delete(`/collection/${this.test.bookID}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
    
            expect(res.text).to.equal('Unauthorized')
            expect(res).to.have.status(401)
            done()
            
        })
    })

    it ('should delete a book', function (done) {
        const token = this.test.token

        chai.request(app)
        .delete(`/collection/${this.test.bookID}`)
        .set('Content-Type', 'application/json')
        .set('token', `Bearer ${token}`)
        .end((err, res) => {
    
            expect(res.text).to.equal('Book was deleted!')
            expect(res).to.have.status(200)
            done()
            
        })
    })


})