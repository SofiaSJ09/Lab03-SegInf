import { useState } from 'react';
import { Risk, RiskLevel, RiskFilters } from '../lib/types';
import { RiskBadge } from './RiskBadge';
import { Search, Filter, Download, Edit, Trash2 } from 'lucide-react';

interface RiskTableProps {
  risks: Risk[];
  onEdit: (risk: Risk) => void;
  onDelete: (id: number) => void;
  onFiltersChange: (filters: RiskFilters) => void;
  isLoading?: boolean;
}

export function RiskTable({ risks, onEdit, onDelete, onFiltersChange, isLoading = false }: RiskTableProps) {
  const [filters, setFilters] = useState<RiskFilters>({
    level: undefined,
    search: '',
    sortBy: 'createdAt',
    order: 'DESC',
  });

  const handleFilterChange = (key: keyof RiskFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const exportToCSV = () => {
    const headers = ['Hazard', 'Likelihood', 'Severity', 'Risk Score', 'Risk Level', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...risks.map(risk => [
        `"${risk.hazard}"`,
        risk.likelihood,
        risk.severity,
        risk.riskScore,
        risk.riskLevel,
        new Date(risk.createdAt).toLocaleDateString(),
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'risks.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Filters and Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search hazards..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filters.level || ''}
                onChange={(e) => handleFilterChange('level', e.target.value || undefined)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">All Levels</option>
                {Object.values(RiskLevel).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as 'riskScore' | 'createdAt')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="riskScore">Risk Score</option>
                <option value="createdAt">Date</option>
              </select>
              <select
                value={filters.order}
                onChange={(e) => handleFilterChange('order', e.target.value as 'ASC' | 'DESC')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="DESC">Desc</option>
                <option value="ASC">Asc</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hazard
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Likelihood
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No risks found
                </td>
              </tr>
            ) : (
              risks.map((risk) => (
                <tr key={risk.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                    {risk.hazard}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {risk.likelihood}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {risk.severity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {risk.riskScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RiskBadge level={risk.riskLevel} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(risk.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(risk)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(risk.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
