import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"
import galaxia from "../images/galaxia.png"
import cart from "../images/cart.svg"
import trash from "../images/trash.svg"

const Home = () => {
    // Eliminar producto
    let [idToEliminate, setIdToEliminate] = useState("");
    // Por si acaso

    const history = useNavigate();
    const navigate = useNavigate();

    // Respecto a mostrar todos los productos existente (el código que yo voya usar no serviría para páginas con bases de datos
    //  de tamaños importantes, por el tiempo que tardaría en cargar (en las típicas tiendas de productos suelen mostrarse de 
    // poco en poco para no saturar la computadora, ya que cargar cientos de miles de recursos del tirón puede llevar largo rato))

    // Aquí se guardan todos los productos existentes
    let [list, setList] = useState([]);

    //    Menú desplegable
    let [panel, setPanel] = useState(false);
    // let [rainbowMode, setRainbowMode] = useState(false);   Adios al modo arcoiris


    // El buscador de productos (filtro, aunque use filtro para todo), el carrito y datos del usuario

    let [search, setSearch] = useState(localStorage.getItem("search"));
    let [carts, setCarts] = useState("");
    let userId = localStorage.getItem("Id");
    let adminLv = localStorage.getItem("admin")

    // Preparamos el local storage
    localStorage.setItem("Image", "userImage")

    // Hablamos del producto


    // Nombre usuario
    let [ownerName, setOwnerName] = useState("");
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


    // Variable importante para el funcionamiento de la página (el motivo de estar en mayúscula es otro, al igual de no tener nada quever el nombre con su función. Guarda la contraseña del usuario)
    let Desolation = localStorage.getItem("Desolation");

    // Sistema para autentificar usuario
    // Para que las listas funcionen
    let length = 0;
    // Buscamos el espacio del array en el que se encuentra el usuario
    function fetchFix() {
        fetch("https://produccion-livid.vercel.app/users")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat.password == Desolation ? length = index : console.log(); }))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }
    // Si la contraseña no vale esto, se ejecuta el código
    if (Desolation != "Not yet") {
        useEffect(() => {
            fetchFix()
            if (Desolation) {
                fetch("https://produccion-livid.vercel.app/users", {
                    headers: {
                        Authorization: `Bearer ${Desolation}`,
                    },
                })
                    // console.log(data.username))
                    .then((response) => response.json())
                    .then((data) => localStorage.setItem("Id", data[length]._id))
                    .catch((error) => console.error("Error al obtener el usuario", error));
                // , localStorage.setItem("Desolation", "Not yet")
            }
        }, []);
    }

    // Función para coger los datos de los productos, una y  otra vez
    function handleNewData() {
        localStorage.setItem("search", search)

    }

    // Esto se ejecuta la primera vez que se abre la página

    useEffect(() => {
        if (search == "") {
            fetch("https://produccion-livid.vercel.app/products")
                .then((response) => response.json())
                // No se lo que he hecho con este código, pero si funciona, no se toca
                .then((data) => setList(list = data.filter((dat) => dat)))
                .catch((error) => console.error("Error al obtener el producto", error));
        }
        else {
            fetch("https://produccion-livid.vercel.app/products")
                .then((response) => response.json())
                .then((data) => setList(list = data.filter((dat) => dat.name == search)))
                .catch((error) => console.error("Error al obtener el producto", error));
        }
    }, []);

    // data.map((dat, index) => { setList(list.push(dat)), console.log(list) })
    // setList(data.map((dat, index) => {list.push(dat), console.log(list)}))
    // ._id = "69dfae13f7498f699ddafed1"

    // Añadir objeto al carrito
    async function handleAddToCart(id) {
        let productId = id;
        try {
            const response = fetch("https://produccion-livid.vercel.app/carts/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId, ownerName, name, desrc, image, price, localization, contact })
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("Error al crear el producto", error);
        }
    }

    // Eliminar productos

    const handleEliminateProduct = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`https://produccion-livid.vercel.app/products/delete/${idToEliminate}`, {
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
            {/* Título */}
            <header className="home-header flex bg-gray-500">

                {/* Menú desplegable */}
                <button onClick={() => panel == false ? setPanel(panel = true) : setPanel(panel = false)} className="home-left">
                    <img className="home-icons" src={menu} alt="menú" />
                </button>

                {/* Menú que se muestra al pulsar el botón */}
                <div className={panel == true ? ("home-panel perfil-showPanel") : ("perfil-deletePanel invisible perfil-fontSize")}>
                    <a className="home-routes" href="/Perfil">Mi perfil</a>
                    <a className="home-routes" href="/Productos">Mis productos</a>
                    <a className="home-routes" href="/Carrito">Mi carrito</a>
                </div>

                <h1 className="home-title">Galena</h1>

                <div className={adminLv == "webAdminUser" ? "home-right" : "invisible"}>
                    <a href="/Admin" title="admin" className={adminLv == "webAdminUser" ? "home-icons" : "invisible"}>Admin</a>
                </div>

            </header>

            {/* Contenido principal */}
            <main>

                {/* Buscador */}
                <div>
                    <form className="line" onSubmit={handleNewData}>
                        <button title="buscar productos" className="home-iconsLupa" type="submit"><img src={lupa} alt="buscar" /></button>
                        <input title="buscador" type="text" placeholder="buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>

                {/* Resultados (Modelo de productos sacados de la página "productos", además del código) */}
                <div className="bg-gray-300 productsBox">
                    {/* Una vez más usamos index como key, pero en el caso de esta página, no resulta efectosnegativos enel rendimiento, o al menos así aparenta ser */}
                    {list.map((cont, index) => (

                        <div className="productBox" key={index}>
                            <div>
                                <span className="font-bold">{cont.name} </span>
                                <button className={adminLv == "webAdminUser" ? "averageButton averageIcon font-bold" : "invisible"} onClick={() => setIdToEliminate(idToEliminate = cont._id)}> |Seleccionar| </button>
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
                                <button className="averageButton averageIcon button" onClick={() => {handleAddToCart(cont._id), setContact(contact = cont.contact),
                                    setLocalization(localization = cont.localization), setDesrc(desrc = cont.desrc), setImage(image = cont.image),
                                    setName(name = cont.name), setOwnerName(ownerName = cont.ownerName), setPrice(price = cont.price)
                                }}><img src={cart} alt="editar" title="editar el producto" /></button>
                                <button className={adminLv == "webAdminUser" ? "averageButton averageIcon ml-10" : "invisible"} onClick={handleEliminateProduct}>
                                    <img src={trash} alt="eliminar" title="eliminar el producto" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Home