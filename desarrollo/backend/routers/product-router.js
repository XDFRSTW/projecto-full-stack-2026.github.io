const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct} = require("../controllers/product-controller");
const authMiddleware = require("../middlewares/auth");

const productsRouter = express.Router();

// router para crear producto
productsRouter.post("/create", createProduct);
// no le veo utilidad a este router en los productos
// router.post("/register", userRegister);
// router para obtener los datos de productos
productsRouter.get("/", getProducts)
// router para cambiar los datos del producto
productsRouter.put("/update/:id", updateProduct)
// router para eliminar producto
productsRouter.delete("/delete/:id", deleteProduct)

module.exports = productsRouter;