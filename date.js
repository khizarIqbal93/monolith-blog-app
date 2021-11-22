console.log(new Date());
const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const title = document.getElementById("blog-title").value;
	const blog = document.getElementById("blog-content").value;
	const category = document.getElementById("blog-category").value;
	const author = document.getElementById("blog-author").value;
	const data = {
		title: title,
		content: blog,
		date: new Date(),
		author: author,
		category: [category],
	};
	fetch("http://localhost:9090/postData", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	}).then((res) => {
		if (res.status === 201) {
			document.getElementById("Submit").value = "Posted!";
			document.getElementById("Submit").disabled = true;
		}
	});
});
