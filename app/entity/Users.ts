import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Business } from './Business';
import { LoginLogoutLog } from './LoginLogoutLog';
import { Roles } from './Roles';
import { Notification } from './Notifications';
import { StageChangeHistory } from './StageChangeHistory';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({nullable:true})
  created_at: Date;

  @Column({nullable:true})
  updated_at: Date;

  // @ManyToOne(() => Business, business => business.users)
  // business: Business;

  @ManyToOne(type => Roles, role => role.users)
  role: Roles;

  // @OneToMany(() => Notification, notification => notification.user)
  // notifications: Notification[];

  // @OneToMany(() => LoginLogoutLog, log => log.user)
  // loginLogoutLogs: LoginLogoutLog[];

  // @OneToMany(() => StageChangeHistory, history => history. changed_by)
  // stageChangeHistory: StageChangeHistory[];
}
