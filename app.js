var express = require("express");
var app = express();

// tell express to use resources in public such as css
app.use(express.static("public"));

// used so you can type home instead of home.ejs
app.set("view engine", "ejs")

app.listen(3000, function(){
	console.log("server is baby listening")
});

app.get("/", function(req, res) {
	var todos = [
		{task: "Sample Todo"},
		{task: "Made By Oba Seward-Evans"}, 
		{task: "eat a cow"}
	];

	res.render("home", {todos: todos});
});