import * as React from 'react';
import { Badge } from '../Badge';

export interface StatsProps {
  stats: { valid: number; discarded: number; total: number };
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  const { valid, discarded, total } = stats;
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <Badge variant="total">Всего: {total}</Badge>
      <Badge variant="success">Валидных: {valid}</Badge>
      <Badge variant="discarded">Отброшенных: {discarded}</Badge>
    </div>
  );
};