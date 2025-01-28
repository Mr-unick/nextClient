import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Entity('login_logout_logs')
export class LoginLogoutLog {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  action: string;

  @Column()
  timestamp: Date;

  @Column()
  ip_address: string;

  @Column()
  user_agent: string;

  // @ManyToOne(() => Users, user => user.loginLogoutLogs)
  // user: Users;

}
