const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended: true}));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rocky139',
    database: 'wrecking_pandemic'
  });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

//Queries to select
/*connection.query('SELECT * FROM usuario', (err,rows) => {
    if(err) throw err;

    rows.forEach( (row) => {
        console.log(`${row.nombre} tiene correo ${row.email}`);
      });
});*/

//Queries to insert
/*const user = { nombre: 'Craig', apellido:'Buckler', email: 'bucklerc@gmail.com' };
connection.query('INSERT INTO usuario SET ?', user, (err, res) => {
  if(err) throw err;
    
});*/

//Queries to update
/*connection.query(
    'UPDATE usuario SET email = ? Where nombre = ?',
    ['craigbuckler@gmail.com','Craig'],
    (err, result) => {
      if (err) throw err;
    }
  );*/
//Queries to delete
  /*connection.query(
    'DELETE FROM usuario WHERE nombre = ?', ["Craig"], (err, result) => {
      if (err) throw err;
    }
  );*/

app.post('/api/users', (request, response) => {
    console.log(request.body);
    const user = { nombre: request.body['nombre'], apellido: request.body['apellido'], email: request.body['email'] }; 
    connection.query('INSERT INTO usuario SET ?', user, (err, res) => {
    if(err) throw err;
    response.send("Added new user");
})})

app.get('/api/users', (request, response) => {
  connection.query('SELECT * FROM usuario', (err,rows) => {
    if(err) throw err;
    response.json(rows);
})})

app.put('/api/users', (request, response) => {
  console.log(request.body)
  connection.query(
    'UPDATE usuario SET nombre = ?, apellido = ?, email = ?  WHERE user_id = ?',
    [request.body['nombre'],request.body['apellido'],request.body['email'],request.body['user_id']],
    (err, result) => {
      if (err) throw err;
    }
  );
  response.send("Modified user");
})

app.delete('/api/users', (request, response) => {
  connection.query(
    'DELETE FROM usuario WHERE user_id = ?', [request.body["user_id"]], (err, result) => {
      if (err) throw err;
    }
  );
  response.send("Deleted user.");
})

/*app.put('/api/users', (request, response) => {
  switch(request.body['change'])
  {
    case 'email':
      connection.query(
        'UPDATE usuario SET email = ? Where nombre = ? AND apellido = ?',
        [request.body['email'],request.body['nombre'],request.body['apellido']],
        (err, result) => {
          if (err) throw err;
        }
      );
    case 'nombre':
      connection.query(
        'UPDATE usuario SET nombre = ? Where email = ? AND apellido = ?',
        [request.body['nombre'],request.body['email'],request.body['apellido']],
        (err, result) => {
          if (err) throw err;
        }
      );
    case 'apellido':
      connection.query(
        'UPDATE usuario SET apellido = ? Where nombre = ? AND email = ?',
        [request.body['apellido'],request.body['nombre'],request.body['email']],
        (err, result) => {
          if (err) throw err;
        }
      );
    }
})*/


app.listen('5500',() => {
    console.log('Listening on port 5500');
})
