import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"

// Comentario : a veces la página se rompe por completo y no funciona. Se arregla esperando un rato

const PassPage = () => {
    // Estos cachos de código se encuentran en todos los archivos por que son necesarios para que la web  no se rompa. Aun así, creo que añadiendo la página de paso se puede eliminar dicho código del resto de páginas
    const navigate = useNavigate();

    let [userImage, setUserImage] = useState("");
    let username = localStorage.getItem("User");
    let user = localStorage.getItem("Id");

    let Desolation = localStorage.getItem("Desolation");
    let length = 0;
    function fetchFix() {
        fetch("https://produccion-livid.vercel.app/users")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat.password == Desolation ? length = index : console.log(), dat.password == Desolation ? setUserImage(userImage = dat.userImage) : console.log() }))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }
    // Debería usarse useEffect para ejecutar esta porción de código. No lo use porque no es necesario
    if (Desolation != "Not yet") {
        useEffect(() => {
            fetchFix()
            if (Desolation) {
                fetch("https://produccion-livid.vercel.app/users", {
                    headers: {
                        Authorization: `Bearer ${Desolation}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => localStorage.setItem("User", data[length].username))
                    .catch((error) => console.error("Error al obtener el usuario", error));
                // , localStorage.setItem("Desolation", "Not yet")
                fetch("https://produccion-livid.vercel.app/users", {
                    headers: {
                        Authorization: `Bearer ${Desolation}`,
                    },
                })
                    // console.log(data.username))
                    .then((response) => response.json())
                    .then((data) => localStorage.setItem("Id", data[length]._id))
                    .catch((error) => console.error("Error al obtener el usuario", error));
            }
        }, []);
    }
    setTimeout(() => {
        navigate("/home")
    },50)

    return (
        <>
            Cargando... .
        </>
    )
}

export default PassPage