










/**
 *  * Module dependencies.
 *   */

var express = require('express');

var app = module.exports = express();

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
//we simply pass _any_ function, in this
// case `ejs.__express`.
//
app.engine('.html', require('ejs').__express);

//
// Optional since express defaults to CWD/views
//
app.set('views', __dirname + '/views');
app.use(express.static('public'));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

app.get('/lifebox', function(req, res){
	res.render('life_box_graph')
});

app.get('/rust', function(req, res){
	res.render('rust_graph');
});

app.get('/', function(req, res){
	res.render('brain_graph_test')
});

app.get('/chat', function(req, res){
	res.render('chat')
});

app.post('/chat', function(req,res){
	res.send({stat:'ok'});
	console.log('/chat post');
});
//
//
if (!module.parent) {
	app.listen(3000);
   console.log('Express started on port 3000');
}
