import { useState } from "react"


export const useForm = (data = {}) => {
    const [form , setForm] = useState(data)

    const changeValue = (e,thisName) => {
        if (thisName) {
            setForm({
                ...form,
                [thisName]:e
            })
            
        }else{
            const{name,value} = e.target
            setForm({
                ...form,
                [name]:value
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