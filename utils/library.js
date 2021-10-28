const fs = require("fs/promises");

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

module.exports = { getBlogs, getBlogContent, preview, blogTitle };
