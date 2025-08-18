import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Database, AlertCircle } from 'lucide-react';
import { Risk, CreateRiskDto, UpdateRiskDto, RiskFilters } from '../lib/types';
import { api } from '../lib/api';
import { RiskForm } from '../components/RiskForm';
import { RiskTable } from '../components/RiskTable';

export function RiskCalculator() {
  const [showForm, setShowForm] = useState(false);
  const [editingRisk, setEditingRisk] = useState<Risk | undefined>(undefined);
  const [filters, setFilters] = useState<RiskFilters>({});

  const queryClient = useQueryClient();

  const { data: risks = [], isLoading, error } = useQuery({
    queryKey: ['risks', filters],
    queryFn: () => api.getRisks(filters),
  });

  const createMutation = useMutation({
    mutationFn: api.createRisk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risks'] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRiskDto }) =>
      api.updateRisk(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risks'] });
      setEditingRisk(undefined);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteRisk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risks'] });
    },
  });

  const seedMutation = useMutation({
    mutationFn: api.seedRisks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risks'] });
    },
  });

  const handleCreateRisk = (data: CreateRiskDto) => {
    createMutation.mutate(data);
  };

  const handleUpdateRisk = (data: CreateRiskDto) => {
    if (editingRisk) {
      updateMutation.mutate({ id: editingRisk.id, data });
    }
  };

  const handleDeleteRisk = (id: number) => {
    if (window.confirm('Are you sure you want to delete this risk?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditRisk = (risk: Risk) => {
    setEditingRisk(risk);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRisk(undefined);
  };

  const handleSeedRisks = () => {
    if (window.confirm('This will add sample risk data. Continue?')) {
      seedMutation.mutate();
    }
  };

  const isLoadingAny =
    isLoading ||
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    seedMutation.isPending;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Risks</h2>
          <p className="text-gray-600 mb-4">Failed to load risk data. Please check your connection.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Calculator</h1>
          <p className="text-gray-600">
            Assess and manage risks by evaluating likelihood and severity factors.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Risk
          </button>

          <button
            onClick={handleSeedRisks}
            disabled={seedMutation.isPending}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            <Database className="w-4 h-4 mr-2" />
            {seedMutation.isPending ? 'Seeding...' : 'Seed Sample Data'}
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingRisk ? 'Edit Risk' : 'Add New Risk'}
                </h3>
                <RiskForm
                  risk={editingRisk}
                  onSubmit={editingRisk ? handleUpdateRisk : handleCreateRisk}
                  onCancel={handleCancelForm}
                  isLoading={isLoadingAny}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Risk Table */}
          <RiskTable
            risks={risks}
            onEdit={handleEditRisk}
            onDelete={handleDeleteRisk}
            onFiltersChange={setFilters}
            isLoading={isLoading}
          />

          {/* Summary Stats */}
          {risks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Total Risks</div>
                <div className="text-2xl font-bold text-gray-900">{risks.length}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">High Risk</div>
                <div className="text-2xl font-bold text-orange-600">
                  {risks.filter(r => r.riskLevel === 'High').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Extreme Risk</div>
                <div className="text-2xl font-bold text-red-600">
                  {risks.filter(r => r.riskLevel === 'Extreme').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Avg Score</div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(risks.reduce((sum, r) => sum + r.riskScore, 0) / risks.length)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
