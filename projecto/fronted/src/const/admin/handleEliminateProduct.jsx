// Aunque la constante diga product, lo que elimina es a los usuarios
// Eliminar cualquier usuario, solo para admins

const handleEliminateProductN = async (e, idToEliminate) => {
        e.preventDefault();

        try {
            const response = fetch(`https://projecto-full-stack-2026-jn3d.vercel.app/users/delete/${idToEliminate}`, {
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

export default handleEliminateProductN