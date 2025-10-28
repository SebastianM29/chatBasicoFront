


const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

export const loginUser = async (data) => {
    try {
         const ENDPOINT = `${BASE_URL}/users/login`;

        const response = await fetch(ENDPOINT,
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