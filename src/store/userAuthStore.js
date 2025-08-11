import { create } from "zustand";


export const userAuthStore = create((set) => ({

    userAuth:{},
    actualUserNickname:'',
    userConected:false,
    allConnected: [],
    socket:null,

    getActualUserNickName : (user) => {
      set(
        {actualUserNickname:user.nickname,
        socket:user.socket || null}
      )
    },

    checkingAuth: (user) => {
      set({userAuth:user})
      
    },

    allUsersConnected: (users) => {
      set({allConnected: users})
      console.log('usuarios en el store', users);
    },


}))