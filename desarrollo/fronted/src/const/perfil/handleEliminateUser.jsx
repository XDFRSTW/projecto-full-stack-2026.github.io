// Eliminar tu usuario

const handleEliminateUser = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`http://localhost:3000/users/delete/${user}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("No se ha podidoeliminar al usuario", error);
        }
        navigate("/")
    }

export default handleEliminateUser
