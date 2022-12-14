const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql');

app.get('/', async (req, res) => {
  const connection = mysql.createConnection(config)

  const create_table = 'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;'
  connection.query(create_table)

  const sql = `INSERT INTO people(name) values('Octacilio Neto')`;
  connection.query(sql)
  connection.query('SELECT * FROM people', (err, response) => {
    res.send(`<h1>Full Cycle Rocks</h1> <br> <h2>${response.map(user => `${user.name}`)}</h2>`)});
  
    connection.end()
})

app.listen(port, () => {
  console.log('Running in ' + port)
})