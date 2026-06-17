import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"
import trash from "../images/trash.svg"

// Comentario : a veces la página se rompe por completo y no funciona. Se arregla esperando un rato

const Editar = () => {
    // Id del producto y para coger los datos de este
    let product = localStorage.getItem("product")
    let [productData, setProductData] = useState("")




    // Datos del usuario
    let [userImage, setUserImage] = useState("");
    let username = localStorage.getItem("User");
    let user = localStorage.getItem("Id");



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

    // Función para coger los datos del producto

    useEffect(() => {
        fetch("https://produccion-livid.vercel.app/products")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat._id == product ? setProductData(productData = dat) : console.log() }))
            .catch((error) => console.error("Error al obtener el usuario", error));
        // Lo que continúa despues de hacer fetch
        setTimeout(() => {
            setOwnerName(ownerName = productData.ownerName);
            setContact(contact = productData.contact);
            setDesrc(desrc = productData.desrc);
            setImage(image = productData.image);
            setLocalization(localization = productData.localization);
            setPrice(price = productData.price);
            setName(name = productData.name)
            console.log(productData)
        }, 500)
    }, [])


    // Función para editar el producto
    const handleEditProduct = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`https://produccion-livid.vercel.app/products/update/${product}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, desrc, image, price, localization, contact })
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("Error al editar el producto", error);
        }

    }
    // Eliminar el producto 
    const handleEliminateProduct = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`https://produccion-livid.vercel.app/products/delete/${product}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("No se ha podido eliminar el producto", error);
        }
        navigate("/home")
    }


    return (
        <>
            {/* Encabezado épicamente wendingo (recuerde que como usar estoy usando tailwind) */}
            <header className="averageHeader bg-gray-500 flex">
                <h2>Producto a editar</h2>
            </header>
            {/* 1000 veces la misma clase Css en el mismo contenedor, porque las cosas bellas deberían repetirse siempre */}
            <main className="main">
                {/* Te lleva a la página principal para evitar que el usuario se tope con errores de la página */}
                <div><a className="button editar-volver" href="/productos" title="volver">Volver</a></div>

                {/* Producto que vas a editar */}
                <div className="main">
                    {/* Contenedor del producto a editar */}
                    {/* Reutilizando clases (por eso prefiero usar css directamente antes que tailwind) */}
                    <div className="bg-gray-300">
                        <div className="productBox">
                            <div>
                                <span>{name} : </span>
                                <span> {price}</span>
                            </div>
                            <div>
                                <img loading="lazy" className="border border-gray-900" src={image} alt="imagen" />
                                <p className="border border-gray-900 p-2">{desrc}</p>
                            </div>
                            <div className="data">
                                <span>{ownerName}; </span>
                                <span> {contact}; </span>
                                <span> {localization}</span>
                            </div>
                            <div className="buttonsBox">
                                <button className="averageButton averageIcon buttonRight editar-buttonFix" onClick={handleEliminateProduct}>
                                    <img src={trash} alt="eliminar" title="eliminar el producto" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Editar el producto que visualizas en pantalla */}
                < div className="main mt-64">
                    {/* Título del formulario (afuera de este para que no le afecte la propiedad flex) */}
                    <h2 className="perfil-formTitle border-t border-black-900">Editar producto</h2>
                    {/* Formulario para crear un producto */}
                    <form className="perfil-form" onSubmit={handleEditProduct}>
                        {/* Datos del producto */}

                        {/* Nombre */}
                        <div className="perfil-formBoxes">
                            <label className="label" htmlFor="name" title="Escribe el nombre de tu producto">Nombre del producto</label>
                            <input className="input" id="name" type="text" placeholder="*escribe"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        {/* Descripción */}
                        <div className="perfil-formBoxes">
                            <label className="label" htmlFor="des" title="Cuentanos algo sobre tu producto">Descripción del producto</label>
                            <input className="input" id="des" type="text" placeholder="*escribe"
                                value={desrc} onChange={(e) => setDesrc(e.target.value)} />
                        </div>

                        {/* Imagen */}
                        <div className="perfil-formBoxes">
                            <label className="label" htmlFor="img" title="Pega el enlace de una imagen que se parezca a tu producto">Enlace de imagen</label>
                            <input className="input" id="img" type="text" placeholder="*escribe"
                                value={image} onChange={(e) => setImage(e.target.value)} />
                        </div>

                        {/* Precio */}
                        <div className="perfil-formBoxes">
                            <label className="label" htmlFor="price" title="Escribe el precio de tu producto y su moneda">Precio del producto</label>
                            <input className="input" id="price" type="text" placeholder="*escribe"
                                value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        {/* Contacto */}
                        <div className="perfil-formBoxes">
                            <label className="label" htmlFor="contact" title="Escribe tu contacto para que los usuarios puedan dar contigo">Contacto</label>
                            <input className="input" id="contact" type="text" placeholder="*escribe"
                                value={contact} onChange={(e) => setContact(e.target.value)} />
                        </div>

                        {/* Localización */}
                        <div className="perfil-formBoxes">
                            <label className="label" htmlFor="local" title="Escribe una ubicación cercana a ti para que los usuarios sepan si les merece la pena tu producto">Localización del producto</label>
                            <input className="input" id="local" type="text" placeholder="*escribe"
                                value={localization} onChange={(e) => setLocalization(e.target.value)} />
                        </div>

                        {/* Botón para editar el producto */}
                        <div>
                            <button className="button perfil-formButton" type="Submit" title="Guardar cambios">Guardar cambios</button>
                        </div>
                    </form>
                </div >
            </main>
        </>
    )
}

export default Editar