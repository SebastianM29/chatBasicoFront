

export const getAllProducts = async() => {
    const res = await fetch('/admin/allProducts',{
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