"use client";

import { useMemo, useState, useCallback } from "react";
import { Textarea } from "@/app/components/Textarea";
import {
  ValueLegend,
  Stats,
  Presets,
  Button,
  Card,
  CardContent,
} from "@/app/components";

import { parseNumbers } from "@/lib/parseInputs";

export default function Page() {
  const [text, setText] = useState<string>("");

  const parsed = useMemo(() => parseNumbers(text), [text]);
  const { values, stats } = parsed;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handlePickPreset = useCallback((preset: string) => {
    setText(preset);
  }, []);

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  return (
    <main className="flex min-h-screen bg-muted items-center justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={handleChange}
            placeholder={`Пример: 10 20 30 40 50`}
            className="min-h-[160px]"
          />
          <p className="text-sm text-muted-foreground">
            Введите числа через пробел, табуляцию, запятую, точку с запятой или перенос строки.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Presets onPick={handlePickPreset} current={text} />
            <Button onClick={handleClear}>Очистить</Button>
          </div>
          <Stats stats={stats} />
          <div className="space-y-2">
            <ValueLegend values={values} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
