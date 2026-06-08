const express = require("express");
const { userRegister, userLogin, getUser, updateUser, deleteUser } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth");

const userRouter = express.Router();

// router para iniciar sesión
userRouter.post("/login", userLogin);
// router para registrarse
userRouter.post("/register", userRegister);
// router para obtener los datos del usuario
userRouter.get("/", getUser)
// router para cambiar los datos del  usuario
userRouter.put("/update/:id", updateUser)
// router para eliminar usuario
userRouter.delete("/delete/:id", deleteUser)

module.exports = userRouter;