import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const socket = io(BACKEND_URL,{
    withCredentials:true,
    transports: ["websocket", "polling"],
    
})