
 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env


export const deleteUser = async (id) => {
    const resp = await fetch(`${BASE_URL}/admin/deleteUser/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        credentials:'include'
})

const res = await resp.json()
if (!resp.ok) {

    throw new Error(res.msg || "Error al eliminar usuario");
    
    
}
return res.user
}