import * as React from "react";
import { Button } from "../Button";

const PRESETS: Array<{ label: string; text: string }> = [
  { label: "10 20 30 40 50", text: "10 20 30 40 50" },
  { label: "Разные разделители", text: "1, 5; 10 20, 30; 40	50" },
  {
    label: "С отброшенными",
    text: "10 20 zd 40 vv s0",
  }, 
  {
    label: "Большой диапазон",
    text: "10 20 30 40 50 80 100 200 300 400 450 500 700 800 900 1000 1200 1400",
  },
];

export interface PresetsProps {
  onPick: (text: string) => void;
  current?: string;
}

export const Presets: React.FC<PresetsProps> = ({ onPick, current }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => (
        <Button
          key={p.label}
          active={current === p.text}
          onClick={() => onPick(p.text)}
        >
          {p.label}
        </Button>
      ))}
    </div>
  );
};
