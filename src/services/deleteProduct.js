 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env


export const deleProduct = async (id) => {
    const ENDPOINT = `${BASE_URL}/admin/deleteProduct/${id}`;
    try {
        const resp = await fetch (ENDPOINT, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include'
        })
        const value = await resp.json()
         
        if (!resp.ok) {
            throw new Error( value.msg || "error al eliminar datos");
            
            
        }
        
        return value
        
    } catch (error) {
        console.error('que se ve',error);
        
        throw new Error("intente luego, error de servidor");
        
    }

   }

