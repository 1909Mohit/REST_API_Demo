const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const app = express();

//  to parse FORM data in POST reqest body
app.use(express.urlencoded({ extended: true }));
// to parse incoming JSON in POST request body 
app.use(express.json())

//faking requests with method-override
app.use(methodOverride('_method'))


// ********** Set views directory and EJS *********** 
//set path of view folder respect to this file
app.set('views', path.join(__dirname, 'views'));
//find ejs files by default in views folder
app.set('view engine', 'ejs');


//our fake database - comments
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

// GET /comments - list all comments
// POST /comments - Create a new comment 
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment

// ******** INDEX - GET /comments -showing all comments
app.get('/comments', (req, res) => {
    //rendering index.ejs and sending comments array
    res.render('comments/index', {comments})
})

// ******* NEW -  GET /comments/new -providing form for making new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// ****** CREATE -  POST /comments -making new comment by retrieving data from user
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({username, comment, id : uuid()})
    res.redirect('/comments')
})
 
// ****** SHOW - GET /comments/:id -show a particular comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})


// ****** EDIT - GET /comments/:id/edit - providing a form for Updating a particular comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment})
})

// ****** UPDATE - PATCH /comments/:id -Updating a particular comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

// ****** DELETE - DELETE /comments/:id -Updating a particular comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})


const port = 3000;
app.listen(port, (req, res) => {
    console.log(`Listening on Port ${port}`);
})