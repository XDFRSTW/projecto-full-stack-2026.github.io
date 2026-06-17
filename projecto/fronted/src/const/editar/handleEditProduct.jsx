// Editar un producto

const handleEditProductN = async (e, product, name, desrc, image, price, localization, contact) => {
    e.preventDefault();

    try {
        const response = fetch(`https://projecto-full-stack-2026-jn3d.vercel.app/products/update/${product}`, {
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

export default handleEditProductN