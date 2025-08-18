import { calculateRiskScore, calculateRiskLevel, getRiskLevelColor } from './risk';
import { describe, it, expect } from 'vitest';

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
      expect(calculateRiskLevel(1)).toBe('Low');
      expect(calculateRiskLevel(2)).toBe('Low');
      expect(calculateRiskLevel(3)).toBe('Low');
      expect(calculateRiskLevel(4)).toBe('Low');
    });

    it('returns Medium for scores 5-9', () => {
      expect(calculateRiskLevel(5)).toBe('Medium');
      expect(calculateRiskLevel(7)).toBe('Medium');
      expect(calculateRiskLevel(9)).toBe('Medium');
    });

    it('returns High for scores 10-16', () => {
      expect(calculateRiskLevel(10)).toBe('High');
      expect(calculateRiskLevel(12)).toBe('High');
      expect(calculateRiskLevel(16)).toBe('High');
    });

    it('returns Extreme for scores 17-25', () => {
      expect(calculateRiskLevel(17)).toBe('Extreme');
      expect(calculateRiskLevel(20)).toBe('Extreme');
      expect(calculateRiskLevel(25)).toBe('Extreme');
    });

    it('throws error for invalid scores', () => {
      expect(() => calculateRiskLevel(0)).toThrow('Invalid risk score');
      expect(() => calculateRiskLevel(26)).toThrow('Invalid risk score');
    });
  });

  describe('getRiskLevelColor', () => {
    it('returns correct color classes for each risk level', () => {
      expect(getRiskLevelColor('Low')).toBe('bg-risk-low text-white');
      expect(getRiskLevelColor('Medium')).toBe('bg-risk-medium text-white');
      expect(getRiskLevelColor('High')).toBe('bg-risk-high text-white');
      expect(getRiskLevelColor('Extreme')).toBe('bg-risk-extreme text-white');
    });
  });
});
