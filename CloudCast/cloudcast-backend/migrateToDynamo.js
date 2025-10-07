import mysql from "mysql2/promise";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

// MySQL connection
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3Friends*", // your MySQL password
  database: "cloudcast"
});

// Migrate Songs
const [songs] = await connection.execute("SELECT * FROM songs");
for (const s of songs) {
  await ddbDocClient.send(new PutCommand({
    TableName: "Songs",
    Item: { id: s.id.toString(), title: s.title, artist: s.artist, embed_url: s.embed_url }
  }));
  console.log(`Migrated song id=${s.id}`);
}

// Migrate Podcasts
const [podcasts] = await connection.execute("SELECT * FROM podcasts");
for (const p of podcasts) {
  await ddbDocClient.send(new PutCommand({
    TableName: "Podcasts",
    Item: { id: p.id.toString(), title: p.title, host: p.host, embed_url: p.embed_url }
  }));
  console.log(`Migrated podcast id=${p.id}`);
}

await connection.end();
console.log("Migration completed!");
