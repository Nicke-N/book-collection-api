const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
require('dotenv').config();

var db = {
        getUri : async () => process.env.DB_CONNECTION
    }

async function connect() {
    let uri = await db.getUri()
 
    await mongoose.connect(
        uri, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
    if (!mongoose.connection) {
        throw new MongooseError("Could not connect to database!")
    } else {
        console.log('Connected to DB')
    }
}

async function disconnect() {
    try {
        await mongoose.connection.close(() => {
            console.log('Database connection closed')
        });
        if(process.env.ENVIRONMENT == 'TEST'){
            await db.stop()
        }
    } catch (error) {
        console.error(error)
    }
}


module.exports = { connect, disconnect }