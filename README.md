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
# 3.2: Phonebook backend step2

Implement a page at the address http://localhost:3001/info that looks roughly like this:
<img src='https://fullstackopen.com/static/26383e4e706a7f89c140690121be2ea1/5a190/23x.png'>
The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

There can only be one response.send() statement in an Express app route. Once you send a response to the client using response.send(), the request-response cycle is complete and no further response can be sent.

To include a line space in the output, use <br/> tag, or wrap the statements in <p> tags.
# 3.3: Phonebook backend step3
Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.