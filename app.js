const express = require("express");
const exphbs = require("express-handlebars");
const {
	getBlogs,
	getBlogContent,
	blogTitle,
	preview,
} = require("./utils/library");
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
const port = 9090;
const path = "./articles/";

app.get("/blogs", (req, res) => {
	const fileNames = getBlogs(path);
	const myJson = [];
	fileNames.then((arr) => {
		arr.forEach((blog, index) => {
			const content = getBlogContent(blog, path);
			content.then((result) => {
				myJson.push({
					title: blogTitle(blog),
					snippet: preview(result),
					id: index + 1,
					author: "Johnny Appleseed",
				});
			});
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

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
