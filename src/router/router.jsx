import { createBrowserRouter } from "react-router-dom";
import { AppContainer } from "../components/AppContainer/AppContainer";
import { Login } from "../components/Login/Login";
import { Register } from "../components/Register/Register";
import { Protected } from "./Protected";
import { DashBoard } from "../components/Dashboard/DashBoard";
import { Perfil } from "../components/Perfil/Perfil";
import { Calendar } from "../components/Calendar/Calendar";
import { DashboardAdmin } from "../components/DashboardAdmin/DashboardAdmin";
import { ProtectedAdmin } from "./ProtectedAdmin";
import { ManageProfiles } from "../components/ManageProfiles/ManageProfiles";
import { MonthlyPurchases } from "../components/monthlyPurchases/MonthlyPurchases";
import { YearPurchases } from "../components/YearPurchases/YearPurchases";




export const getRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppContainer/>,
        children:[
            {
                index:true,
                element:<Login/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    },
    {
        path:"/userAuth",
        element:<Protected/>,
        children:[
            {
                path:"dashboard",
                element:<DashBoard/>
            },
            {
                path:"perfil",
                element:<Perfil/>
            },
            {
                path:"calendario",
                element:<Calendar/>
            },


        ]
    },{
        path:'/admin',
        element:<ProtectedAdmin/>,
        children:[
            {
                
                index:true,
                element:<DashboardAdmin/>
            
            },
            {
                path:'dashboardAdmin',
                element:<DashboardAdmin/>
            },
            {
                path: 'manageProfiles',
                element: <ManageProfiles/>,
                children:[
                
                    {   
                        
                        element:<YearPurchases/>,
                        path:'',
                        children:[
                            {
                            path:'monthlyPurchases/:userId/:year/:name',
                            element:<MonthlyPurchases/>
                        }
                       ]
                    }
                ]

            }
        ]


    }
])