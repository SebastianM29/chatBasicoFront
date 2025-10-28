 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env



export const updateUser = async (payload) => {
   console.log('datos a actualizar',payload.userId,payload.data);
   const ENDPOINT = `${BASE_URL}/admin/editProfileUser/${payload.userId}`;
    const resp = await fetch(ENDPOINT,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload.data)
    })

    const res = await resp.json()
    if (!resp.ok) {
        throw new Error(res || "error al actualizar");
        
        
    }

    return res
}