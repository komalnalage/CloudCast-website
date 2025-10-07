// dynamoClient.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// DynamoDB client using EC2 IAM role (no credentials needed)
const client = new DynamoDBClient({ region: "ap-south-1" });
export const ddbDocClient = DynamoDBDocumentClient.from(client);
