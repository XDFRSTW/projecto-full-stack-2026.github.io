// Registrar usuario

const handleRegister = async (e) => {
    e.preventDefault();
    // http://localhost:3000/users
    // https://projecto-full-stack-2026-jn3d.vercel.app/users

    // Nos aseguramos antes de nada que el nombre de usuario no exista
    fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => data.map((dat, index) => { dat.username == username ? setReject(rejectRegister = true) : console.log() }))
        .catch((error) => console.error("Error al obtener el mensaje", error));

    // Evitar que se creen usuarios con el mismo nombre
    if (rejectRegister == true) {
        setMessage(message = "El nombre de usuario ya existe")
    }
    // Si no existe el nombre de usuario, creamos el usuario
    // Esperamos unos segundos para confirmar si existe el usuario
    setTimeout(() => {
        if (rejectRegister == false) {

            // http://localhost:3000/users/register
            // https://projecto-full-stack-2026-jn3d-j715ok8fw.vercel.app/users/register

            try {
                // await ha sido eliminado del fetch para que no se repitan los nombres de usuario (era la solución más simple que había podido encontrar)
                const response = fetch("http://localhost:3000/users/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password, userImage, adminLv })
                });
                if (response.ok) {
                    // Cambiando valores de los inputs a "" para que se vea bonito
                    setUsername(username = "")
                    setPassword(password = "")
                    history("/")
                    handleReset();
                }
                // mensaje de usuario creado
                setMessage(message = "Usuario creado con éxito. Prueba a iniciar sesión")
            } catch (error) {
                console.error("Error al registrar el usuario", error);
                setMessage(message = "No se ha podido crear el usuario")
            }
        }
    }, (1000))

}

export default handleRegister