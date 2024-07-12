const express = require("express");
const logger = require("morgan");

const app = express();
const port = 3000;

// Middleware
app.use(logger("dev"));
app.use(express.json());

// Global Store
let store = [
  {
    name: "apple",
    price: 1.5,
  },
  {
    name: "Grapes",
    price: 1.75,
  },
  {
    name: "kiwi",
    price: 1.25,
  },
];

// Routes
// 1. Root Route ('/')
app.get("/", (req, res) => {
  res.json(store);
});

// 2. Get All Products Route ('/get-all-products')
app.get("/get-all-products", (req, res) => {
  const productNames = store.map((product) => product.name);
  res.json(productNames);
});

// 3. Get Product by Name Route ('/get-product/:productName')
app.get("/get-product/:productName", (req, res) => {
  const productName = req.params.productName;
  const product = store.find((p) => p.name === productName);
  if (product) {
    res.json(product);
  } else {
    res.json({ message: "Product not found" });
  }
});

// 4. Create Product Route ('/create-product')
// Stretch Goals: 1. Implement additional checks:
app.post("/create-product", (req, res) => {
  const { name, price } = req.body;
  const existingProduct = store.find((p) => p.name === name);
  if (existingProduct) {
    res.json({ message: "Product already exists" });
  } else {
    const newProduct = { name, price };
    store.push(newProduct);
    res.json({ message: "Product added", product: newProduct });
  }
});

// Stretch Goals: 2. Delete Product Route ("/delete-product/:productName")
app.delete("/delete-product/:productName", (req, res) => {
  const productName = req.params.productName;
  const productIndex = store.findIndex((p) => p.name === productName);
  if (productIndex > -1) {
    store.splice(productIndex, 1);
    res.json({ message: "Product deleted" });
  } else {
    res.json({ message: "Product not found" });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
