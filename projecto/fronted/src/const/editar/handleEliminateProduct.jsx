// Eliminar un producto

const handleEliminateProductN = async (e, product) => {
    e.preventDefault();

    try {
        const response = fetch(`https://projecto-full-stack-2026-jn3d.vercel.app/products/delete/${product}`, {
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