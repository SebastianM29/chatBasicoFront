import { create } from "zustand";
import { socket } from "../util/socket";


export const userAuthStore = create((set) => ({
    
messages: [],
addMessages:(data) => set((info) => {
    console.log('info en el sotre',data);
      
    const updated = [...info.messages,data]
    return {messages:updated.slice(-7)}
    }),
 userAuth:{},
 actualUserNickname:'',
 imagePath:'',
 userConected:false,
 allConnected: [],
 socket:null,
 buyer:null,
 userLocation:null,

getActualUserNickName : (user) => {
      set(
        { actualUserNickname:user.user,
          imagePath:user.imagePath,
          socket:user.socket || null}
      )
    },

checkingAuth: (user) => {
     console.log('user en el store se vera por unica vez', user);
     
      set({userAuth:user})
      
    },

allUsersConnected: (users) => {
      set({allConnected: users})
      console.log('usuarios en el store', users);
    },

actualBuyer: (data) => {
  console.log('deberia llegar el resultad del cpmpprador',data);
  
  set({buyer:data})
},

giveMeLocation: (user) => { 
  set({userLocation:user})
} 

}))


socket.on('newMsg',(element)=> {
      console.log('nuevo mensaje recibido en el store', element);
      userAuthStore.getState().addMessages(element)
         
})


