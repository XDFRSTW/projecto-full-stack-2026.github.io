const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// añadir al carrito
async function addToCart(req, res) {
    const { userId, productId, ownerName, name, desrc, image, price, localization, contact } = req.body;
    try {

        const newCart = new Cart({
            userId,
            productId,
            ownerName,
            name,
            desrc,
            image,
            price,
            localization,
            contact
        });

        await newCart.save();
        res.status(201).send("Producto añadido con éxito al carrito");
    } catch (error) {
        res.status(500).json({ message: "Error al añadir el producto al carrito", error });
    }
};
// Obtener carritos
async function getCarts(req, res) {
    // res.status(200).json({ user: req.user });
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: "Ha ocurrido un error mientras intentábamos obtener los carritos", error });
    }
}
// Eliminar producto del carrito
async function deleteFromCart(req, res) {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({ message: "no se ha encontrado el producto del carrito" });
        }
        res.status(200).json(deletedCart);
    } catch (error) {
        res.status(500).json({ message: "error al eliminar el producto del carrito", error });
    }
}

// exportando funciones para enrutarlas
module.exports = { addToCart, getCarts, deleteFromCart };