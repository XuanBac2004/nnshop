import { Router } from "express";
import { addToCart, checkout, getCart, removeFromCart } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);
cartRouter.post("/checkout", checkout);
cartRouter.delete("/remove-cart/:productId", removeFromCart);

export default cartRouter;