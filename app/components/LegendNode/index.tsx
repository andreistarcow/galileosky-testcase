"use client";

import * as React from "react";

export interface LegendNodeProps {
  value: number;
  color: string;
  height: number;
  className?: string;
}

export const LegendNode = React.memo(function LegendNode({
  value,
  color,
  height,
  className = "flex-1 rounded-[2px]",
}: LegendNodeProps) {
  return (
    <div
      className={className}
      style={{ backgroundColor: color, height }}
      title={String(value)}
      aria-label={`value ${value}`}
      role="img"
    />
  );
});
