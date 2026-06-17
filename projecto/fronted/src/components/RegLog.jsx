import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'

// Resumen de vercel : los servidores a veces van mal, otras van bien

const RegLog = () => {
    // Evitar problemas de duplicadode usuario
        localStorage.removeItem("User");
        localStorage.removeItem("Image");
        localStorage.removeItem("Desolation");
        localStorage.removeItem("Id");
    // Alternamos mediante un botón si queremos registrarnos o iniciar sesión
    let [regLog, setAction] = useState(true);
    // Los datos de los usuarios
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [userImage, setUserImage] = useState("https://i.pinimg.com/originals/9d/7c/74/9d7c745207ba381b7bc4d41912ef4196.jpg?nii=t");
    let [adminLv, setAdminLv] = useState("averageUser");
    // Niveles de administrador
    // averageUser
    // webAdminUser
    // laRuga
    // constante importada
    const history = useNavigate();
    const navigate = useNavigate();
    // evitar repeticiones de los nombres de usuario en la base de datos
    let [rejectRegister, setReject] = useState(false);
    // mensaje para el usuario
    let [message, setMessage] = useState("");



    //    Reiniciar valores
    // const handleReset = () => {
    //     setTimeout(() => {
    //         setMessage(message = "")
    //     }, (2000))
    //     setReject(rejectRegister = false)
    // }

    // Función para registrarse
    const handleRegister = async (e) => {
        e.preventDefault();
        // http://localhost:3000/users
        // https://projecto-full-stack-2026-jn3d.vercel.app/users

        // Nos aseguramos antes de nada que el nombre de usuario no exista
        fetch("https://produccion-livid.vercel.app/users")
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
                    const response = fetch("https://produccion-livid.vercel.app/users/register", {
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

    // Función para iniciar sesión, aún en producción
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // http://localhost:3000/users/login
            // https://projecto-full-stack-2026-jn3d-j715ok8fw.vercel.app/users/login

            // Conectando la base de datos
            const response = await fetch("https://produccion-livid.vercel.app/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, userImage })
            });
            if (response.ok) {
                // http://localhost:3000/users
                // https://projecto-full-stack-2026-jn3d-j715ok8fw.vercel.app/users

                fetch("https://produccion-livid.vercel.app/users")
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

    return (
        <>
            {/* Como usar he usado tailwind */}
            <div className="regLog-border bg-gray-900/20">
                <div className="regLog-center flex">

                    {/* Título de la web */}
                    <header className="regLog-flex flex mt-4">
                        <h1 className="regLog-title">Galena</h1>
                    </header>

                    {/* Imagen del mineral "Galena" */}
                    <div className="regLog-flex flex mt-28"><img className="regLog-Image" src="Galena.png" alt="Galena" title="Galena" /></div>

                    {/* Información proporcionada al usuario */}
                    <div className="regLog-info regLog-flex flex">
                        <p className="regLog-info-text mt-12">Una vez registrado, vuelve a introducir los datos seleccionando la opción "Iniciar sesión" (si no sucede nada es porque el usuario no existel). La creación del usuario puede llevar un rato, un mensaje por pantalla te avisará de ello (a veces el mensaje se equivoca y no se crea el usuario)||(si al registrarse le sale el mensaje: "El nombre de usuario ya existe", reinicie la página e introduzca otro usuario, de lo contrariao siempre aparecerá dicho mensaje)[Si nota que la página no funciona correctamente, lo más probable será que el servido este fallando].</p>
                    </div>

                    <div className="regLog-flex regLog-averageFontSize flex mt-12">
                        {/* Botones para intercalar la funcionalidad del formulario */}
                        <button className={regLog == true ? ("regLog-mark button") : ("regLog-regLog button")} onClick={() => setAction(regLog = true)}>Registrarse</button>
                        <button className={regLog == false ? ("regLog-mark button") : ("regLog-regLog button")} onClick={() => setAction(regLog = false)}>Iniciar sesión</button>
                    </div>

                    <div className="regLog-averageFontSize flex mt-24">
                        {/* Formulario para iniciar sesión o registrarse */}
                        <form className="regLog-column flex bg-gray-200" onSubmit={regLog == true ? handleRegister : handleLogin}>

                            {/* Nombre usuario */}
                            <label htmlFor="name">Nombre de usuario : </label>
                            <input value={username} type="text" title="name" placeholder="*escribe"
                                required id="name" onChange={(e) => setUsername(e.target.value)} />
                            {/*  Contraseña */}
                            <label htmlFor="pin">Contraseña : </label>
                            <input value={password} type="password" title="pin" placeholder="*escribe"
                                required id="pin" onChange={(e) => setPassword(e.target.value)} />

                            {/* Botón para subir datos */}
                            <button className="button" type="submit">Enviar</button>

                        </form>
                    </div>

                    <p className="regLog-averageFontSize">{message}</p>
                </div>

            </div>
            <footer className="regLog-footer flex bg-gray-100">
                <p className="mt-24">[Cualquier inconveniente llamar a este número: +58 285 501 66 87 33]</p>
            </footer>

        </>
    )
}

export default RegLog