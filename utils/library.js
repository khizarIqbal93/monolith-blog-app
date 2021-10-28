const fs = require("fs").promises;

async function getBlogs(path) {
	const arr = await fs.readdir(`${path}`, "utf-8");
	return arr;
}

async function getBlogContent(filename, path) {
	const file = await fs.readFile(`${path}${filename}`, "utf-8");
	return file;
}

function preview(string) {
	const snippet = string.substr(0, 94) + "...";
	return snippet;
}

function blogTitle(filename) {
	const nameWithoutExt = filename.substring(0, filename.length - 4);
	const cleanName = nameWithoutExt.replace(/_/gm, " ");
	return cleanName;
}

// const myForm = document.getElementById("myForm");
// myForm.addEventListener("submit", (event) => {
// 	event.preventDefault();
// 	const title = document.getElementById("exampleFormControlInput1").value;
// 	const blog = document.getElementById("exampleFormControlTextarea1").value;
// 	const data = { title: title, blog: blog };
// 	fetch("https://example.com/profile", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	});
// });
module.exports = { getBlogs, getBlogContent, preview, blogTitle };
