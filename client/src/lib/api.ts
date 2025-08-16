// client/src/lib/api.ts

import { Risk, CreateRiskDto, UpdateRiskDto, RiskFilters } from './types';

/**
 * Base URL de la API:
 * - En producción (Vercel): usa VITE_API_URL que configuras en Vercel (por ejemplo: https://tu-api.onrender.com/api)
 * - En desarrollo local: fallback a http://localhost:3001/api (como lo tenés actualmente)
 *
 * Nota: NO forzamos agregar /api si no viene en VITE_API_URL, para no romper despliegues.
 * Simplemente usamos tal cual VITE_API_URL si está definida.
 */
const BASE_URL = (import.meta.env?.VITE_API_URL ?? 'http://localhost:3001/api').replace(/\/+$/, '');

/** Helper para construir URL con query params sin duplicar '?' ni '/' */
function buildUrl(path: string, params?: URLSearchParams) {
  const query = params && params.toString() ? `?${params.toString()}` : '';
  return `${BASE_URL}${path}${query}`;
}

export const api = {
  async getRisks(filters: RiskFilters = {}): Promise<Risk[]> {
    const params = new URLSearchParams();

    if (filters.level) params.append('level', filters.level);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);

    const response = await fetch(buildUrl('/risks', params));
    if (!response.ok) throw new Error('Failed to fetch risks');
    return response.json();
  },

  async getRisk(id: number): Promise<Risk> {
    const response = await fetch(buildUrl(`/risks/${id}`));
    if (!response.ok) throw new Error('Failed to fetch risk');
    return response.json();
  },

  async createRisk(data: CreateRiskDto): Promise<Risk> {
    const response = await fetch(buildUrl('/risks'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create risk');
    return response.json();
  },

  async updateRisk(id: number, data: UpdateRiskDto): Promise<Risk> {
    const response = await fetch(buildUrl(`/risks/${id}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update risk');
    return response.json();
  },

  async deleteRisk(id: number): Promise<void> {
    const response = await fetch(buildUrl(`/risks/${id}`), {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete risk');
  },

  async seedRisks(): Promise<Risk[]> {
    const response = await fetch(buildUrl('/risks/seed'), {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to seed risks');
    return response.json();
  },
};
