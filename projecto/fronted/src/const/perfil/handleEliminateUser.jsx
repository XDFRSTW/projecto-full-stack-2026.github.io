// Eliminar tu usuario


const handleEliminateUserN = async (e, user) => {
        e.preventDefault();

        try {
            const response = fetch(`https://projecto-full-stack-2026-jn3d.vercel.app/users/delete/${user}`, {
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

export default handleEliminateUserN
