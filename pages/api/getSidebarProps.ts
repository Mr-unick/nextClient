import { permission } from "process";

import { UsserData } from "../../../const";
import { haspermission } from "../../utils/authroization";
import { ResponseInstance } from "../../utils/instances";





  
  export default async function handler(req ,res) {


    let data = [
      {
        title: "Dashboard",
        url: "/buisness",
        permissionRequired: "view_dashboard",
        
      },
      {
        title: "Leads",
        url: "/users",
        permissionRequired: "view_about",
        
      },
      {
        title: "Mange Users",
        url: "/home",
        permissionRequired: "view_contact",
        nestedRoutes: [
          
          {
            title: "Users",
            url: "/users",
            permissionRequired: "nikhil",
          },
          {
            title: "Roles And Permissions",
            url: "/home",
            permissionRequired: "view_nested_dashboard",
          },
        ],
      },
      {
        title: "Buisness Settings",
        url: "/home",
        permissionRequired: "view_buisness",
        nestedRoutes: [
          {
            title: "Buisnes Details",
            url: "/home",
            permissionRequired: "view_nested_dashboard",
          },
          
          {
            title: "Area Of Operation",
            url: "/areaofsales",
            permissionRequired: "view_nested_about",
          },
          {
            title: "Lead Stages",
            url: "/home",
            permissionRequired: "view_nested_about",
          },
          {
            title: "Branches",
            url: "/home",
            permissionRequired: "view_nested_about",
          },
        ],

      },
      {
        title: "Settings",
        url: "/home",
        permissionRequired: "view_settings",
      },
    
    ];
    

    data = data.filter(nav => {
    
        const hasNavPermission = haspermission(UsserData, nav.permissionRequired);
        
    
        // return false if user dont have permission 

        if (!hasNavPermission) {
            return false;
        }
        
       // filter nested routes  

        if (nav.nestedRoutes) {
            nav.nestedRoutes = nav.nestedRoutes.filter(nestedNav => {
              
                return haspermission(UsserData, nestedNav.permissionRequired);
            });
        }
        
    
        return true;
    });
    
    
    const response: ResponseInstance = {
      message: "Request successful",
      data: data, 
      status: 200,
    };
  
    res.json(response);
}