
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../entity/Users";

import { Roles } from "../entity/Roles";
import { Business } from "../entity/Business";
import { SuperAdmin } from "../entity/SuperAdmin";
import { StageChangeHistory } from "../entity/StageChangeHistory";
import { Notification } from "../entity/Notifications";
import { Permissions } from "../entity/Permissions";
import { LoginLogoutLog } from "../entity/LoginLogoutLog";
import { Leads } from "../entity/Leads";
import { LeadStages } from "../entity/LeadStages";
import { AreaOfOperation } from "../entity/AreaOfOperation";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "pass",
    database: "authsys",
    synchronize:false, 
    logging: true,    
  entities:[__dirname + '/../**/*.entity.{js,ts}',Users,Business,Roles,SuperAdmin,StageChangeHistory,Notification,Permissions,LoginLogoutLog,Leads,LeadStages,AreaOfOperation],

});

await AppDataSource.initialize()
