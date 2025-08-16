import { RiskLevel } from '../lib/types';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function RiskBadge({ level, className = '' }: RiskBadgeProps) {
  const getColorClasses = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW:
        return 'bg-green-100 text-green-800 border-green-200';
      case RiskLevel.MEDIUM:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case RiskLevel.HIGH:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case RiskLevel.EXTREME:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getColorClasses(
        level
      )} ${className}`}
    >
      {level}
    </span>
  );
}
