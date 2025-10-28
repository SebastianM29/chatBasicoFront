 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env



export const registerUser = async (data) => {
    const ENDPOINT = `${BASE_URL}/users/createUser`;
    try {
        const response = await fetch(ENDPOINT,{
        method:'POST',
        body:data,
        credentials: 'include'
    })
    const resp = await response.json()
    if (!response.ok) {
        throw new Error(resp?.msg || "error en el registro de usuario");
    }
        return resp?.data

    } catch (error) {
        throw new Error(error.message || "ServerError");
                        
    }
}