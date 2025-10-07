import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

// Configure DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" }); // change region
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Table definitions
const tables = [
  {
    TableName: "Users",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  },
  {
    TableName: "Songs",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  },
  {
    TableName: "Podcasts",
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  },
];

// Create tables
const createTable = async (table) => {
  try {
    await client.send(new CreateTableCommand(table));
    console.log(`Table ${table.TableName} created successfully!`);
  } catch (err) {
    if (err.name === "ResourceInUseException") {
      console.log(`Table ${table.TableName} already exists.`);
    } else {
      console.error(err);
    }
  }
};

// Sample data from MySQL
const songs = [
  { id: "1", title: "Track 1", artist: "Unknown Artist", embed_url: "https://open.spotify.com/embed/track/39LLxExYz6ewLAcYrzQQyP?utm_source=generator" },
  { id: "2", title: "Track 2", artist: "Unknown Artist", embed_url: "https://open.spotify.com/embed/track/52woc4Pad8LfccTrYb6R3S?utm_source=generator" },
  { id: "3", title: "Track 3", artist: "Unknown Artist", embed_url: "https://open.spotify.com/embed/track/5fb9ousSK0rPQdXDIinpO1?utm_source=generator" },
  // add all tracks from MySQL dump
];

const podcasts = [
  { id: "1", title: "Episode 1", host: "Unknown Host", embed_url: "https://open.spotify.com/embed/episode/1KWah4NK68xSQXH9ZKFh8v/video?utm_source=generator" },
  { id: "2", title: "Episode 2", host: "Unknown Host", embed_url: "https://open.spotify.com/embed/episode/1xGCsl1QzF7v6dLi1jmekg?utm_source=generator" },
  { id: "3", title: "Episode 3", host: "Unknown Host", embed_url: "https://open.spotify.com/embed/episode/0Z6Yplv9KRH6Mfy4m6Q1ae?utm_source=generator" },
  // add all episodes from MySQL dump
];

// Insert items into DynamoDB
const insertItems = async (tableName, items) => {
  for (const item of items) {
    try {
      await ddbDocClient.send(new PutCommand({ TableName: tableName, Item: item }));
      console.log(`Inserted ${item.id} into ${tableName}`);
    } catch (err) {
      console.error(err);
    }
  }
};

(async () => {
  // 1️⃣ Create tables
  for (const table of tables) await createTable(table);

  // 2️⃣ Insert data
  await insertItems("Songs", songs);
  await insertItems("Podcasts", podcasts);

  console.log("DynamoDB setup completed!");
})();
