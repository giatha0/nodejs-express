
// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))


var todos = [
  {id: 1, work: 'Đi chợ'},
  {id: 2, work: 'Nấu cơm'},
  {id: 3, work: 'Rửa bát'},
  {id: 4, work: 'Học code tại CodersX'}          
]

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('index');
});

app.get('/todos', (request, response) => {
  response.render('list/index', {todos:todos});
});

app.get('/todos/search', (request, response) => {
  var q = request.query.q;
  if (q) {
    var matchedTodos = todos.filter(function(todo) {
      return todo.work.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    response.render('list/index', {
      todos: matchedTodos
    });
  }
  else {
    response.render('list/index',{todos});
  }
});

app.get('/todos/search', (request, response) => {
  response.render('list/index');
});

app.post('/todos/create', (request, response) => {
  
  todos.push(request.body);
  response.redirect('back');
  // console.log(request.body);
  // console.log(todos);
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
