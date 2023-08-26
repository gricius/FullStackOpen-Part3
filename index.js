require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

// Morgan format string for POST requests 
const customFormat = ':method :url :status :res[content-length] - :response-time ms :req-body';

// Define a token for the request body
morgan.token('req-body', (req) => JSON.stringify(req.body));

app.use(morgan(customFormat)); 
const cors = require('cors')
app.use(cors())

app.use(express.json());

app.use(express.static('build'))

let phonebook = [
];

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
        
    });
})


app.get('/info', (req, res) => {
   Person.countDocuments({})
    .then(count => {
        const date = new Date();
        res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
});
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        }
    );
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(err => {
            console.error(err);
            res.status(400).send({ error: 'malformatted id' });
        }
    );
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        res.json(savedPerson);
        return res.status(201).end();
    });
});
    


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});