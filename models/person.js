/*
establish connection to mongodb database with const url = process.env.MONGODB_URI
create a schema for the phonebook entries containing fields name and number
transform the object returned by Mongoose with toJSON method delete the _id and __v properties from the returned object with transform method
export the mongoose model
*/

// Path: models/person.js
// Compare this snippet from index.js:
const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)

    .then(result => {
        console.log('connected to MongoDB')
    }
    )
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    }
    )

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3, // Minimum length of the name
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}
)

module.exports = mongoose.model('Person', phonebookSchema)

