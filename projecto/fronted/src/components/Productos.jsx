import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import pencil from "../images/pencil.svg"
import trash from "../images/trash.svg"


const Productos = () => {
    // Respecto a eliminar producto

    let [productId, setProductId] = useState("");
    let [productDelete, setProductDelete] = useState("no");

    // Datos del usuario
    let [userImage, setUserImage] = useState("");
    let username = localStorage.getItem("User");
    let user = localStorage.getItem("Id");

    let [list, setList] = useState([]);



    // Hablamos del producto

    // Id usuario
    let [userId, setUserId] = useState(user);
    // Nombre usuario
    let [ownerName, setOwnerName] = useState(username);
    // Nombre producto
    let [name, setName] = useState("");
    // Descripción producto
    let [desrc, setDesrc] = useState("");
    // Enlace de la imagen
    let [image, setImage] = useState("");
    // Precio delproducto
    let [price, setPrice] = useState("");
    // Localización del producto
    let [localization, setLocalization] = useState("");
    // Contacto con el dueño
    let [contact, setContact] = useState("");

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
    // Debería usarse useEffect para ejecutar esta porción de código. No lo use porque no es necesario (al parecer si que lo acabé usando)
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
        fetch("https://produccion-livid.vercel.app/products")
            .then((response) => response.json())
            .then((data) => setList(list = data.filter((dat) => dat.userId == user)))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }, [])

    // setList(list = data.filter((dat) => dat.userId == user))

    // Función para el botón de eliminar producto (Da error en consola, pero de todas formas funciona)

    // useEffect(() => {
    //     if (productDelete =! "no") {
    //         try {
    //             const response = fetch(`https://produccion-livid.vercel.app/products/delete/${productDelete}`, {
    //                 method: "DELETE",
    //                 headers: { "Content-Type": "application/json" }
    //             });
    //             if (response.ok) {
    //                 history("/")
    //             }
    //         } catch (error) {
    //             console.error("No se ha podido eliminar el producto", error);
    //         }
    //         navigate("/Productos")
    //     }
    // }, [productDelete])



    // function handleDelete() {
    //     try {
    //         const response = fetch(`https://produccion-livid.vercel.app/products/delete/${productDelete}`, {
    //             method: "DELETE",
    //             headers: { "Content-Type": "application/json" }
    //         });
    //         if (response.ok) {
    //             history("/")
    //         }
    //     } catch (error) {
    //         console.error("No se ha podido eliminar el producto", error);
    //     }
    //     navigate("/Productos")
    // }

    // Función para editar el producto

    useEffect(() => {
        localStorage.setItem("product", productId);
    }, [productId])

    return (
        <>
            {/* Encabezado épicamente wendingo */}
            <header className="averageHeader bg-gray-500 flex">
                <h2>Tus productos</h2>
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
                                <button className="averageButton averageIcon" onClick={() => setProductId(productId = cont._id)}><a href="/editar"><img src={pencil} alt="editar" title="editar el producto" /></a></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Productos