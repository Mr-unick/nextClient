import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Business } from './Business';
import {  Leads } from './Leads';
import { StageChangeHistory } from './StageChangeHistory';

@Entity("lead_stages")
export class LeadStages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stage_name: string;


  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  
  // @ManyToOne(() => Business, business => business.leadStages)
  // business: Business;

  // @OneToMany(() => Leads, lead => lead.stage)
  // leads: Leads[];

  // @OneToMany(() => StageChangeHistory, stageChangeHistory => stageChangeHistory.stage)
  // stageChangeHistory: StageChangeHistory[];
}
