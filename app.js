const express = require("express");
const fs = require("fs/promises");
const exphbs = require("express-handlebars");
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
const port = 9090;

app.get("/", (req, res) => {
	res.render("home");
});
app.get("/articles", (req, res) => {
	// fs.readFile("./articles/milestones.txt", "utf-8").then((file) => {
	// 	res.send({ title: "Milestones", article: file });
	// });
	res.render("articles");
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
