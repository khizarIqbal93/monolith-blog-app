function preview(string) {
	const snippet = string.substr(0, 125) + "...";
	return snippet;
}

module.exports = { preview };
