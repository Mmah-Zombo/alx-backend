const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const bodyParser = require('body-parser');

const app = express();
const port = 1245;

// Connect to the Redis server
const client = redis.createClient({ host: 'localhost', port: 6379 });
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Data: list of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Function to get an item by ID
function getItemById(itemId) {
  return listProducts.find((item) => item.itemId === itemId);
}

// Reserve stock for an item
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

// Get the current reserved stock for an item
async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
}

// Route to get the list of all available products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// Route to get the product details with current available stock
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const currentQuantity = product.initialAvailableQuantity - (await getCurrentReservedStockById(itemId));

  res.json({ ...product, currentQuantity });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);

  if (product.initialAvailableQuantity - reservedStock <= 0) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  await reserveStockById(itemId, reservedStock + 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
