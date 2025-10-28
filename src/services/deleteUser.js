export const deleteUser = async (id) => {
    const resp = await fetch(`http://localhost:3000/admin/deleteUser/${id}`, {
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