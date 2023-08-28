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
const cors = require('cors');
const { error } = require('console');
const { request } = require('http');
app.use(cors())

app.use(express.json());

app.use(express.static('build'))

const errorHandler = (error, req, res, next) => {
    console.error('Error:', error.message);
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'Malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }
    next(error);
};

app.use(errorHandler);

// let phonebook = [
// ];

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
        
    })
})


app.get('/info', (req, res) => {
   Person.countDocuments({})
    .then(count => {
        const date = new Date();
        res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
});
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    console.log({'Requested Id: ': id}, {'Type of Id: ': typeof id});
    // // Check if id is not an object type then return error
    // if (typeof id !== 'object') {
    //     return res.status(400).send({ error: 'malformatted id' });
    // }
    
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        }
    )
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
        }
    );


app.post('/api/persons', (req, res, next) => {
   const person = new Person({
        name: req.body.name,
        number: req.body.number,
    });

    person.save().then(savedPerson => {
        res.json(savedPerson);
        return res.status(201).end();
    })
    .catch(error => {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        next(error);
    });
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    console.log(id);
    console.log(body);

    const person = {
        name: body.name,
        number: body.number,
    };
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson);
        }
    )
    .catch(error => next(error));
});
    


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});