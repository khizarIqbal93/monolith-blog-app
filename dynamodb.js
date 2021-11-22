const AWS = require("aws-sdk");
const moment = require("moment");
require("dotenv").config();
const { preview } = require("./utils/library");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
	region: "eu-west-1",
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const db = new AWS.DynamoDB.DocumentClient();
const table = "Blogs";

const getBlogById = async (blog_id) => {
	const params = {
		TableName: table,
		Key: {
			blog_id: blog_id,
		},
	};

	const blog_data = await db.get(params).promise();

	blog_data.Item.datePosted = moment(blog_data.Item.date).format(
		"MMMM Do YYYY"
	);
	return blog_data.Item;
};

const getAllBlogs = async () => {
	const params = {
		TableName: table,
	};

	const response = await db.scan(params).promise();

	const allBlogs = response.Items.map((x) => {
		x.snippet = preview(x.content);
		x.datePosted = moment(x.date).fromNow();
		return x;
	});

	return allBlogs;
};

const postBlog = async (title, author, category, date, content) => {
	const params = {
		TableName: table,
		Item: {
			title: title,
			content: content,
			author: author,
			date: date,
			category: category,
			blog_id: uuidv4(),
		},
	};
	db.put(params, (err, data) => {
		if (err) {
			console.log(err);
		}
	});
};

module.exports = { getBlogById, getAllBlogs, postBlog };
