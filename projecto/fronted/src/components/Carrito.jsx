import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import pencil from "../images/pencil.svg"
import trash from "../images/trash.svg"


const Carrito = () => {
    // Eliminar del carrito

    let [cartDelete, setCartDelete] = useState("");

    // Datos del usuario
    let [userImage, setUserImage] = useState("");
    let username = localStorage.getItem("User");
    let user = localStorage.getItem("Id");

    let [list, setList] = useState([]);

    // Hablamos del carrito

    // Id usuario
    let [userId, setUserId] = useState("");
    // Nombre usuario
    let [productId, setproductId] = useState("");

    // Needed

    const history = useNavigate();
    const navigate = useNavigate();

    // Este código necesita ejecutarse dos veces para funcionar

    let Desolation = localStorage.getItem("Desolation");
    let length = 0;
    function fetchFix() {
        fetch("https://produccion-livid.vercel.app/users")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat.password == Desolation ? length = index : console.log(), dat.password == Desolation ? setUserImage(userImage = dat.userImage) : console.log() }))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }
    // Debería usarse useEffect para ejecutar esta porción de código. No lo use porque no es necesario (alparecer si que lo acabé usando)
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


    // Para que se muestren solo los productos del usuario

    useEffect(() => {
        fetch("https://produccion-livid.vercel.app/carts")
            .then((response) => response.json())
            .then((data) => setList(list = data.filter((dat) => dat.userId == user)))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }, [])

    // setList(list = data.filter((dat) => dat.userId == user))

    // Función para el botón de eliminar del carrito


    function handleDelete() {
        console.log(1)
        try {
            const response = fetch(`https://produccion-livid.vercel.app/carts/delete/${cartDelete}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("No se ha podido eliminar del carrito", error);
        }
    }

    return (
        <>
            {/* Encabezado épicamente wendingo */}
            <header className="averageHeader bg-gray-500 flex">
                <h2>Tu carrito</h2>
            </header>
            {/* Apartado principal de la página */}
            <main>
                {/* Volver */}
                <div className="averageMargin"><a className="averageVolver averageMargin button" href="/home">Volver</a></div>
                {/* Contenedor que contiene todos los productos */}
                <div className="bg-gray-300 productsBox">
                    {/* No hay problema por usar index como llave en este caso debido a que la lista no puede ser modificada en esta página, lo cual impide problemas con las listas */}
                    {list.map((cont, index) => (
                        <div className="productBox" key={index}>
                            <div>
                                <span className="font-bold">{cont.name} </span>           
                                <p className="productText text-2xl mb-4"><span className="underline">Precio:</span> {cont.price}</p>
                            </div>
                            <div>
                                <img loading="lazy" className="border border-gray-900 productImage" src={cont.image} alt="imagen" />
                                <div className="border border-gray-900 p-2 font-bold">
                                    <span>{cont.ownerName}; </span>
                                    <span> {cont.contact}; </span>
                                    <span> {cont.localization}</span>
                                </div>
                            </div>
                            <div>
                                <p className=" p-2 productText">{cont.desrc} </p>
                            </div>
                            <div className="buttonsBox">
                                <button className="averageButton averageIcon button" onClick={() => { setCartDelete(cartDelete = cont._id), handleDelete(), console.log(2) }}><img src={trash} alt="edliminar" title="eliminar el producto" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Carrito