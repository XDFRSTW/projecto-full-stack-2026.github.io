// Crear un producto para ser expuesto en la tienda

const handleCreateProductN = async (e, userId, ownerName, name, desrc, image, price, localization, contact) => {
        e.preventDefault();
        try {

            const response = fetch("http://localhost:3000/products/create", {
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

export default handleCreateProductN
