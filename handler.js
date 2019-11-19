var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 42066);

app.get('/',function(req,res){
  //Note to self: req.query will look like { name: 'value', name: 'value' }
  /*var getParams = [];
  for (var p in req.query){
    getParams.push({'name':p,'value':req.query[p]});
  }
  var context = {};
  context.dataList = getParams;*/
  var context = {};
  context.data = req.query;
  console.log(context.data);
  for (let key in context.data)
  {
    if(context.data.hasOwnProperty(key))
    {
      console.log('${key} : ${context.data[key]}');
    }
  }
  res.render('gethandler.handlebars', context);
});

app.post('/',function(req, res){
  res.render('home.handlebars');
});

app.use(function(req,res){
  res.status(404);
  res.render('404.handlebars');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500.handlebars');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
