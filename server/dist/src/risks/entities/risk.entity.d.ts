export declare enum RiskLevel {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    EXTREME = "Extreme"
}
export declare class Risk {
    id: number;
    hazard: string;
    likelihood: number;
    severity: number;
    riskScore: number;
    riskLevel: RiskLevel;
    createdAt: Date;
}
