const AWS = require("aws-sdk");
const moment = require("moment");
require("dotenv").config();

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

	return blog_data.Item;
};

const getAllBlogs = async () => {
	const params = {
		TableName: table,
	};

	const allBlogs = await db.scan(params).promise();

	return allBlogs.Items;
};

module.exports = { getBlogById, getAllBlogs };
