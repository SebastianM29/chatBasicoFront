 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env



export const updateProducts = async({id,productUpd}) => {
    console.log('viendo id y prod',id,productUpd);

    const resp = await fetch(`${BASE_URL}/admin/updateProduct/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(productUpd)

    })
    const data = await resp.json()
    if(!resp.ok){
        throw new Error(data.msg || "Error al actualizar el producto");
        
    }

    return data
    


    }