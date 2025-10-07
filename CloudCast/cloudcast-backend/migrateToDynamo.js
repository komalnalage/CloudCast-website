// migrateToDynamo.js
import fs from "fs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// DynamoDB client
const client = new DynamoDBClient({ region: "ap-south-1" }); // Change region if needed
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Read JSON files exported from local MySQL
const songs = JSON.parse(fs.readFileSync("songs.json", "utf-8"));
const podcasts = JSON.parse(fs.readFileSync("podcasts.json", "utf-8"));

const migrate = async () => {
  try {
    console.log("Migrating Songs...");
    for (const s of songs) {
      await ddbDocClient.send(new PutCommand({
        TableName: "Songs",
        Item: {
          id: s.id.toString(),
          title: s.title,
          artist: s.artist,
          embed_url: s.embed_url
        }
      }));
      console.log(`Migrated song id=${s.id}`);
    }

    console.log("Migrating Podcasts...");
    for (const p of podcasts) {
      await ddbDocClient.send(new PutCommand({
        TableName: "Podcasts",
        Item: {
          id: p.id.toString(),
          title: p.title,
          host: p.host,
          embed_url: p.embed_url
        }
      }));
      console.log(`Migrated podcast id=${p.id}`);
    }

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
};

// Run migration
migrate();
