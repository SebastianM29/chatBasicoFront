export const updateProducts = async({id,productUpd}) => {
    console.log('viendo id y prod',id,productUpd);
    
    const resp = await fetch(`http://localhost:3000/admin/updateProduct/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(productUpd)

    })
    const data = await resp.json()
    if(!resp.ok){
        throw new Error(data.msg || "Error al actualizar el producto");
        
    }

    return data
    


    }