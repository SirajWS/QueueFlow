import { useMemo, useState, useEffect } from "react";
import "./App.css";

import ControlPanel from "./components/ControlPanel.jsx";
import TicketDisplay from "./components/TicketDisplay.jsx";
import QueueSettings from "./components/QueueSettings.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

export default function App() {
  // --- Einstellungen ---
  const [settings, setSettings] = useState({
    prefix: "Q",
    startNumber: 1,
    autoIncrement: true,
    maxQueueLength: 50,
  });

  // --- UI / Modal ---
  const [showSettings, setShowSettings] = useState(false);

  // --- Queue-State ---
  const [tickets, setTickets] = useState([]); // [{id,label,createdAt}]
  const [nextNumber, setNextNumber] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Persistenz: laden ---
  useEffect(() => {
    try {
      const s = localStorage.getItem("qf_settings");
      const t = localStorage.getItem("qf_tickets");
      const n = localStorage.getItem("qf_nextNumber");
      if (s) setSettings(JSON.parse(s));
      if (t) setTickets(JSON.parse(t));
      if (n) setNextNumber(Number(n));
      else setNextNumber((prev) => prev || settings.startNumber || 1);
    } catch {
      // ignore parse errors
    }
  }, []);

  // --- Persistenz: speichern ---
  useEffect(() => {
    localStorage.setItem("qf_settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    localStorage.setItem("qf_tickets", JSON.stringify(tickets));
  }, [tickets]);
  useEffect(() => {
    localStorage.setItem("qf_nextNumber", String(nextNumber));
  }, [nextNumber]);

  const currentTicket = tickets[0] ?? null;
  const canAdd = tickets.length < settings.maxQueueLength;

  const nextLabel = useMemo(
    () => `${settings.prefix}${String(nextNumber).padStart(3, "0")}`,
    [settings.prefix, nextNumber]
  );

  // --- Aktionen ---
  function onPrint() {
    // dank .print-only drucken wir nur den Bon
    window.print();
  }

  async function onNewNumber() {
    if (!canAdd) return;
    setIsGenerating(true);

    const newTicket = {
      id: crypto.randomUUID(),
      label: nextLabel,
      createdAt: new Date().toISOString(),
    };
    setTickets((t) => [...t, newTicket]);

    if (settings.autoIncrement) setNextNumber((n) => n + 1);

    await new Promise((r) => setTimeout(r, 120));
    setIsGenerating(false);
  }

  function onBack() {
    if (tickets.length > 0) {
      setTickets((t) => {
        const copy = [...t];
        copy.pop();
        setNextNumber((n) => Math.max(settings.startNumber, n - 1));
        return copy;
      });
    } else {
      setNextNumber((n) => Math.max(settings.startNumber, n - 1));
    }
  }

  function serveNext() {
    // Nächstes Ticket aufrufen → erstes entfernen (FIFO)
    setTickets((t) => t.slice(1));
  }

  function removeTicket(id) {
    setTickets((t) => t.filter((x) => x.id !== id));
  }

  function resetQueue() {
    setTickets([]);
    setNextNumber(settings.startNumber);
  }

  // --- Settings Modal ---
  function openSettings() {
    setShowSettings(true);
  }
  function closeSettings() {
    setShowSettings(false);
  }
  function saveSettings(newSettings) {
    const startNumber =
      Number(newSettings.startNumber ?? settings.startNumber) || 1;
    const maxQueueLength =
      Number(newSettings.maxQueueLength ?? settings.maxQueueLength) || 50;

    setSettings((prev) => ({
      ...prev,
      ...newSettings,
      startNumber,
      maxQueueLength,
    }));

    if (startNumber !== settings.startNumber) {
      setNextNumber(startNumber);
      setTickets([]);
    }

    closeSettings();
  }

  return (
    <>
      {/* ---------- SCREEN UI (nicht drucken) ---------- */}
      <div className="no-print">
        <div className="app-wrap">
          {/* EIN Header für alles */}
          <header className="app-header">
            <h1>QueueFlow</h1>
            <div className="flex gap-2">
              <ThemeToggle />
              <button className="secondary" onClick={openSettings}>
                Einstellungen
              </button>
            </div>
          </header>

          <div className="grid">
            <section className="panel">
              <ControlPanel
                onPrint={onPrint}
                onNewNumber={onNewNumber}
                onBack={onBack}
                onServe={serveNext}
                onSettings={openSettings}
                currentNumber={nextNumber}
                isGenerating={isGenerating}
              />
            </section>

            <section className="panel">
              <TicketDisplay
                tickets={tickets}
                current={currentTicket}
                onRemove={removeTicket}
              />
            </section>

            <section className="panel">
              <QueueSettings
                settings={settings}
                nextNumber={nextNumber}
                onOpenSettings={openSettings}
                onReset={resetQueue}
              />
            </section>
          </div>

          <SettingsModal
            open={showSettings}
            settings={settings}
            onClose={closeSettings}
            onSave={saveSettings}
          />
        </div>
      </div>

      {/* ---------- PRINT UI (nur Ticket) ---------- */}
      <div className="print-only">
        <div className="ticket-paper">
          <div className="ticket-big">{currentTicket?.label ?? nextLabel}</div>
          <div className="ticket-meta">
            QueueFlow • {new Date().toLocaleDateString()}{" "}
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </>
  );
}
