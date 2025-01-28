import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import { Business } from './Business';
import { AreaOfOperation } from './AreaOfOperation';
import { StageChangeHistory } from './StageChangeHistory';
import { LeadStages } from './LeadStages';
import { Users } from './Users';

@Entity('leads')
export class Leads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  lead_source: string;



  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  // @ManyToOne(() => LeadStages, leadStage => leadStage.leads)
  // stage: LeadStages;


  // @ManyToOne(() => Business, business => business.leads)
  // business: Business;

  // @ManyToOne(() => AreaOfOperation, areaOfOperation => areaOfOperation.leads)
  // areaOfOperation: AreaOfOperation;

  // @OneToMany(() => StageChangeHistory, stageChangeHistory => stageChangeHistory.lead)
  // stageChangeHistory: StageChangeHistory[];

 
}
