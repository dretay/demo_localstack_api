const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const AWS = require("aws-sdk");
app.use(express.static(path.join(__dirname, "build")));

app.get("/list", function (req, res) {
	AWS.config.update({
		accessKeyId: "0000",
		secretAccessKey: "0000",
		region: "us-east-2",
		endpoint: "http://localstack:4566",
	});
	const dynamoDb = new AWS.DynamoDB.DocumentClient();
	const params = {
		TableName: "processimage-dev",
	};
	dynamoDb.scan(params, (error, result) => {
		// handle potential errors
		if (error) {
			console.error(error);
			res.send("Couldn't fetch ");
			return;
		}

		res.send(JSON.stringify(result.Items));
	});
});

app.get("/ping", function (req, res) {
	// AWS.config.update({
	// 	accessKeyId: "0000",
	// 	secretAccessKey: "0000",
	// 	region: "us-east-2",
	// 	endpoint: "http://localstack:4566",
	// });
	// const dynamoDb = new AWS.DynamoDB.DocumentClient();
	// const params = {
	// 	TableName: process.env.DYNAMODB_TABLE,
	// };
	// dynamoDb.scan(params, (error, result) => {
	// 	// handle potential errors
	// 	if (error) {
	// 		console.error(error);
	// 		callback(null, {
	// 			statusCode: error.statusCode || 501,
	// 			headers: { "Content-Type": "text/plain" },
	// 			body: "Couldn't fetch the todos.",
	// 		});
	// 		return;
	// 	}

	// 	// create a response
	// 	const response = {
	// 		statusCode: 200,
	// 		body: JSON.stringify(result.Items),
	// 	};
	// 	callback(null, response);
	// });
	return res.send("pong?");
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000);
