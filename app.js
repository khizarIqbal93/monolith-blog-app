const express = require("express");
const exphbs = require("express-handlebars");
const fsSync = require("fs");
const cors = require("cors");
const { getBlogById, getAllBlogs } = require("./dynamodb");
const { preview } = require("./utils/library");

const app = express();
app.use(express.json());
app.use(cors());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// eslint-disable-next-line no-undef
const { PORT = 9090 } = process.env;
const path = "./articles/";

app.get("/blogs", (req, res) => {
	getAllBlogs().then((blogs) => {
		const allBlogs = blogs.map((x) => {
			const snippet = preview(x.content);
			return { ...x, snippet };
		});
		res.render("blogs", { allBlogs });
	});
});

app.get("/blogs/:id", (req, res) => {
	const { id } = req.params;
	getBlogById(id).then((blog) => {
		res.render("blog", { blog });
	});
});

app.get("/post", (req, res) => {
	res.render("post");
});

app.post("/postData", (req, res) => {
	const { title, blog } = req.body;
	fsSync.writeFileSync(`${path}${title}.txt`, blog);
});

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});
