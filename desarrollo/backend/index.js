// Esto es necesario para que mongoDB funcione
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
// Constantes de los módulos instalados
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
// Constantes de archivos del projecto
// Router del usuario
const userRouter = require("./routers/user-router");
// Router del producto
const productRouter = require("./routers/product-router");
// Router del carrito
const cartRouter = require("./routers/cart-router");
// Control de errores
const notFound = require("./middlewares/404");
const internalServerError = require("./middlewares/500");
// const authMiddleware = require("./middlewares/auth");

dotenv.config();

// Variables de entorno
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_UNI = process.env.MONGO_UNI;

app.get('/', (_req, res) => {
    res.send('Funciona')
})


app.use(cors({origin: "*", allowedHeaders: "*", methods: ["PUT", "GET", "POST", "DELETE"]}));
app.use(express.json());
//Conectandoa mongoo
mongoose.connect(MONGO_UNI)
    .then(() => console.log("Inicializando"))
    .catch((err => console.error("No ha podido conectarse a la base de datos", err)));
// usando el router del usuario
app.use("/users", userRouter);
// usando el router del producto
app.use("/products", productRouter);
// usando el router del carrito
app.use("/carts", cartRouter);
// app.use(authMiddleware);
app.use(notFound);
app.use(internalServerError);

app.listen(PORT, () => {
    // Envía este mensaje por consola si se conecta a mongoose
    console.log(`listening at http://localhost:${PORT}`)
})
