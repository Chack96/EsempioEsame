var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
var uuid = require('uuid/v4');

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

var lista = [];

// Creo un metodo post per inserire un assignement
app.post('/InsertAssignement/', function (req, res) {
  var assignement =
  {
    taskID: request.body.taskID,
    assignementID: uuid(),
    workerID: request.body.workerID,
    AssignementResult: request.body.AssignementResult
  }

  lista.push(assignement);
  res.sendStatus(200);
});

// Creo un metodo get per vedere gli assignement
app.get('/GetAssignement/', function (req, res)
{
  //res.header('Content-Type', 'application/json');
  res.send(lista);
  //res.sendStatus(200);
});

// Creo un metodo put per aggiornare un assignment dato il suo assignementID
app.put('/PutAssignement/', function (req, res)
{
  var Id = request.body.assignementID;
  var res = -1;
  for (var i=0; i<list.size; i++)
  {
    if (Id=lista[i].assignementID)
      res = i;
  }
  if (res==-1)
    res.sendStatus(404);
  else
  {
    lista[i] = request.body.TaskID;
    lista[i] = request.body.workerID;
    lista[i] = request.body.AssignementResult;
    res.sendStatus(200);
  }

});

// Creo un metodo delete per cancellare un assignement dato il suo assignementID
app.delete('/DeleteAssignement/', function (req, res)
{
  var Id = request.body.assignementID;
  var res = -1;
  for (var i=0; i<list.size; i++)
  {
    if (Id=lista[i].assignementID)
      res = i;
  }
  if (res==-1)
    res.sendStatus(404);
  else
  {
    lista.splice(0,i);
    res.sendStatus(200);
  }
});

module.exports = app;
