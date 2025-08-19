// client/src/lib/api.ts

import { Risk, CreateRiskDto, UpdateRiskDto, RiskFilters } from './types';

/**
 * Normaliza la URL base del API:
 * - En producción (Vercel), define VITE_API_URL = https://lab03-seginf.onrender.com
 * - Aquí SIEMPRE añadimos el sufijo /api para construir endpoints correctos.
 * - En local, el fallback es http://localhost:3000 (Nest por defecto) → /api
 */
const RAW_BASE =
  (import.meta.env?.VITE_API_URL?.trim() as string | undefined) || 'http://localhost:3000';

const BASE = RAW_BASE.replace(/\/+$/, '');       // sin / al final
const API_BASE = `${BASE}/api`;                  // aseguramos /api

/** Helper para construir URL con query params sin duplicar '?' ni '/' */
function buildUrl(path: string, params?: URLSearchParams) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const query = params && params.toString() ? `?${params.toString()}` : '';
  return `${API_BASE}${normalizedPath}${query}`;
}

export const api = {
  async getRisks(filters: RiskFilters = {}): Promise<Risk[]> {
    const params = new URLSearchParams();

    if (filters.level) params.append('level', filters.level);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);

    const response = await fetch(buildUrl('/risks', params), {
      method: 'GET',
      mode: 'cors',
    });
    if (!response.ok) throw new Error('Failed to fetch risks');
    return response.json();
  },

  async getRisk(id: number): Promise<Risk> {
    const response = await fetch(buildUrl(`/risks/${id}`), {
      method: 'GET',
      mode: 'cors',
    });
    if (!response.ok) throw new Error('Failed to fetch risk');
    return response.json();
  },

  async createRisk(data: CreateRiskDto): Promise<Risk> {
    const response = await fetch(buildUrl('/risks'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create risk');
    return response.json();
  },

  async updateRisk(id: number, data: UpdateRiskDto): Promise<Risk> {
    const response = await fetch(buildUrl(`/risks/${id}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update risk');
    return response.json();
  },

  async deleteRisk(id: number): Promise<void> {
    const response = await fetch(buildUrl(`/risks/${id}`), {
      method: 'DELETE',
      mode: 'cors',
    });
    if (!response.ok) throw new Error('Failed to delete risk');
  },

  async seedRisks(): Promise<Risk[]> {
    const response = await fetch(buildUrl('/risks/seed'), {
      method: 'POST',
      mode: 'cors',
    });
    if (!response.ok) throw new Error('Failed to seed risks');
    return response.json();
  },
};
