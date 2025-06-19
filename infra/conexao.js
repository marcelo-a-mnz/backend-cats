const { Client } = require('pg');

require('dotenv').config();

const conexao = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  port: process.env.DBPORT,
  ssl: {
    rejectUnauthorized: false
  }
});

conexao.connect();

module.exports = conexao;
