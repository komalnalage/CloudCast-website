import express from "express";
import bodyParser from "body-parser";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

// DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

// ----------- Songs Routes ------------

// Get all songs
app.get("/api/songs", async (req, res) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: "Songs" }));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get song by id
app.get("/api/songs/:id", async (req, res) => {
  try {
    const data = await ddbDocClient.send(new GetCommand({ TableName: "Songs", Key: { id: req.params.id } }));
    if (!data.Item) return res.status(404).json({ message: "Song not found" });
    res.json(data.Item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add song
app.post("/api/songs", async (req, res) => {
  try {
    await ddbDocClient.send(new PutCommand({ TableName: "Songs", Item: req.body }));
    res.json({ message: "Song added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------- Podcasts Routes ------------

// Get all podcasts
app.get("/api/podcasts", async (req, res) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: "Podcasts" }));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get podcast by id
app.get("/api/podcasts/:id", async (req, res) => {
  try {
    const data = await ddbDocClient.send(new GetCommand({ TableName: "Podcasts", Key: { id: req.params.id } }));
    if (!data.Item) return res.status(404).json({ message: "Podcast not found" });
    res.json(data.Item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add podcast
app.post("/api/podcasts", async (req, res) => {
  try {
    await ddbDocClient.send(new PutCommand({ TableName: "Podcasts", Item: req.body }));
    res.json({ message: "Podcast added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
