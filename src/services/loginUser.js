



export const loginUser = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/users/login',
            {
                method:'POST',
                   headers: {
                'Content-Type': 'application/json'
                },
                credentials: 'include', // muy importante si usás sesiones/cookies
                body: JSON.stringify(data)
            }
        )
        const res = await response.json()
        if (!response.ok) {
              
            throw res.msg || "Error al querer ingresar";
            
            
        }
        
        return res
        
    } catch (error) {
         console.error('que se ve',error);
        
        throw (error?.message || error || "Error de red o servidor");

    }
}