import { Risk, CreateRiskDto, UpdateRiskDto, RiskFilters } from './types';

const BASE_URL = 'http://localhost:3001/api';

export const api = {
  async getRisks(filters: RiskFilters = {}): Promise<Risk[]> {
    const params = new URLSearchParams();
    
    if (filters.level) params.append('level', filters.level);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);

    const response = await fetch(`${BASE_URL}/risks?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch risks');
    return response.json();
  },

  async getRisk(id: number): Promise<Risk> {
    const response = await fetch(`${BASE_URL}/risks/${id}`);
    if (!response.ok) throw new Error('Failed to fetch risk');
    return response.json();
  },

  async createRisk(data: CreateRiskDto): Promise<Risk> {
    const response = await fetch(`${BASE_URL}/risks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create risk');
    return response.json();
  },

  async updateRisk(id: number, data: UpdateRiskDto): Promise<Risk> {
    const response = await fetch(`${BASE_URL}/risks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update risk');
    return response.json();
  },

  async deleteRisk(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/risks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete risk');
  },

  async seedRisks(): Promise<Risk[]> {
    const response = await fetch(`${BASE_URL}/risks/seed`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to seed risks');
    return response.json();
  },
};
