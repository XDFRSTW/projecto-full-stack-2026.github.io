import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"

const Perfil = () => {
    // Respecto a eliminar el usuario

    let [panel, setPanel] = useState(false);


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



    // Los datos del usuario se obtienen mediante local storage

    // Este código necesita ejecutarse dos veces para funcionar

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

    // Función para ver el panel que te permite borrar el perfil 

    // Función asíncrona para borrar el perfil


    // Función para cambiar la foto de perfil del usuario
    const handleUserImage = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`https://produccion-livid.vercel.app/users/update/${user}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userImage })
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("Error al actualizar la imagen", error);
        }

    }

    // Esto no hizo falta en el projecto

    // Función para obtener los datos del usuario
    // const handleGetUser = async (e) => {
    //     console.log("Hacerlo con useEffect")
    // }

    // Función para crear productos
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {

            const response = fetch("https://produccion-livid.vercel.app/products/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, ownerName, name, desrc, image, price, localization, contact })
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("Error al crear el producto", error);
        }
        // si lo pongo en otro lado no funciona
        setName(name = "")
        setDesrc(desrc = "")
        setImage(image = "")
        setPrice(price = "")
        setLocalization(localization = "")
        setContact(contact = "")
    }

    // Eliminar al usuario

    const handleEliminateUser = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`https://produccion-livid.vercel.app/users/delete/${user}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("No se ha podidoeliminar al usuario", error);
        }
        navigate("/")
    }

    // Cerrar sesión

    function handleClose() {
        localStorage.removeItem("User");
        localStorage.removeItem("Image");
        localStorage.removeItem("Desolation");
        localStorage.removeItem("Id");
        localStorage.removeItem("admin");
        navigate("/")
    }


    return (
        <>
            {/* Encabezado */}
            < header className="perfil-header bg-gray-100/60">
                {/* Foto de perfil */}
                < div className="perfil-image">
                    <img src={userImage} alt="Foto de perfil" />
                </div >
                {/* Datos del perfil y enlace a la foto */}
                < div className="perfil-data perfil-fontSize">
                    <span title="tú" className="perfil-username">{username}</span>
                    <form className="perfil-imageForm" onSubmit={handleUserImage}>
                        <input className="input" type="text" placeholder="*escribe" value={userImage} onChange={(e) => setUserImage(e.target.value)} />
                        <button className="button perfil-imageFix" type="submit">Cambiar</button>

                    </form>

                </div >
                {/* Eliminar perfil o cerrar sesión */}
                < div className="perfil-delete perfil-fontSize">
                    <div><button className="button" onClick={() => panel == false ? setPanel(panel = true) : setPanel(panel = false)}>Eliminar perfil</button></div>
                    <div><button className="button" onClick={handleClose}>Cerrar sesión</button></div>
                </div >
                {/* ¿seguro que quieres eliminar tu perfil? */}
                < div className={panel == true ? ("perfil-deletePanel perfil-showPanel") : ("perfil-deletePanel invisible")}>
                    <p className={panel == true ? ("perfil-panelContent perfil-deleteText") : ("invisible")}>¿Estas seguro de eliminar tu perfil?</p>
                    <div className="perfil-deleteDiv">
                        <button className={panel == true ? ("perfil-marginRight button") : ("invisible button")} onClick={handleEliminateUser}>Si</button>
                        <button className={panel == true ? ("button") : ("invisible button")} onClick={() => setPanel(panel = false)}>No</button>
                    </div>

                </div >

            </header >

            {/* Contenido "principal" */}
            < main className="main">
                <div><a className="button perfil-volver" href="/Home" title="volver">Volver</a></div>
                {/* Título del formulario (afuera de este para que no le afecte la propiedad flex) */}
                <h2 className="perfil-formTitle">Crear nuevo producto</h2>
                {/* Formulario para crear un producto */}
                <form className="perfil-form" onSubmit={handleCreateProduct}>
                    {/* Datos del producto */}

                    {/* Nombre */}
                    <div className="perfil-formBoxes">
                        <label className="label" htmlFor="name" title="Escribe el nombre de tu producto">Nombre del producto</label>
                        <input className="input" id="name" type="text" placeholder="*escribe" required
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Descripción */}
                    <div className="perfil-formBoxes">
                        <label className="label" htmlFor="des" title="Cuentanos algo sobre tu producto">Descripción del producto</label>
                        <input className="input" id="des" type="text" placeholder="*escribe" required
                            value={desrc} onChange={(e) => setDesrc(e.target.value)} />
                    </div>

                    {/* Imagen */}
                    <div className="perfil-formBoxes">
                        <label className="label" htmlFor="img" title="Pega el enlace de una imagen que se parezca a tu producto">Enlace de imagen</label>
                        <input className="input" id="img" type="text" placeholder="*escribe" required
                            value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>

                    {/* Precio */}
                    <div className="perfil-formBoxes">
                        <label className="label" htmlFor="price" title="Escribe el precio de tu producto y su moneda">Precio del producto</label>
                        <input className="input" id="price" type="text" placeholder="*escribe" required
                            value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    {/* Contacto */}
                    <div className="perfil-formBoxes">
                        <label className="label" htmlFor="contact" title="Escribe tu contacto para que los usuarios puedan dar contigo">Contacto</label>
                        <input className="input" id="contact" type="text" placeholder="*escribe" required
                            value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>

                    {/* Localización */}
                    <div className="perfil-formBoxes">
                        <label className="label" htmlFor="local" title="Escribe una ubicación cercana a ti para que los usuarios sepan si les merece la pena tu producto">Localización del producto</label>
                        <input className="input" id="local" type="text" placeholder="*escribe" required
                            value={localization} onChange={(e) => setLocalization(e.target.value)} />
                    </div>

                    {/* Botón para crear el producto */}
                    <div>
                        <button className="button perfil-formButton" type="Submit" title="Crear un producto">Crear</button>
                    </div>
                </form>
            </main >
        </>
    )
}

export default Perfil