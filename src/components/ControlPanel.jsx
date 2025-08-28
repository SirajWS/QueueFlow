import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, RefreshCw, ArrowLeft, Hash, Play } from "lucide-react";

export default function ControlPanel({
  onPrint,
  onNewNumber,
  onBack,
  onServe,
  currentNumber,
  isGenerating,
}) {
  useEffect(() => {
    const onKey = (e) => {
      const k = (e.key || "").toLowerCase();
      if (k === "n") onNewNumber?.();
      if (k === "s") onServe?.();
      if (k === "p") onPrint?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNewNumber, onServe, onPrint]);

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.18 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  return (
    <Card compact>
      <CardHeader compact>
        <CardTitle compact className="flex items-center gap-2">
          <Hash className="w-5 h-5 opacity-70" />
          Queue Control
        </CardTitle>
      </CardHeader>

      <CardContent compact className="space-y-3">
        <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--muted)]">
          Aktuelle Nummer:{" "}
          <span className="font-semibold text-[var(--text)]">
            #{String(currentNumber).padStart(3, "0")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button onClick={onPrint} variant="primary" size="sm" className="w-full">
              <Printer className="w-4 h-4 mr-2" />
              Drucken
            </Button>
          </motion.div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              onClick={onNewNumber}
              variant="outline"
              size="sm"
              className="w-full"
              disabled={isGenerating}
              title="Neue Nummer (N)"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
              Neue Nummer
            </Button>
          </motion.div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button onClick={onServe} variant="primary" size="sm" className="w-full" title="Aufrufen (S)">
              <Play className="w-4 h-4 mr-2" />
              Aufrufen
            </Button>
          </motion.div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button onClick={onBack} variant="ghost" size="sm" className="w-full" title="Zurück">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
