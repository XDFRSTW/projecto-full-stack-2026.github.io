const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// crear producto
async function createProduct(req, res) {
    const { userId, ownerName, name, desrc, image, price, localization, contact } = req.body;
    try {
        // const salt = await bcrypt.genSalt(10);

        const newProduct = new Product({
            userId,
            ownerName,
            name,
            desrc,
            image,
            price,
            localization,
            contact
        });

        await newProduct.save();
        res.status(201).send("Producto guardado con éxito");
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el producto", error });
    }
};
// No se de que va a servirme esto para los productos
// async function userLogin(req, res) {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: "Usuario no encontrado" });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Contraseña incorrecta" });
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Error en el inicio de sesión", error });
//     }
// }
// Obtener productos
async function getProducts(req, res) {
    // res.status(200).json({ user: req.user });
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Ha ocurrido un error mientras intentábamos obtener los productos", error });
    }
}
// Editar producto
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { userId, ownerName, name, desrc, image, price, localization, contact } = req.body;
        const updateProduct = await Product.findByIdAndUpdate(id, {
           userId,
            ownerName,
            name,
            desrc,
            image,
            price,
            localization,
            contact
        });
        if (!updateProduct) {
            return res.status(404).json({ message: "no se ha encontrado el producto" });
        }
        res.status(200).json(updateProduct);
    }
    catch (error) {
        res.status(500).json({ message: "error al actualizar el producto", error });
    }
}
// Eliminar productos
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "no se ha encontrado el producto" });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: "error al eliminar el producto", error });
    }
}

// exportando funciones para enrutarlas
module.exports = { createProduct, getProducts, updateProduct, deleteProduct };