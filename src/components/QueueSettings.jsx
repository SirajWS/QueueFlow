import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SlidersHorizontal,
  Hash,
  PlusCircle,
  ListChecks,
  BadgeCheck,
  Trash2,
} from "lucide-react";

/**
 * Props:
 * - settings: { prefix, startNumber, autoIncrement, maxQueueLength }
 * - nextNumber: number
 * - onReset?: () => void   // optional
 */
export default function QueueSettings({
  settings = { prefix: "Q", startNumber: 1, autoIncrement: true, maxQueueLength: 50 },
  nextNumber = 1,
  onReset,
}) {
  const { prefix, startNumber, autoIncrement, maxQueueLength } = settings;

  return (
    <Card compact>
      <CardHeader compact className="pb-2">
        <CardTitle compact className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 opacity-70" />
          Queue Settings
        </CardTitle>
      </CardHeader>

      <CardContent compact className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Stat icon={<Hash className="w-4 h-4 opacity-70" />} label="Prefix" value={prefix} />
          <Stat icon={<PlusCircle className="w-4 h-4 opacity-70" />} label="Startnummer" value={String(startNumber)} />
          <Stat icon={<BadgeCheck className="w-4 h-4 opacity-70" />} label="Auto-Inkrement" value={autoIncrement ? "Aktiv" : "Aus"} />
          <Stat className="col-span-3 sm:col-span-1" icon={<ListChecks className="w-4 h-4 opacity-70" />} label="Max. Queue-Länge" value={String(maxQueueLength)} />
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3">
          <div className="text-sm text-[var(--muted)]">Nächste Nummer (Preview)</div>
          <div className="mt-1 text-xl font-black tracking-widest text-[var(--text)]">
            {prefix}
            {String(nextNumber).padStart(3, "0")}
          </div>
        </div>

        {/* optional: Queue leeren, falls Prop übergeben */}
        {onReset && (
          <div className="flex justify-end">
            <Button variant="danger" onClick={onReset} title="Queue leeren">
              <Trash2 className="w-4 h-4 mr-2" />
              Queue leeren
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ icon, label, value, className = "" }) {
  return (
    <div className={`rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-2 ${className}`}>
      <div className="text-[10px] uppercase tracking-wide text-[var(--muted)] flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
    </div>
  );
}
