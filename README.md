## Continueation of https://github.com/gricius/FullStackOpen
# 3.1: Phonebook backend step1
Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

Data:
```jsx
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
```
Output in the browser after GET request:
<img src='https://fullstackopen.com/static/a4879a92f2a8bd2e96c6d67fe3f34383/5a190/22e.png'>
The application must be started with the command npm start.

The application must also offer an npm run dev command that will run the application and restart the server whenever changes are made and saved to a file in the source code.
