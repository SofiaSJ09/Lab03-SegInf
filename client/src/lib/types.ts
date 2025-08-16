export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  EXTREME = 'Extreme',
}

export interface Risk {
  id: number;
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: RiskLevel;
  createdAt: string;
}

export interface CreateRiskDto {
  hazard: string;
  likelihood: number;
  severity: number;
}

export interface UpdateRiskDto {
  hazard?: string;
  likelihood?: number;
  severity?: number;
}

export interface RiskFilters {
  level?: RiskLevel;
  search?: string;
  sortBy?: 'riskScore' | 'createdAt';
  order?: 'ASC' | 'DESC';
}

export const LIKELIHOOD_LABELS = {
  1: 'Rare',
  2: 'Unlikely',
  3: 'Possible',
  4: 'Likely',
  5: 'Almost Certain',
} as const;

export const SEVERITY_LABELS = {
  1: 'Insignificant',
  2: 'Minor',
  3: 'Moderate',
  4: 'Major',
  5: 'Catastrophic',
} as const;
