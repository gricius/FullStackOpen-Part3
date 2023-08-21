const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3001;

// Morgan format string for POST requests 
const customFormat = ':method :url :status :res[content-length] - :response-time ms :req-body';

// Define a token for the request body
morgan.token('req-body', (req) => JSON.stringify(req.body));

app.use(morgan(customFormat)); 
app.use(express.json());

let phonebook = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
});
app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`);
});
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(person => person.id !== id);
    res.status(204).end();
});
app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        });
    } else if (phonebook.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }
    
    const person = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    };
    phonebook = phonebook.concat(person);
    res.json(person);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});