import { useForm } from 'react-hook-form';
import { CreateRiskDto, Risk } from '../lib/types';
import { Plus, Save } from 'lucide-react';

interface RiskFormProps {
  risk?: Risk;
  onSubmit: (data: CreateRiskDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function RiskForm({ risk, onSubmit, onCancel, isLoading = false }: RiskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRiskDto>({
    defaultValues: risk
      ? {
          hazard: risk.hazard,
          likelihood: risk.likelihood,
          severity: risk.severity,
        }
      : {
          hazard: '',
          likelihood: 1,
          severity: 1,
        },
  });

  const isEditing = !!risk;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="hazard" className="block text-sm font-medium text-gray-700">
          Hazard Description
        </label>
        <textarea
          id="hazard"
          {...register('hazard', { required: 'Hazard description is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          rows={3}
          placeholder="Describe the hazard..."
        />
        {errors.hazard && (
          <p className="mt-1 text-sm text-red-600">{errors.hazard.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="likelihood" className="block text-sm font-medium text-gray-700">
            Likelihood (1-5)
          </label>
          <select
            id="likelihood"
            {...register('likelihood', {
              required: 'Likelihood is required',
              valueAsNumber: true, // 👈 asegura número
              min: { value: 1, message: 'Minimum value is 1' },
              max: { value: 5, message: 'Maximum value is 5' },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} -{' '}
                {value === 1
                  ? 'Very Low'
                  : value === 2
                  ? 'Low'
                  : value === 3
                  ? 'Medium'
                  : value === 4
                  ? 'High'
                  : 'Very High'}
              </option>
            ))}
          </select>
          {errors.likelihood && (
            <p className="mt-1 text-sm text-red-600">{errors.likelihood.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
            Severity (1-5)
          </label>
          <select
            id="severity"
            {...register('severity', {
              required: 'Severity is required',
              valueAsNumber: true, // 👈 asegura número
              min: { value: 1, message: 'Minimum value is 1' },
              max: { value: 5, message: 'Maximum value is 5' },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} -{' '}
                {value === 1
                  ? 'Negligible'
                  : value === 2
                  ? 'Minor'
                  : value === 3
                  ? 'Moderate'
                  : value === 4
                  ? 'Major'
                  : 'Catastrophic'}
              </option>
            ))}
          </select>
          {errors.severity && (
            <p className="mt-1 text-sm text-red-600">{errors.severity.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            'Saving...'
          ) : (
            <>
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Risk
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Risk
                </>
              )}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
