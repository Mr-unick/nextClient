import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Timestamp } from 'typeorm';

import { Users } from './Users';
import { SuperAdmin } from './SuperAdmin';
import { AreaOfOperation } from './AreaOfOperation';
import { LeadStages } from './LeadStages';
import { Leads } from './Leads';
import { Exclude } from 'class-transformer';



@Entity('business')

export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'timestamp' ,nullable: true})
  created_at: Timestamp;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Timestamp;


  // @ManyToOne(() => SuperAdmin, superAdmin => superAdmin.businesses)
  // superAdmin: SuperAdmin;


  @OneToMany(type => AreaOfOperation, areaOfOperation => areaOfOperation.business_id)
  areasOfOperation: AreaOfOperation[];

  // @OneToMany(() => LeadStages, leadStage => leadStage.business)
  // leadStages: LeadStages[];

  // @OneToMany(() => Users, user => user.business)
  // users: Users[];

  // @OneToMany(() => Leads, lead => lead.business)
  // leads: Leads[];

 
}
