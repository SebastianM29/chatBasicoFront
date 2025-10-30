
 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env

export const logoutUser = async () => {
   const ENDPOINT = `${BASE_URL}/users/logout`;
   // const ENDPOINT = `http://localhost:3000/logout`;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',      
      credentials: 'include'
    })
    if (!response.ok) {
      const errorData = await response.json();
      
      throw new Error(errorData.msg || 'Error en la solicitud');
    }
    const dataLogout =  await response.json();
    console.log('logout realizado',dataLogout);

    return dataLogout.msg;
}
    
   catch (error) {
       console.error('que se ve',error);
        
        throw new Error("intente luego, error de servidor");
  }
  }