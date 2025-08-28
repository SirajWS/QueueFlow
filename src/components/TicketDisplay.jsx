import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket as TicketIcon, Trash2, Clock } from "lucide-react";

export default function TicketDisplay({
  tickets = [],
  current = null,
  onRemove = () => {},
}) {
  const waiting = current ? tickets.slice(1) : tickets;

  return (
    <Card compact>
      <CardHeader compact className="pb-2">
        <CardTitle compact className="flex items-center gap-2">
          <TicketIcon className="w-5 h-5 opacity-70" />
          Ticket Display
        </CardTitle>
      </CardHeader>

      <CardContent compact className="space-y-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-3">
          <div className="text-sm text-[var(--muted)] flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4" />
            Aktuell aufgerufen
          </div>
          <div className="text-xl font-black tracking-widest text-[var(--text)]">
            {current?.label ?? tickets[0]?.label ?? "—"}
          </div>
          {current?.createdAt && (
            <div className="text-xs text-[var(--muted)] mt-1">
              seit {new Date(current.createdAt).toLocaleTimeString()}
            </div>
          )}
        </div>

        <div>
          <div className="mb-1 text-sm font-semibold text-[var(--text)]/80">
            Warteschlange ({waiting.length})
          </div>

          <div className="space-y-2 max-h-44 overflow-auto pr-1">
            <AnimatePresence initial={false}>
              {waiting.length === 0 ? (
                <div className="text-sm text-[var(--muted)]">
                  Keine Tickets in der Warteschlange.
                </div>
              ) : (
                waiting.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--panel)] px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold tracking-wider text-[var(--text)]">
                        {t.label}
                      </span>
                      {t.createdAt && (
                        <span className="text-xs text-[var(--muted)]">
                          {new Date(t.createdAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemove(t.id)}
                      title="Ticket entfernen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
