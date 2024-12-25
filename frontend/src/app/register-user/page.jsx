"use client"
import Image from "next/image";
import bannerRegister from "../../images/bannerregister.jpg"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/Register-user-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
const RegisterUserPage = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const { user, isLoading, error, isSuccess } = useSelector(state => state.user)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        height: "",
        weight: "",
        age: "",
        gender: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(formData))
    }

    useEffect(() => {
        if(isSuccess) {
            router.push("/login-user")
        }
    }, [isSuccess])

    return (
        <div className="w-full flex justify-center items-center h-screen">
            <div className="flex flex-row justify-center items-center bg-white rounded-3xl w-9/12 h-2/3 shadow-xl">

                <form className="flex flex-col justify-center items-center w-full gap-10" onSubmit={handleSubmit}>
                    <h1 className="text-6xl font-bold text-center font-contrailOne ">Registrar</h1>
                    <input
                        type="text"
                        placeholder="Nombre y Apellido"
                        className="w-4/5 h-10 border-2 border-gray-300 pl-2 rounded-3xl"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-4/5 h-10 border-2 border-gray-300 pl-2 rounded-3xl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-4/5 h-10 border-2 border-gray-300 pl-2 rounded-3xl"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Altura"
                        className="w-4/5 h-10 border-2 border-gray-300 pl-2 rounded-3xl"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Peso"
                        className="w-4/5 h-10 border-2 border-gray-300 pl-2 rounded-3xl"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Edad"
                        className="w-4/5 h-10 border-2 border-gray-300 pl-2 rounded-3xl"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                    <select className="w-4/5 h-10 border-2 border-gray-300 pl-2 rounded-3xl"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="" disabled>Selecciona tu género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <button type="submit" className="w-4/5 h-10 rounded-3xl bg-blue-500 text-white">Registrar</button>
                    <span className="text-sm text-gray-500">¿Ya tienes una cuenta? <Link href="/login-user" className="text-blue-500">Iniciar sesión</Link></span>
                </form>

                <div className="w-full h-full flex justify-center items-center">
                    <Image src={bannerRegister} alt="banner"
                        className="w-full h-full object-cover rounded-tr-3xl rounded-br-3xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterUserPage;