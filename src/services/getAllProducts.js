const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://rematesargentina-backend.onrender.com";

export const getAllProducts = async() => {

    // const ENDPOINT = `http://localhost:3000/admin/allProducts`;
    const ENDPOINT = `${BASE_URL}/admin/allProducts`;
    const res = await fetch(ENDPOINT,{
            method:'GET',
            
        })
    if (!res.ok) {
        const resp = await res.json()
        console.log('error en la solicitud',res)   ;
        throw new Error( resp.msg  || 'error en la solicitud');
        
        
    }  
    
    const resp = await res.json()
    console.log(resp);
    return resp


}