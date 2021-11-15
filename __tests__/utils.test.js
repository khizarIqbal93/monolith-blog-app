const {
	getBlogs,
	getBlogContent,
	preview,
	blogTitle,
} = require("../utils/library");
const path = "./articles/";
describe("getBlogs", () => {
	it("should an array of file names", () => {
		return getBlogs(path).then((data) => {
			expect(Array.isArray(data)).toBe(true);
		});
	});
	it("should an array of file names", () => {
		return getBlogs(path).then((data) => {
			expect(data.length).toBeGreaterThan(3);
		});
	});
});
describe("getBlogContent", () => {
	it("it should be a string", () => {
		return getBlogContent("IDC.txt", "./articles/").then((data) => {
			expect(typeof data).toBe("string");
		});
	});
	it("should not be an empty array", () => {
		return getBlogContent("IDC.txt", "./articles/").then((data) => {
			expect(data.length).toBeGreaterThan(0);
		});
	});
});
describe("preview", () => {
	const text =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	const snippet = preview(text);
	it("it should be a string", () => {
		return getBlogContent("IDC.txt", "./articles/").then((data) => {
			expect(typeof snippet).toBe("string");
		});
	});
	it("it should have a length of 97", () => {
		return getBlogContent("IDC.txt", "./articles/").then((data) => {
			expect(snippet).toHaveLength(125);
		});
	});
});
describe("blogTitle", () => {
	it("it should format string correctly", () => {
		expect(blogTitle("IDC.txt")).toBe("IDC");
		expect(blogTitle("teaching_code.txt")).toBe("teaching code");
	});
});
