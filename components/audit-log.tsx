"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Activity,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  Trash2,
  LogIn,
  LogOut,
  Settings,
  AlertTriangle,
  Clock,
} from "lucide-react"

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

export function AuditLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterUser, setFilterUser] = useState("all")
  const [filterAction, setFilterAction] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [dateRange, setDateRange] = useState("7")

  // Mock audit log data
  const auditLogs: AuditLogEntry[] = [
    {
      id: "001",
      timestamp: "2024-01-15T14:30:25Z",
      user: "admin@mosaic.com",
      action: "CREATE_OCCURRENCE",
      resource: "Ocorrência #001",
      details: "Criou nova ocorrência: Vazamento de produto químico na Unidade Belo Horizonte",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "critical",
      category: "occurrence",
    },
    {
      id: "002",
      timestamp: "2024-01-15T14:25:10Z",
      user: "admin@mosaic.com",
      action: "LOGIN",
      resource: "Sistema",
      details: "Login realizado com sucesso",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "low",
      category: "auth",
    },
    {
      id: "003",
      timestamp: "2024-01-15T13:45:33Z",
      user: "joao.silva@mosaic.com",
      action: "UPDATE_OCCURRENCE",
      resource: "Ocorrência #002",
      details: "Atualizou status da ocorrência para 'Investigando'",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "medium",
      category: "occurrence",
    },
    {
      id: "004",
      timestamp: "2024-01-15T12:20:15Z",
      user: "maria.santos@mosaic.com",
      action: "VIEW_STATISTICS",
      resource: "Dashboard",
      details: "Acessou página de estatísticas detalhadas",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "low",
      category: "system",
    },
    {
      id: "005",
      timestamp: "2024-01-15T11:55:42Z",
      user: "carlos.oliveira@mosaic.com",
      action: "DELETE_OCCURRENCE",
      resource: "Ocorrência #003",
      details: "Removeu ocorrência duplicada do sistema",
      ipAddress: "192.168.1.115",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      severity: "high",
      category: "occurrence",
    },
    {
      id: "006",
      timestamp: "2024-01-15T10:30:18Z",
      user: "ana.costa@mosaic.com",
      action: "FAILED_LOGIN",
      resource: "Sistema",
      details: "Tentativa de login falhada - senha incorreta",
      ipAddress: "192.168.1.120",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      severity: "medium",
      category: "security",
    },
    {
      id: "007",
      timestamp: "2024-01-15T09:15:55Z",
      user: "pedro.lima@mosaic.com",
      action: "EXPORT_REPORT",
      resource: "Relatório Mensal",
      details: "Exportou relatório de ocorrências do mês de dezembro",
      ipAddress: "192.168.1.125",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "low",
      category: "system",
    },
    {
      id: "008",
      timestamp: "2024-01-15T08:45:30Z",
      user: "system",
      action: "SYSTEM_BACKUP",
      resource: "Banco de Dados",
      details: "Backup automático do sistema executado com sucesso",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0",
      severity: "low",
      category: "system",
    },
    {
      id: "009",
      timestamp: "2024-01-14T18:20:45Z",
      user: "admin@mosaic.com",
      action: "UPDATE_USER_PERMISSIONS",
      resource: "Usuário: joao.silva@mosaic.com",
      details: "Concedeu permissões de administrador para João Silva",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high",
      category: "user",
    },
    {
      id: "010",
      timestamp: "2024-01-14T17:35:12Z",
      user: "maria.santos@mosaic.com",
      action: "LOGOUT",
      resource: "Sistema",
      details: "Logout realizado pelo usuário",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "low",
      category: "auth",
    },
  ]

  const getActionIcon = (action: string) => {
    switch (action) {
      case "LOGIN":
        return LogIn
      case "LOGOUT":
        return LogOut
      case "CREATE_OCCURRENCE":
        return Plus
      case "UPDATE_OCCURRENCE":
        return Edit
      case "DELETE_OCCURRENCE":
        return Trash2
      case "VIEW_STATISTICS":
        return Eye
      case "EXPORT_REPORT":
        return Download
      case "SYSTEM_BACKUP":
        return Settings
      case "UPDATE_USER_PERMISSIONS":
        return User
      case "FAILED_LOGIN":
        return AlertTriangle
      default:
        return Activity
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "auth":
        return "bg-blue-100 text-blue-800"
      case "occurrence":
        return "bg-red-100 text-red-800"
      case "system":
        return "bg-gray-100 text-gray-800"
      case "user":
        return "bg-purple-100 text-purple-800"
      case "security":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR"),
    }
  }

  const getActionLabel = (action: string) => {
    const labels: { [key: string]: string } = {
      LOGIN: "Login",
      LOGOUT: "Logout",
      CREATE_OCCURRENCE: "Criar Ocorrência",
      UPDATE_OCCURRENCE: "Atualizar Ocorrência",
      DELETE_OCCURRENCE: "Excluir Ocorrência",
      VIEW_STATISTICS: "Visualizar Estatísticas",
      EXPORT_REPORT: "Exportar Relatório",
      SYSTEM_BACKUP: "Backup do Sistema",
      UPDATE_USER_PERMISSIONS: "Atualizar Permissões",
      FAILED_LOGIN: "Falha no Login",
    }
    return labels[action] || action
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesUser = filterUser === "all" || log.user === filterUser
    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesCategory = filterCategory === "all" || log.category === filterCategory

    // Date range filter
    const logDate = new Date(log.timestamp)
    const now = new Date()
    const daysAgo = Number.parseInt(dateRange)
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    const matchesDate = logDate >= cutoffDate

    return matchesSearch && matchesUser && matchesAction && matchesCategory && matchesDate
  })

  const uniqueUsers = [...new Set(auditLogs.map((log) => log.user))]
  const uniqueActions = [...new Set(auditLogs.map((log) => log.action))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Activity className="mr-3 h-6 w-6 text-green-600" />
            Log de Auditoria
          </h2>
          <p className="text-gray-600 mt-1">Histórico completo de todas as ações realizadas no sistema</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Ações</p>
                <p className="text-2xl font-bold text-gray-900">{filteredLogs.length}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueUsers.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ações Críticas</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredLogs.filter((log) => log.severity === "critical" || log.severity === "high").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Últimas 24h</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredLogs.filter((log) => {
                      const logDate = new Date(log.timestamp)
                      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
                      return logDate >= yesterday
                    }).length
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Usuário</label>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os usuários</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ação</label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as ações</SelectItem>
                  {uniqueActions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {getActionLabel(action)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="auth">Autenticação</SelectItem>
                  <SelectItem value="occurrence">Ocorrências</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                  <SelectItem value="user">Usuários</SelectItem>
                  <SelectItem value="security">Segurança</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Último dia</SelectItem>
                  <SelectItem value="7">Últimos 7 dias</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="90">Últimos 90 dias</SelectItem>
                  <SelectItem value="365">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Entries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Entradas do Log</h3>
          <Badge variant="secondary">{filteredLogs.length} entrada(s) encontrada(s)</Badge>
        </div>

        {filteredLogs.map((log) => {
          const ActionIcon = getActionIcon(log.action)
          const { date, time } = formatTimestamp(log.timestamp)

          return (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ActionIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{getActionLabel(log.action)}</h4>
                        <Badge variant={getSeverityColor(log.severity)}>{log.severity.toUpperCase()}</Badge>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(log.category)}`}
                        >
                          {log.category.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{log.details}</p>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Usuário:</span>
                          <br />
                          {log.user}
                        </div>
                        <div>
                          <span className="font-medium">Recurso:</span>
                          <br />
                          {log.resource}
                        </div>
                        <div>
                          <span className="font-medium">IP:</span>
                          <br />
                          {log.ipAddress}
                        </div>
                        <div>
                          <span className="font-medium">Data/Hora:</span>
                          <br />
                          {date} às {time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">ID: #{log.id}</div>
                </div>

                {/* User Agent (collapsed by default) */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    Ver detalhes técnicos
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">User Agent:</span>
                      <br />
                      {log.userAgent}
                    </p>
                  </div>
                </details>
              </CardContent>
            </Card>
          )
        })}

        {filteredLogs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum log encontrado</h3>
              <p className="text-gray-500">Tente ajustar os filtros ou termos de busca.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
