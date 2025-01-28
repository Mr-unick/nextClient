import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {  Users } from './Users';
import { Permissions } from './Permissions';


@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;

  @Column({nullable:true})
  created_at: Date;

  @Column({nullable:true})
  updated_at: Date;

  @OneToMany(type => Users, user => user.role)
  users: Users[];

  // @OneToMany(() => Permissions, permissions => permissions.role)
  // permissions: Permissions[];
}
