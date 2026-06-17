// Eliminar un producto

const handleEliminateProductN = async (e, product) => {
    e.preventDefault();

    try {
        const response = fetch(`http://localhost:3000/products/delete/${product}`, {
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

export default handleEliminateProductN