import { render, screen } from '@testing-library/react';
import { RiskBadge } from './RiskBadge';
import { RiskLevel } from '../lib/types';

describe('RiskBadge', () => {
  it('renders risk level correctly', () => {
    render(<RiskBadge level={RiskLevel.HIGH} />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('applies correct color classes for different risk levels', () => {
    const { rerender } = render(<RiskBadge level={RiskLevel.LOW} />);
    expect(screen.getByText('Low')).toHaveClass('bg-green-100', 'text-green-800');

    rerender(<RiskBadge level={RiskLevel.MEDIUM} />);
    expect(screen.getByText('Medium')).toHaveClass('bg-yellow-100', 'text-yellow-800');

    rerender(<RiskBadge level={RiskLevel.HIGH} />);
    expect(screen.getByText('High')).toHaveClass('bg-orange-100', 'text-orange-800');

    rerender(<RiskBadge level={RiskLevel.EXTREME} />);
    expect(screen.getByText('Extreme')).toHaveClass('bg-red-100', 'text-red-800');
  });
});
