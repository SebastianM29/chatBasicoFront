import { useState } from "react"


export const useForm = (data = {}) => {
    const [form , setForm] = useState(data)

    const changeValue = (e,thisName) => {
        if (thisName) {
            // El DatePicker devuelve directamente una fecha (no un event) ej:changeValue(newValue, "date")
            setForm({
                ...form,
                [thisName]:e
            })
            
        }else{
            const{name,value, files} = e.target
            setForm({
                ...form,
                [name]: files ? files[0] : value
            })
        }
    }

    const resetForm = ( ) => {
        setForm(data)
    }

    return {
        ...form,
        changeValue,
        resetForm
    }

}