import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
const app = express();
const port = 5000;

// Mongo DB
const client = new MongoClient(process.env.MONGODB_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const connectClient = await connectToMongoDB();
const db = connectClient.db("studiospace");
const studioCollection = db.collection("studios");
const reviewCollection = db.collection("reviews");
const bookingCollection = db.collection("bookings");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server is running Successfully!" });
});

// Featured Studios API
app.get("/studios/featured", async (req, res) => {
  try {
    const featuredStudios = await studioCollection
      .find({})
      .sort({ _id: -1 })
      .limit(6)
      .toArray();
    res.send(featuredStudios);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch featured studios" });
  }
});

// Studios Categories API
app.get("/studios", async (req, res) => {
  const { category } = req.query;
  let query = {};
  if (category) {
    query.category = category;
  }
  const studios = await studioCollection.find(query).toArray();
  res.send(studios);
});

// Add Studio API
app.post("/studios", async (req, res) => {
  const studio = req.body;
  studio.rating = 0;
  const result = await studioCollection.insertOne(studio);
  res.send(result);
});

//My Studios API
app.get("/studios/my-studios", async (req, res) => {
  const { email } = req.query;
  const studios = await studioCollection.find({ ownerEmail: email }).toArray();
  res.send(studios);
});

// Get Reviews API
app.get("/studios/reviews/:id", async (req, res) => {
  const { id } = req.params;
  const reviews = await reviewCollection.find({ studioId: id }).toArray();
  res.send(reviews);
});

// Review API
app.post("/studios/reviews", async (req, res) => {
  const review = req.body;
  const result = await reviewCollection.insertOne(review);
  res.send(result);
});

// Studio Details API
app.get("/studios/:id", async (req, res) => {
  const { id } = req.params;
  const studio = await studioCollection.findOne({ _id: new ObjectId(id) });
  res.send(studio);
});

// Delete Studio API
app.delete("/studios/:id", async (req, res) => {
  const { id } = req.params;
  const result = await studioCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// My Bookings API
app.post("/studios/bookings", async (req, res) => {
  const booking = req.body;
  booking.status = "Pending"; 
  const result = await bookingCollection.insertOne(booking);
  res.send(result);
});

// Get My Bookings API
app.get("/studios/bookings", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }
  const bookings = await bookingCollection.find({ userEmail: email }).toArray();
  res.send(bookings);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});