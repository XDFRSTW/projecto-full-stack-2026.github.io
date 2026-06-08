const mongoose = require("mongoose");
// Módelo de producto en la base de datos
const productSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    ownerName: {type: String, required: true},
    name: {type: String, required: true},
    desrc: {type: String, required: true},
    image : {type: String, required: true},
    price : {type: String, required: true},
    localization : {type: String, required: true},
    contact : {type: String, required: true}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// Esto de aquí es para copiar y pegar rápidamente el modelo de producto a portman
// "userId": "non",
//     "ownerName": "paco" ,
//     "name": "meowmere",
//     "desrc": "repiola hermano",
//     "image" : "",
//     "price" : 0,
//     "localization" : "non",
//     "contact" : "non"