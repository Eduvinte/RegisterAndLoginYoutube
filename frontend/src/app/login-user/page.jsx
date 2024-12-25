"use client"
import Image from "next/image";
import bannerRegister from "../../images/bannerregister.jpg"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Login-user-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
const LoginUserPage = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const { user, isLoading, error, isSuccess } = useSelector(state => state.loginUser)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(formData))
    }

    useEffect(() => {
        if(isSuccess) {
            router.push("/dashboard")
        }
    }, [isSuccess])

    return (
        <div className="w-full flex justify-center items-center h-screen">
            <div className="flex flex-row justify-center items-center bg-white rounded-3xl w-9/12 h-2/3 shadow-xl">

                <form className="flex flex-col justify-center items-center w-full gap-10" onSubmit={handleSubmit}>
                    <h1 className="text-6xl font-bold text-center font-contrailOne ">Iniciar sesión</h1>

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
                   
                    <button type="submit" className="w-4/5 h-10 rounded-3xl bg-blue-500 text-white">Iniciar sesión</button>
                    <span className="text-sm text-gray-500">¿No tienes una cuenta? <Link href="/register-user" className="text-blue-500">Registrate</Link></span>
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

export default LoginUserPage;