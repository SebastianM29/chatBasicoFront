export const updateUser = async (payload) => {
   console.log('datos a actualizar',payload.userId,payload.data);
    const resp = await fetch(`http://localhost:3000/admin/editProfileUser/${payload.userId}`,{
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