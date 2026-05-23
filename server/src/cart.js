import express from 'express'
import { getUserFromToken, readJsonFile, writeJsonFile } from "./utils.js";
import { getCartRequestValidator } from "./schema.js";

const router = express.Router();
const validateCartBody = getCartRequestValidator();


const USERS_FILE = "./data-store/users.json";
const PRODUCTS_FILE = "./data-store/products.json";



// POST /cart
router.post("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const user = await getUserFromToken(token);
  if (!user) return res.status(401).send("Unauthorized");

  const isValid = validateCartBody(req.body);
  if (!isValid) return res.status(400).send("Invalid request body");

  const productId = req.body.productId;

  const products = await readJsonFile(PRODUCTS_FILE);
  const productExists = products.find(p => p.id === productId);
  if (!productExists) return res.status(404).send("Product not found");

  if (user.cart.includes(productId)) {
    return res.status(400).send("Product already in cart");
  }
  

  // Add product to cart
  user.cart.push(productId);

  // Save updated user
  const users = await readJsonFile(USERS_FILE);
  const updatedUsers = users.map(u => (u.id === user.id ? user : u));
  await writeJsonFile(USERS_FILE, updatedUsers);

  return res.status(201).send("Added to cart");
});

// GET /cart
router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const user = await getUserFromToken(token);
  if (!user) return res.status(401).send("Unauthorized");

  const products = await readJsonFile(PRODUCTS_FILE);
  const cartProducts = products.filter(p => user.cart.includes(p.id));

  return res.status(200).json(cartProducts);
});



export default router;
