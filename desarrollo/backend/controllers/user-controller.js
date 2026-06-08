const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// registrar usuarios
async function userRegister(req, res) {
    const { username, password, userImage, adminLv } = req.body;
    try {
        // const salt = await bcrypt.genSalt(10);

        const newUser = new User({
            username,
            password,
            userImage,
            adminLv
        });

        await newUser.save();
        res.status(201).send("Usuario registrado");
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error });
    }
};
// iniciar sesión con usuario
async function userLogin(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error en el inicio de sesión", error });
    }
}
// Obtener datos de usuario
async function getUser(req, res) {
    // res.status(200).json({ user: req.user });
    console.log(1)
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Ha ocurrido un error mientras intentábamos obtener su usuario", error });
    }
}
// Actualizar usuario
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { username, password, userImage, adminLv } = req.body;
        const updateUser = await User.findByIdAndUpdate(id, {
            username,
            password,
            userImage,
            adminLv
        });
        if (!updateUser) {
            return res.status(404).json({ message: "no se ha encontrado al usuario" });
        }
        res.status(200).json(updateUser);
    }
    catch (error) {
        res.status(500).json({ message: "error al actualizar el usuario", error });
    }
}
// Eliminar usuario
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "no se ha encontrado al usuario" });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: "error al eliminar al usuario", error });
    }
}

// exportando funciones para enrutarlas
module.exports = { userRegister, userLogin, getUser, updateUser, deleteUser };