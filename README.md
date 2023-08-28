Phone Book live - https://phones-backend.fly.dev/

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
# 3.4: Phonebook backend step4
Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.
# 3.5: Phonebook backend step5
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.
# 3.6: Phonebook backend step6
Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:
```jsx
{ error: 'name must be unique' }
```
# 3.7: Phonebook backend step7

Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.
# 3.8*: Phonebook backend step8
Configure morgan so that it also shows the data sent in HTTP POST requests:
<img src='https://fullstackopen.com/static/4ed4b48465d48df517158501c0be187e/5a190/24.png'>

# 3.9 phonebook backend step9
Make the backend work with the phonebook frontend from the exercises of the previous part. Do not implement the functionality for making changes to the phone numbers yet, that will be implemented in exercise 3.17.

You will probably have to do some small changes to the frontend, at least to the URLs for the backend. Remember to keep the developer console open in your browser. If some HTTP requests fail, you should check from the Network-tab what is going on. Keep an eye on the backend's console as well. If you did not do the previous exercise, it is worth it to print the request data or request.body to the console in the event handler responsible for POST requests.
# 3.10 phonebook backend step10
Deploy the backend to the internet, for example to Fly.io or Render.

Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works.

PRO TIP: When you deploy your application to Internet, it is worth it to at least in the beginning keep an eye on the logs of the application AT ALL TIMES.

Create a README.md at the root of your repository, and add a link to your online application to it.

NOTE: as it was said, you should deploy the BACKEND to the cloud service. If you are using Fly.io the commands should be run in the root directory of the backend (that is, in the same directory where the backend package.json is). In case of using Render, the backend must be in the root of your repository.

You shall NOT be deploying the frontend directly at any stage of this part. It is just backend repository that is deployed throughout the whole part, nothing else.

# 3.11 phonebook full stack
Generate a production build of your frontend, and add it to the internet application using the method introduced in this part.

NB If you use Render, make sure the directory build is not gitignored

Also, make sure that the frontend still works locally (in development mode when started with command npm run dev).

If you have problems getting the app working make sure that your directory structure matches the example app.
# 3.12: Command-line database
Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

NB: Do not include the password in the file that you commit and push to GitHub!

The application should work as follows. You use the program by passing three command-line arguments (the first is the password), e.g.:
```JSX
node mongo.js yourpassword Anna 040-1234556
```
As a result, the application will print:
```JSX
added Anna number 040-1234556 to phonebook
```
The new entry to the phonebook will be saved to the database. Notice that if the name contains whitespace characters, it must be enclosed in quotes:
```JSX
node mongo.js yourpassword "Arto Vihavainen" 045-1232456
```
If the password is the only parameter given to the program, meaning that it is invoked like this:
```JSX
node mongo.js yourpassword
```
Then the program should display all of the entries in the phonebook:
```JSX
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
```
You can get the command-line parameters from the process.argv variable.

NB: do not close the connection in the wrong place. E.g. the following code will not work:
```JSX
Person
  .find({})
  .then(persons=> {
    // ...
  })

mongoose.connection.close()
```
In the code above the mongoose.connection.close() command will get executed immediately after the Person.find operation is started. This means that the database connection will be closed immediately, and the execution will never get to the point where Person.find operation finishes and the callback function gets called.

The correct place for closing the database connection is at the end of the callback function:
```JSX
Person
  .find({})
  .then(persons=> {
    // ...
    mongoose.connection.close()
  })
```
NB: If you define a model with the name Person, mongoose will automatically name the associated collection as people.

# 3.13: Phonebook database, step1
Change the fetching of all phonebook entries so that the data is fetched from the database.

Verify that the frontend works after the changes have been made.

In the following exercises, write all Mongoose-specific code into its own module, just like we did in the chapter Database configuration into its own module.

# 3.14: Phonebook database, step2
Change the backend so that new numbers are saved to the database. Verify that your frontend still works after the changes.

At this stage, you can ignore whether there is already a person in the database with the same name as the person you are adding.

# 3.15: Phonebook database, step3
Change the backend so that deleting phonebook entries is reflected in the database.
Verify that the frontend still works after making the changes.
# 3.16 Phonebook database, step4
Move the error handling of the application to a new error handler middleware.
# 3.17*: Phonebook database, step5
If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

Verify that the frontend works after making your changes.
# 3.18*: Phonebook database step6
Also update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.

Inspecting an individual phonebook entry from the browser should look like this:
```
{
name: "Arto Hellas",
number: "040-2345823",
id: "5c9345980bj00etc"
}
```
# 3.19*: Phonebook database, step7
Expand the validation so that the name stored in the database has to be at least three characters long.

Expand the frontend so that it displays some form of error message when a validation error occurs. Error handling can be implemented by adding a catch block as shown below:
```JSX
personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {
      // this is the way to access the error message
      console.log(error.response.data.error)
    })
```
You can display the default error message returned by Mongoose, even though they are not as readable as they could be:
<img src='https://fullstackopen.com/static/fddf847e340f060549c3029f464a5493/5a190/56e.png'>
# 3.20*: Phonebook database, step8
Add validation to your phonebook application, which will make sure that phone numbers are of the correct form. A phone number must:

- have length of 8 or more
- be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers

  - eg. 09-1234556 and 040-22334455 are valid phone numbers
  - eg. 1234556, 1-22334455 and 10-22-334455 are invalid
Use a Custom validator to implement the second part of the validation.

If an HTTP POST request tries to add a person with an invalid phone number, the server should respond with an appropriate status code and error message.