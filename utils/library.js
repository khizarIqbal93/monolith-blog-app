const fs = require("fs/promises");
const path = "../articles";

async function getBlogs(path) {
	let arr = await fs.readdir(`${path}`, "utf-8");
	return arr;
}

function getBlogContent(filename, path) {
	return fs.readFile(`${path}/${filename}`, "utf-8");
}

async function blogsJson(path) {
	const namesArr = await getBlogs(path);
	const finalArray = namesArr.map((x) => {
		return fs.readFile(`../articles/${x}`, "utf-8").then((res) => {
			return res;
		});

		// const snippet = content.substr(0, 94) + "...";

		// return snippet;
	});
	return finalArray;
}

blogsJson(path).then((res) => console.log(res));
module.exports = { getBlogs, getBlogContent };
