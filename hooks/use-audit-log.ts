"use client"

import { useState, useCallback } from "react"

interface AuditLogEntry {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
  ipAddress: string
  userAgent: string
  severity: "low" | "medium" | "high" | "critical"
  category: "auth" | "occurrence" | "system" | "user" | "security"
}

export function useAuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([])

  const logAction = useCallback(
    (
      action: string,
      resource: string,
      details: string,
      severity: "low" | "medium" | "high" | "critical" = "low",
      category: "auth" | "occurrence" | "system" | "user" | "security" = "system",
    ) => {
      const newLog: AuditLogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        user: "current-user@mosaic.com", // This would come from auth context
        action,
        resource,
        details,
        ipAddress: "192.168.1.100", // This would be detected
        userAgent: navigator.userAgent,
        severity,
        category,
      }

      setLogs((prevLogs) => [newLog, ...prevLogs])

      // In a real application, this would also send to the backend
      console.log("Audit log entry created:", newLog)
    },
    [],
  )

  const exportLogs = useCallback(
    (format: "csv" | "json" = "csv") => {
      if (format === "csv") {
        const headers = [
          "ID",
          "Timestamp",
          "User",
          "Action",
          "Resource",
          "Details",
          "IP Address",
          "Severity",
          "Category",
        ]
        const csvContent = [
          headers.join(","),
          ...logs.map((log) =>
            [
              log.id,
              log.timestamp,
              log.user,
              log.action,
              log.resource,
              `"${log.details}"`,
              log.ipAddress,
              log.severity,
              log.category,
            ].join(","),
          ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `audit-log-${new Date().toISOString().split("T")[0]}.csv`
        a.click()
        URL.revokeObjectURL(url)
      } else {
        const jsonContent = JSON.stringify(logs, null, 2)
        const blob = new Blob([jsonContent], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `audit-log-${new Date().toISOString().split("T")[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
      }

      logAction("EXPORT_LOGS", "Audit Log", `Exported ${logs.length} log entries in ${format.toUpperCase()} format`)
    },
    [logs, logAction],
  )

  return {
    logs,
    logAction,
    exportLogs,
  }
}
