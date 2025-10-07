// server.js
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const app = express();
app.use(express.json()); // built-in JSON parser

const PORT = 5000;

// DynamoDB client
const client = new DynamoDBClient({ region: "ap-south-1" }); // change region if needed
const ddbDocClient = DynamoDBDocumentClient.from(client);

// ----------- Songs Routes ------------

// Get all songs
app.get("/api/songs", async (req, res) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: "Songs" }));
    res.json(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get song by id
app.get("/api/songs/:id", async (req, res) => {
  try {
    const data = await ddbDocClient.send(
      new GetCommand({ TableName: "Songs", Key: { id: req.params.id.toString() } })
    );
    if (!data.Item) return res.status(404).json({ message: "Song not found" });
    res.json(data.Item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Add song
app.post("/api/songs", async (req, res) => {
  try {
    const item = { id: uuidv4(), ...req.body }; // generate unique id
    await ddbDocClient.send(new PutCommand({ TableName: "Songs", Item: item }));
    res.json({ message: "Song added", item });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get podcast by id
app.get("/api/podcasts/:id", async (req, res) => {
  try {
    const data = await ddbDocClient.send(
      new GetCommand({ TableName: "Podcasts", Key: { id: req.params.id.toString() } })
    );
    if (!data.Item) return res.status(404).json({ message: "Podcast not found" });
    res.json(data.Item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Add podcast
app.post("/api/podcasts", async (req, res) => {
  try {
    const item = { id: uuidv4(), ...req.body }; // generate unique id
    await ddbDocClient.send(new PutCommand({ TableName: "Podcasts", Item: item }));
    res.json({ message: "Podcast added", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
