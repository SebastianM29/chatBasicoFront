export const registerUser = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/users/createUser',{
        method:'POST',
        body:data
    })
    const resp = await response.json()
    if (!response.ok) {
        throw new Error(resp?.msg || "error en el registro de usuario");
    }
        return resp?.data

    } catch (error) {
        throw new Error(error.message || "ServerError");
                        
    }
}