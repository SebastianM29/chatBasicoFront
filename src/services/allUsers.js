
const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env


export const allUSers = async () => {

    const ENDPOINT = `${BASE_URL}/admin/allUser`;
    try {
        const res = await fetch(ENDPOINT,{
            method:'GET',
            credentials: 'include'
        })
        const resp = await res.json()
        if (!res.ok) {
            throw new Error(resp?.msg || 'Error al obtener ususarios');
        }
        console.log('todos los ususariops',resp.users);
        
        return resp.users
        
    } catch (error) {
        throw new Error(error.message);
        
    }


}