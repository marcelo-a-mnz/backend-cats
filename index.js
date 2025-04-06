

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

const users = [];

app.get('/',(req,res) => {
    return res.json('Hello world');
});

app.get('/users',(req,res) => {
    return res.json(users);
});

app.post('/users',(req,res) => {
    const { name, email } = req.body;

    const newUser = {
        id:Math.random().toString(36),
        name,
        email
    };

    users.push(newUser);
    return res.json(newUser);
});

app.delete('/users/:id',(req,res) => {
    const { id } = req.params;
    return res.json(id);
})

app.listen(port,(error) => {
    if (error) {
        console.log('Erro ao iniciar servidor express!');
        console.log(error.log);
    }

    console.log(`Servidor rodando na porta ${port}`);
})