// Iniciar sesión con usuario

const handleLoginN = async (e, username, password, userImage, adminLv) => {
    e.preventDefault();
    try {
        // http://localhost:3000/users/login
        // https://projecto-full-stack-2026-jn3d-j715ok8fw.vercel.app/users/login

        // Conectando la base de datos
        const response = await fetch("https://projecto-full-stack-2026-jn3d.vercel.app/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, userImage, adminLv })
        });
        if (response.ok) {
            // http://localhost:3000/users
            // https://projecto-full-stack-2026-jn3d-j715ok8fw.vercel.app/users

            fetch("https://projecto-full-stack-2026-jn3d.vercel.app/users")
                .then((response) => response.json())
                // Técnica peligrosísima para autentificar usuario.La contraseña solo está expuesta durante unos segundos
                .then((data) => data.map((dat, index) => {
                    dat.username == username ? localStorage.setItem("Desolation", dat.password) : console.log(),
                        dat.username == username ? localStorage.setItem("User", dat.username) : console.log(),
                        dat.username == username ? localStorage.setItem("admin", dat.adminLv) : console.log(),
                        dat.username == username ? localStorage.setItem("search", "") : console.log()
                }))

                .catch((error) => console.error("Error al obtener el mensaje", error));

            const data = await response.json();
            // Esto que puedes apreciar está puesto como comentario porque no hacía más que darme errores, por lo que he tenidoque optar por otros métodos para autentificar los usuarios
            // localStorage.setItem("token", data.token);
            navigate("/charging");
            // data.token
        }
    } catch (error) {
        console.error("Error al iniciar sesión", error);
        setMessage(message = "No se ha podido iniciar sesión")
    }
}

export default handleLoginN