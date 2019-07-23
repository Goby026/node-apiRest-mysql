var express = require('express');
var router = express.Router();
var db = require('./../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

/* OBTENER TODOS LOS USUARIOS. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM user";
  db.query(sql, (err, rows, field)=>{
    if ( err ) res.status(500).send({error: 'Algo salio mal'});

    res.json(rows);
  });  
});

/* OBTENER UN USUARIO. */
router.get('/:id', function(req, res, next) {
  var sql = "SELECT * FROM user WHERE iduser = ?";
  db.query(sql,[req.params.id], (err, rows, field)=>{
    if ( err ) res.status(500).send({error: 'Algo salio mal'});

    res.json(rows[0]);
  });  
});

/* CREAR UN USUARIO. */
router.post('/create', function(req, res, next) {
  var sql = "INSERT INTO user SET ?";
  db.query(sql,[req.body], (err, rows, field)=>{
    if ( err ) res.status(500).send({error: 'Algo salio mal'});
    res.json({
      message: 'Usuario creado',
      resp: rows
    });
  });
});

/* MODIFICAR UN USUARIO. */
router.put('/update/:id', function(req, res, next) {
  var {id} = req.params;
  var sql = "UPDATE user SET ? WHERE iduser = ?";
  db.query(sql,[req.body, id], (err, rows, field)=>{
    if ( err ) res.status(500).send({error: 'Algo salio mal'});
    res.json({
      message: 'Usuario actualizado',
      resp: rows
    });
  });
});

/* BORRAR UN USUARIO. */
router.delete('/delete/:id', function(req, res, next) {
  var {id} = req.params;
  var sql = "DELETE FROM user WHERE iduser = ?";
  db.query(sql,[id], (err, rows, field)=>{
    if ( err ) res.status(500).send({error: 'Algo salio mal'});
    res.json({
      message: 'Usuario borrado',
      resp: rows
    });
  });
});

module.exports = router;
