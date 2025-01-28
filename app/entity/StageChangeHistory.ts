import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Leads } from './Leads';
import { LeadStages } from './LeadStages';
import { Users } from './Users';

@Entity('status_change_history')
export class StageChangeHistory {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  changed_at: Date;

  @Column()
  reason: string; 

  // @ManyToOne(() => Leads, lead => lead.stageChangeHistory)
  // lead: Leads;

  // @ManyToOne(() => LeadStages, leadStage => leadStage.stageChangeHistory)
  // stage: LeadStages;

  // @ManyToOne(() => Users, user => user.stageChangeHistory, { nullable: true })
  // changed_by: Users;
}
