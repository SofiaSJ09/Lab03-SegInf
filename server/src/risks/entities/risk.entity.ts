import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  EXTREME = 'Extreme',
}

@Entity()
export class Risk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  hazard: string;

  @Column({ type: 'integer', nullable: false })
  likelihood: number;

  @Column({ type: 'integer', nullable: false })
  severity: number;

  @Column({ type: 'integer', nullable: false })
  riskScore: number;

  @Column({ type: 'text', nullable: false })
  riskLevel: RiskLevel;

  @CreateDateColumn()
  createdAt: Date;
}
