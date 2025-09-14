"use client";

import * as React from "react";
import { normalizeRobust } from "@/lib/scale";
import { mapNormalizedToHexViaHsl } from "@/lib/color";
import { LegendNode } from "../LegendNode";

export interface ValueLegendProps {
  values: number[];
  height?: number;
}

export const ValueLegend: React.FC<ValueLegendProps> = ({
  values,
  height = 24,
}) => {
  const sorted = React.useMemo(() => [...values].sort((a, b) => a - b), [values]);

  if (sorted.length === 0) {
    return <div className="text-sm text-muted-foreground">Нет данных для отображения.</div>;
  }

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const same = min === max;

  return (
    <div className="w-full">
      <div
        className="flex items-stretch gap-[2px] rounded-md p-[2px]"
        style={{ background: "hsl(var(--muted))" }}
      >
        {sorted.map((v, i) => {
          const t = same ? 0.5 : normalizeRobust(v, sorted, 0.05, 0.95);
          const color = mapNormalizedToHexViaHsl(t, 0.75);
          return (
            <LegendNode
              key={`${v}-${i}`}
              value={v}
              color={color}
              height={height}
            />
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>min: {min}</span>
        <span>max: {max}</span>
      </div>
    </div>
  );
};
