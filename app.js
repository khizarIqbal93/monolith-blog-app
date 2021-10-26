const express = require("express");
const fs = require("fs/promises");
const exphbs = require("express-handlebars");
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
const port = 9090;
const blogs = [];
fs.readdir("./articles", "utf-8").then((namesArr) => {
	namesArr.forEach((x) => {
		const nameWithoutExt = x.substring(0, x.length - 4);
		const cleanName = nameWithoutExt.replace(/_/gm, " ");
		fs.readFile(`./articles/${x}`, "utf-8").then((preview) => {
			const snippet = preview.substr(0, 94) + "...";
			blogs.push({
				title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
				snippet,
			});
		});
	});
});

app.get("/blogs", (req, res) => {
	res.render("blogs", { blogs });
});

app.get("/blogs/1", (req, res) => {
	const article = {};
	fs.readFile("./articles/milestones.txt", "utf-8").then((file) => {
		article.title = "Milestones";
		article.content = file;
		res.render("blog", {
			blog: {
				title: article.title,
				content: article.content,
			},
		});
	});
});

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
