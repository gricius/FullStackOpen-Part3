const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Usage: node mongo.js <password> [name] [number]');
    process.exit(1);
}

const password = process.argv[2];
const dbName = 'phonebook';

const url = `mongodb+srv://gricius:${password}@cluster0.on17o4v.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    // List all entries in the phonebook
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    // Add a new entry to the phonebook
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    console.log('Usage: node mongo.js <password> [name] [number]');
    mongoose.connection.close();
}
