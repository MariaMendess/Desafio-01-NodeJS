const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {

  const { username } = req.headers;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ error: "User cannot find!" })
  }

  req.user = user
  return next()

}

app.post('/users', (req, res) => {
  const { name, username } = req.body;
  const userAlreadyExistis = users.some((user) => user.username === username)

  if (userAlreadyExistis) {
    return res.status(400).json({ error: "User Already Exists" })
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  })

  const result = users.find(user => user.username === username)

  return res.status(201).json(result)
});

app.use(checksExistsUserAccount)

app.get('/todos', (req, res) => {
  const { user } = req;
  return res.status(200).json(user.todos)
});

app.post('/todos', (req, res) => {
  const { user } = req;
  const { title, deadline } = req.body;

  user.todos.push({
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    createdAt: new Date()
  });

  return res.status(201).json(user.todos)
});

app.put('/todos/:id', (req, res) => {
  const { title, deadline } = req.body;
  const { user } = req;
  const { id } = req.params;

  const getTodo = user.todos.find(todo => todo.id === id)

  // TODO: Alterar as infos 

});

app.patch('/todos/:id/done', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

module.exports = app;