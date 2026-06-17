import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"

// Comentario : a veces la página se rompe por completo y no funciona. Se arregla esperando un rato

const Admin = () => {
    const history = useNavigate();
    const navigate = useNavigate();
    // Eliminar usuarios
    let [idToEliminate, setIdToEliminate] = useState("");
    // Buscar usuarios
    let [search, setSearch] = useState(localStorage.getItem("search"));
    // Listar usuarios
    let [list, setList] = useState([]);
    // Mostrar todos los usuarios (y buscar)
    useEffect(() => {
        if (search == "") {
            fetch("https://produccion-livid.vercel.app/users")
                .then((response) => response.json())
                .then((data) => setList(list = data.filter((dat) => dat)))
                .catch((error) => console.error("Error al obtener el usuario", error));
        }
        else {
            fetch("https://produccion-livid.vercel.app/users")
                .then((response) => response.json())
                .then((data) => setList(list = data.filter((dat) => dat.username == search)))
                .catch((error) => console.error("Error al obtener el usuario", error));
        }
    }, []);
    // Seleccionar usuario
    
    // Eliminar usuario
    const handleEliminateProduct = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`https://produccion-livid.vercel.app/users/delete/${idToEliminate}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("No se ha podido eliminar el usuario", error);
        }
    }
    // Buscar usuario
        function handleNewData() {
        localStorage.setItem("search", search)
    }

    return (
        <>
            <main className="">
                {/* Volver */}
                <div className="averageMargin"><a className="averageVolver averageMargin button" href="/home">Volver</a></div>
                {/* Buscar usuario por nombre */}
                <div>
                    <form className="line" onSubmit={handleNewData}>
                        <button title="buscar productos" className="home-iconsLupa" type="submit"><img src={lupa} alt="buscar" /></button>
                        <input title="buscador" type="text" placeholder="buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>

                <div className="productsBox bg-gray-300">
                    {/* Usuarios de la página */}
                    {list.map((cont, index) => (

                        <div className="productBox" key={index}>
                            <div>
                                <span className="font-bold underline text-lg">{cont.username}</span>
                            </div>
                            <div>
                                <img loading="lazy" className="border border-gray-900 productImage" src={cont.userImage} alt="imagen" />
                            </div>
                            <div className="admin-buttonsBox">
                                <button className="averageButton averageIcon font-bold" onClick={() => setIdToEliminate(idToEliminate = cont._id)}>Seleccionar</button>
                            </div>
                            <div className="admin-buttonsBox">
                                <button className="averageButton averageIcon font-bold" onClick={handleEliminateProduct}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Admin