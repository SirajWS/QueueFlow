import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

/**
 * Props:
 * - open: boolean
 * - settings: { prefix, startNumber, autoIncrement, maxQueueLength }
 * - onClose: () => void
 * - onSave: (newSettings) => void
 */
export default function SettingsModal({ open = false, settings, onClose, onSave }) {
  const [form, setForm] = useState(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings, open]);

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "prefix" ? value : Number(value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full max-w-md"
          >
            <Card className="bg-[var(--panel)] border-[var(--border)]">
              <CardHeader className="flex items-center justify-between flex-row">
                <CardTitle className="text-lg font-semibold text-[var(--text)]">
                  Einstellungen
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} title="Schließen">
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Prefix */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text)]/80 mb-1">
                      Prefix
                    </label>
                    <input
                      type="text"
                      name="prefix"
                      value={form.prefix}
                      onChange={handleChange}
                      className="w-full rounded-md border px-3 py-2 bg-[var(--panel)] text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
                    />
                  </div>

                  {/* Startnummer */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text)]/80 mb-1">
                      Startnummer
                    </label>
                    <input
                      type="number"
                      name="startNumber"
                      value={form.startNumber}
                      onChange={handleChange}
                      className="w-full rounded-md border px-3 py-2 bg-[var(--panel)] text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
                    />
                  </div>

                  {/* Max Queue Length */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text)]/80 mb-1">
                      Max. Queue-Länge
                    </label>
                    <input
                      type="number"
                      name="maxQueueLength"
                      value={form.maxQueueLength}
                      onChange={handleChange}
                      className="w-full rounded-md border px-3 py-2 bg-[var(--panel)] text-[var(--text)] border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
                    />
                  </div>

                  {/* Auto Increment */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="autoIncrement"
                      checked={form.autoIncrement}
                      onChange={handleChange}
                      className="h-4 w-4 border-[var(--border)] text-[var(--brand)] focus:ring-[var(--brand)]/40"
                    />
                    <label className="text-sm text-[var(--text)]/80">
                      Auto-Inkrement aktivieren
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button type="submit" variant="primary">
                      Speichern
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
