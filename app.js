var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose");

// connect mongoose to a database
mongoose.connect("mongodb://localhost/todo_app");

// MONGO - MONGOOSE - - - - - - - - - - - - - - - - - - - -

// define todo schema
var todoSchema = new mongoose.Schema({
	item: String
});

// compile schema into a model, Todo.
var Todo = mongoose.model("Todo", todoSchema);



// add todo to database

// var newTodo = new Todo({ // create new todo
// 	item: "Made By Oba Seward-Evans"
// });

// newTodo.save( function(err, todo){ // save new todo to db
// 	if (err) {
// 		console.log("something went wrong");
// 	} else {
// 		console.log("new todo added to database");
// 		console.log(todo);
// 	}
// });

// EXPRESS - ROUTES - - - - - - - - - - - - - - - - - - - -

// tell express to use resources in public such as css
app.use(express.static("public"));

// used so you can type home instead of home.ejs
app.set("view engine", "ejs")

app.listen(3000, function(){
	console.log("server is baby listening")
});

app.get("/", function(req, res) {
	// var todos = [
	// 	{task: "Sample Todo"},
	// 	{task: "Made By Oba Seward-Evans"}
	// ];
	var allTodos = {}

	// retrieve todos from the db
	Todo.find({}, function(err, todos) {
		if (err) {
			console.log("there was an error");
			console.log(error);
		} else {
			allTodos = todos;// console.log(todos);
			console.log(allTodos);
			res.render("home", {todos: allTodos});
		}
	});
});

app.post("/", function(req, res) {
	var item = req.body.item;
	var newTodo = {item: item};

	Todo.create ( newTodo, function(err, todo){ // save new todo to db
		if (err) {
			console.log("something went wrong");

		} else {
			console.log("new todo added to database");
			res.redirect("/");

	}});
});

app.post("/remove", function(req, res) {
	var itemToRemove = req.body.item;
	console.log("(" + itemToRemove + ")");

	Todo.findOne({ item : itemToRemove }, function (err, todo) {
	    if (err) {
	        console.log("something went wrong");
	    } else {
	    	todo.remove(function (err) {
				if (err) {
					console.log("something went wrong");
				} else {
					res.redirect("/");
				}
			});
		}
	});	
});