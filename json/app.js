var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride =require('method-override');

app.use(express.static('public')); 

// express 설정
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// /home
app.get("/", function(req,res){
	
	fs.readFile(__dirname+"/public"+"/todo.json",'utf8',function(err,data){
		res.render("index_json",{data});
	});
});

app.post("/new",function(req,res){
	var todoData;

	fs.readFile(__dirname+"/public"+"/todo.json",'utf8',function(err,data){
		todoData = data;
		var todoJson = JSON.parse(todoData);
		todoJson.todo.push({"memo":req.body.todoText,"done":false});

		// SAVE DATA
	    fs.writeFile(__dirname + "/public"+"/todo.json", JSON.stringify(todoJson, null, '\t'), "utf8",
	    	function(err, data){
	        res.redirect("/");
	    })
	});
});

app.put("/edit",function(req,res){
	var todoData;
	fs.readFile(__dirname+"/public"+"/todo.json",'utf8',function(err,data){
		todoData = data;
		var todoJson = JSON.parse(todoData);
		todoJson.todo[req.body.editTodo].done = !todoJson.todo[req.body.editTodo].done;
		// SAVE DATA
	    fs.writeFile(__dirname + "/public"+"/todo.json", JSON.stringify(todoJson, null, '\t'), "utf8",
	    	function(err, data){
	        res.redirect("/");
	    })
	});
});

app.delete("/delete",function(req,res){
	var todoData;	
	fs.readFile(__dirname+"/public"+"/todo.json",'utf8',function(err,data){
		todoData = data;
		var todoJson = JSON.parse(todoData);
		
		todoJson.todo.splice(req.body.delTodo,1);
		// SAVE DATA
	    fs.writeFile(__dirname + "/public"+"/todo.json", JSON.stringify(todoJson, null, '\t'), "utf8",
	    	function(err, data){
	        res.redirect("/");
	    })
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});