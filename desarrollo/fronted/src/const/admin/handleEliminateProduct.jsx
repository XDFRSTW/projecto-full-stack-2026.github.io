// Aunque la constante diga product, lo que elimina es a los usuarios
// Eliminar cualquier usuario, solo para admins

const handleEliminateProduct = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`http://localhost:3000/users/delete/${idToEliminate}`, {
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

export default handleEliminateProduct