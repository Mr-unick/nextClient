import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Roles } from './Roles';

@Entity('permissions')
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity_name: string;



  // @ManyToOne(() => Roles, role => role.permissions)
  // role: Roles;

}
