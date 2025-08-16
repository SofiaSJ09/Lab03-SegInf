import { RiskLevel } from './types';

export function calculateRiskScore(likelihood: number, severity: number): number {
  return likelihood * severity;
}

export function calculateRiskLevel(riskScore: number): RiskLevel {
  if (riskScore >= 1 && riskScore <= 4) return 'Low';
  if (riskScore >= 5 && riskScore <= 9) return 'Medium';
  if (riskScore >= 10 && riskScore <= 16) return 'High';
  if (riskScore >= 17 && riskScore <= 25) return 'Extreme';
  throw new Error('Invalid risk score');
}

export function getRiskLevelColor(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case 'Low':
      return 'bg-risk-low text-white';
    case 'Medium':
      return 'bg-risk-medium text-white';
    case 'High':
      return 'bg-risk-high text-white';
    case 'Extreme':
      return 'bg-risk-extreme text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export function exportToCSV(risks: any[], filename: string = 'risks.csv'): void {
  const headers = ['Hazard', 'Likelihood', 'Severity', 'Risk Score', 'Risk Level', 'Created At'];
  
  const csvContent = [
    headers.join(','),
    ...risks.map(risk => [
      `"${risk.hazard}"`,
      risk.likelihood,
      risk.severity,
      risk.riskScore,
      risk.riskLevel,
      new Date(risk.createdAt).toLocaleDateString()
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
