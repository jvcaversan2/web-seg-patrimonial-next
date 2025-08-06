"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAuditLog } from "@/hooks/use-audit-log";

interface AuditContextType {
  logAction: (
    action: string,
    resource: string,
    details: string,
    severity?: "low" | "medium" | "high" | "critical",
    category?: "auth" | "occurrence" | "system" | "user" | "security"
  ) => void;
  exportLogs: (format?: "csv" | "json") => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: ReactNode }) {
  const { logAction, exportLogs } = useAuditLog();

  return (
    <AuditContext.Provider value={{ logAction, exportLogs }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error("useAudit must be used within an AuditProvider");
  }
  return context;
}
