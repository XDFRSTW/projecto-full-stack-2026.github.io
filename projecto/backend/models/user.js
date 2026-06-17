const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Módelo de usuario en la base de datos
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    userImage : {type: String, required: true},
    adminLv : {type: String, required: true}

});
// Generar una contraseña aleatoria a partir de la introducida
userSchema.pre("save", async function() {
     if(!this.isModified("password"));
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 })

const User = mongoose.model("User", userSchema);

module.exports = User;

// Esto de aquí es para copiar y pegar rápidamente el modelo de usuario a portman
// "username": "pablo",
//     "password": "123",
//     "userImage" : "https://i.pinimg.com/originals/9d/7c/74/9d7c745207ba381b7bc4d41912ef4196.jpg?nii=t",
//     "userDescr" : "lo suponía",
//     "adminLv": "0" 