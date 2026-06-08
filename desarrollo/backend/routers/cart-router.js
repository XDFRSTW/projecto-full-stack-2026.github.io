const express = require("express");
const { addToCart, getCarts, deleteFromCart} = require("../controllers/cart-controller");
const authMiddleware = require("../middlewares/auth");

const cartRouter = express.Router();

// router para añadir producto al carrito
cartRouter.post("/add", addToCart);
// router para obtener los datos de los carritos
cartRouter.get("/", getCarts)
// router para eliminar producto del carrito
cartRouter.delete("/delete/:id", deleteFromCart)

module.exports = cartRouter;