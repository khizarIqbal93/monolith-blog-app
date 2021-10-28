const express = require("express");
const exphbs = require("express-handlebars");
const fsSync = require("fs");
// webhook test
const {
	getBlogs,
	getBlogContent,
	blogTitle,
	preview,
} = require("./utils/library");
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
const { PORT = 9090 } = process.env;
const path = "./articles/";

app.get("/blogs", (req, res) => {
	const fileNames = fsSync.readdirSync("./articles/", "utf-8");
	const myJson = [];
	fileNames.forEach((blog, index) => {
		const content = fsSync.readFileSync(`${path}${blog}`, "utf-8");
		myJson.push({
			title: blogTitle(blog),
			snippet: preview(content),
			id: index + 1,
			author: "Johnny Appleseed",
		});
	});

	res.render("blogs", { myJson });
});

app.get("/blogs/:id", (req, res) => {
	const { id } = req.params;
	const files = getBlogs(path);

	files.then((arr) => {
		const found = arr.find((element) => arr.indexOf(element) + 1 == id);
		getBlogContent(found, path).then((result) => {
			const title = blogTitle(found);
			const content = result;
			const author = "Johnny Appleseed";
			const blog = {
				title,
				content,
				author,
			};
			res.render("blog", { blog });
		});
	});
});

app.get("/post", (req, res) => {
	res.render("post");
});

app.post("/postData", (req, res) => {
	console.log(req.body);
});

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});
