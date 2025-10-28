 const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ya no necesitas el || "http://localhost:3000" si lo defines en .env



export const MonthlyPurchasesUser = async (id, year) => {
    try {
        const res = await fetch(`${BASE_URL}/admin/monthlySalesUser/${id}/${year}`,{
            method:'GET',
            credentials: 'include'
        })
        const resp = await res.json()
        if (!res.ok) {
            throw new Error(resp?.msg || 'Error al obtener compras mensuales del año');
        }
       
        console.log('funciona',resp);
        
        return resp
        
    } catch (error) {
        console.log('error');
        
        throw new Error(error.message);
        
    }


}