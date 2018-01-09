var express = require('express');
var app = express();
//libreria
const uuid = require("uuid/v4");
//Istanza bodyparser per leggere i JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Activate CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", false);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method=='OPTIONS'){
    res.sendStatus(200);
  }else{
    next();
  }
});

var opzioni = {
  dotfiles: 'ignore', //ignora i files preceduti dal punto
  etag: false,
  fallthrough: true, //se non trova il file salta la funzione e va a quella dopo
  index: 'index.html', //default index
  maxAge: '1d', //quanto rimane in cache
  redirect: false,
  setHeaders: function (res, path, stat) { //imposta il documento
      res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(__dirname + '/docs', opzioni));

/*var lista = [{
  taskId : 'addadd',
  assignmentId : 'ff4332rr',
  workerId : 'dddssaad',
  assignmentResult : 'wrong'
}];*/
var lista = [];

app.post('/aggiunta/', function (req, res) {
  var assignment ={
    taskId : req.body.taskId,
    assignmentId : uuid(),
    workerId : req.body.workerId,
    assignmentResult : req.body.assignmentResult
  };
  lista.push(assignment);
  res.sendStatus(200);
});


app.get('/visualizza/', function (req, res) {
  res.send(lista);
  res.sendStatus(200);
});

app.delete('/cancella/:assignmentId', function (req, res) {
  const assignmentId = req.params.assignmentId;
  var index = -1;
  for(var i=0; i<lista.length; i++){
    console.log(i);
    if(lista[i].assignmentId===assignmentId){
      index = i;
      console.log("trovato");
    }

  }
  if(index>-1){
    lista.splice(index, 1);
    res.sendStatus(200);
  }
  else{
      res.sendStatus(500);
  }
});
app.put('/modifica/', function (req, res) {
  if(req.body.taskId==null || req.body.workerId==null || req.body.assignmentResult==null || req.body.assignmentId==null){
    res.sendStatus(500);
  }
  var assignment = req.body.assignmentId;
  var index = -1;
  for(var i=0; i<lista.length; i++){
    if(lista[i].assignmentId==assignment){
      index = i;
      console.log("found " + assignment + " in position "+ i);
    }
  }
  if(index>-1){
    console.log("ora modifico");
    console.log(lista[index]);
    console.log(lista[index].taskId);
    lista[index].taskId = req.body.taskId;
    lista[index].workerId = req.body.workerId;
    lista[index].assignmentResult = req.body.assignmentResult;
    res.sendStatus(200);
  }
  else{
    res.sendStatus(500);
  }
});
app.put('/modifica/', function (req, res) {
  console.log(lista.lenght);
  var assignment = req.body.assignmentId;
  var index = -1;
  for(var i=0; i<lista.length; i++){
    if(lista[i].assignmentId==assignment){
      index = i;
      console.log("found " + assignment);
      console.log("" + i);
      console.log("" + index);
    }
  }
  if(index>-1){
    console.log("ora modifico");
    console.log(lista[index]);
    console.log(lista[index].taskId);
    lista[index].taskId = req.body.taskId;
    lista[index].workerId = req.body.workerId;
    lista[index].assignmentResult = req.body.assignmentResult;
    res.sendStatus(200);
  }
  else{
    res.sendStatus(500);
  }
});

module.exports = app;
