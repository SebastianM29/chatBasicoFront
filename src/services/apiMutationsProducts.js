
 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env

export const sendingProducts = async ( data) => {
   const ENDPOINT = `${BASE_URL}/admin/addProduct`;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: data,
      credentials: 'include'
    })
    if (!response.ok) {
      const errorData = await response.json();
      
      throw new Error(errorData.msg || 'Error en la solicitud');
    }
    
    const dataProduct =  await response.json();
    console.log('esto seria en el front',dataProduct);
    
    return dataProduct
    
  } catch (error) {
       console.error('que se ve',error);
        
        throw new Error("intente luego, error de servidor");
  }
  }