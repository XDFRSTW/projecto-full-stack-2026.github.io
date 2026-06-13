const handleUserImages = async (e) => {
    e.preventDefault();

    try {
        const response = fetch(`http://localhost:3000/users/update/${user}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userImage })
        });
        if (response.ok) {
            history("/")
        }
    } catch (error) {
        console.error("Error al actualizar la imagen", error);
    }

}

export default handleUserImages
