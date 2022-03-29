const express = require("express");
const exphbs = require("express-handlebars");

const cors = require("cors");
const { getBlogById, getAllBlogs, postBlog } = require("./dynamodb");
// comment
const app = express();
app.use(express.json());
app.use(cors());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// eslint-disable-next-line no-undef
const { PORT = 9090 } = process.env;

app.get("/blogs", (req, res) => {
	getAllBlogs().then(allBlogs => {
		res.render("blogs", { allBlogs });
	});
});

app.get("/blogs/:id", (req, res) => {
	const { id } = req.params;
	getBlogById(id).then(blog => {
		res.render("blog", { blog });
	});
});

app.get("/post", (req, res) => {
	res.render("post");
});

app.post("/postData", (req, res) => {
	const { content, category, author, title, date } = req.body;
	postBlog(title, author, category, date, content).then(result => {
		res.status(201).send("OK");
	});
});

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});
