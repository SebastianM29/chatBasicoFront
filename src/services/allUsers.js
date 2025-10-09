

export const allUSers = async () => {
    try {
        const res = await fetch('http://localhost:3000/admin/allUser',{
            method:'GET',
            credentials: 'include'
        })
        const resp = await res.json()
        if (!res.ok) {
            throw new Error(resp?.msg || 'Error al obtener ususarios');
        }
        return resp.users
        
    } catch (error) {
        throw new Error(error.message);
        
    }


}