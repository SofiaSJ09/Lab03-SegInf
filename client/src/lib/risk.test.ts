import { calculateRiskScore, calculateRiskLevel, getRiskLevelColor } from './risk';
import { RiskLevel } from './types';

describe('Risk Utilities', () => {
  describe('calculateRiskScore', () => {
    it('calculates risk score correctly for different combinations', () => {
      expect(calculateRiskScore(1, 1)).toBe(1);
      expect(calculateRiskScore(3, 4)).toBe(12);
      expect(calculateRiskScore(5, 5)).toBe(25);
      expect(calculateRiskScore(2, 3)).toBe(6);
    });
  });

  describe('calculateRiskLevel', () => {
    it('returns Low for scores 1-4', () => {
      expect(calculateRiskLevel(1)).toBe(RiskLevel.LOW);
      expect(calculateRiskLevel(2)).toBe(RiskLevel.LOW);
      expect(calculateRiskLevel(3)).toBe(RiskLevel.LOW);
      expect(calculateRiskLevel(4)).toBe(RiskLevel.LOW);
    });

    it('returns Medium for scores 5-9', () => {
      expect(calculateRiskLevel(5)).toBe(RiskLevel.MEDIUM);
      expect(calculateRiskLevel(7)).toBe(RiskLevel.MEDIUM);
      expect(calculateRiskLevel(9)).toBe(RiskLevel.MEDIUM);
    });

    it('returns High for scores 10-16', () => {
      expect(calculateRiskLevel(10)).toBe(RiskLevel.HIGH);
      expect(calculateRiskLevel(12)).toBe(RiskLevel.HIGH);
      expect(calculateRiskLevel(16)).toBe(RiskLevel.HIGH);
    });

    it('returns Extreme for scores 17-25', () => {
      expect(calculateRiskLevel(17)).toBe(RiskLevel.EXTREME);
      expect(calculateRiskLevel(20)).toBe(RiskLevel.EXTREME);
      expect(calculateRiskLevel(25)).toBe(RiskLevel.EXTREME);
    });

    it('throws error for invalid scores', () => {
      expect(() => calculateRiskLevel(0)).toThrow('Invalid risk score');
      expect(() => calculateRiskLevel(26)).toThrow('Invalid risk score');
    });
  });

  describe('getRiskLevelColor', () => {
    it('returns correct color classes for each risk level', () => {
      expect(getRiskLevelColor(RiskLevel.LOW)).toBe('bg-risk-low text-white');
      expect(getRiskLevelColor(RiskLevel.MEDIUM)).toBe('bg-risk-medium text-white');
      expect(getRiskLevelColor(RiskLevel.HIGH)).toBe('bg-risk-high text-white');
      expect(getRiskLevelColor(RiskLevel.EXTREME)).toBe('bg-risk-extreme text-white');
    });
  });
});
