
export const MonthlyPurchasesUser = async (id, year) => {
    try {
        const res = await fetch(`http://localhost:3000/admin/monthlySalesUser/${id}/${year}`,{
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