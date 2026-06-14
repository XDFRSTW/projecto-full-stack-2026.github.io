// Eliminar un producto, solo admins

const handleEliminateProduct = async (e) => {
    e.preventDefault();

    try {
        const response = fetch(`http://localhost:3000/products/delete/${idToEliminate}`, {
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

export default handleEliminateProduct