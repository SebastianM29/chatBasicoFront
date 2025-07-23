import { create } from "zustand";


export const userAuthStore = create((set) => ({

    userAuth:null,
    actualUser:{},
    userConected:false,

    getActualUser : (user) => {

    },

    checkingAuth: (user) => {
      set({userAuth:user})
      
    }


}))