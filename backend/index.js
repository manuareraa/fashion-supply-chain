const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = "mongodb://localhost:27017/";

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = "fashion-supply-chain";

async function connectToMongoDB() {
  console.log("Establishing connection to MongoDB Atlas...");
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error(e);
  }
}

const multer = require("multer");

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.listen(port, async () => {
  await connectToMongoDB();
  console.log(`Server listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.send("API/Backend is working!!");
});

app.post("/add-product", upload.single("image"), async (req, res) => {
  console.log("<< Add Product Called >>", req.body, "buffer -- ", req.file);
  try {
    const db = await client.db(database);
    const collection = db.collection("products");
    console.log("IMG - ", req.file);
    const { name, price, description, productId, seller, image } = req.body;
    // const image = req.file.buffer; // Access the image data from the uploaded file's buffer
    const result = await collection.insertOne({
      name,
      price,
      description,
      image,
      productId,
      seller,
    });

    console.log("Product added successfully");
    res.status(200).send({
      message: "Product added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.get("/get-product-count", async (req, res) => {
  console.log("<< Get Product Count Called >>");
  try {
    const db = await client.db(database);
    const collection = db.collection("products");

    // Get the count of documents in the collection
    const count = await collection.countDocuments();

    console.log("Product count retrieved successfully");
    res.status(200).send({
      count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.get("/products", async (req, res) => {
  console.log("<< Get All Products Called >>");
  try {
    const db = await client.db(database);
    const collection = db.collection("products");

    // Retrieve all products from the collection
    const products = await collection.find({}).toArray();

    console.log("Products retrieved successfully");
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.post("/add-transaction", async (req, res) => {
  try {
    const db = await client.db(database);
    const collection = db.collection("transactions");
    const transactionObject = req.body;

    const result = await collection.insertOne(transactionObject);

    console.log("Transaction added successfully");
    res.status(200).send({
      message: "Transaction added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const db = await client.db(database);
    const collection = db.collection("transactions");

    const transactions = await collection.find().toArray();

    res.status(200).send(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});