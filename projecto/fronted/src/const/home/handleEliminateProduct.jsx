// Eliminar un producto, solo admins

const handleEliminateProductN = async (e, idToEliminate) => {
    e.preventDefault();

    try {
        const response = fetch(`https://projecto-full-stack-2026-jn3d.vercel.app/products/delete/${idToEliminate}`, {
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