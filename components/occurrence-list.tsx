"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Calendar,
  MapPin,
  User,
  Search,
  Filter,
} from "lucide-react";
import { unidades } from "@/data/data";
import { useRouter } from "next/navigation";

export function OccurrenceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterUnit, setFilterUnit] = useState("all");

  const router = useRouter();

  const occurrences = [
    {
      id: "001",
      title: "Vazamento de produto químico",
      description: "Vazamento detectado no tanque de armazenamento principal",
      severity: "critical",
      unit: "ARA",
      location: "Ácido sulfúrico I",
      reporter: "João Silva",
      date: "2024-01-15",
      time: "14:30",
      status: "open",
    },
    {
      id: "002",
      title: "Falha no sistema de segurança",
      description: "Câmeras de monitoramento apresentaram falha técnica",
      severity: "high",
      unit: "CIU",
      location: "Portaria principal",
      reporter: "Maria Santos",
      date: "2024-01-14",
      time: "09:15",
      status: "investigating",
    },
    {
      id: "003",
      title: "Acesso não autorizado",
      description: "Pessoa não identificada tentou acessar área restrita",
      severity: "medium",
      unit: "CMA",
      location: "Diretoria",
      reporter: "Carlos Oliveira",
      date: "2024-01-13",
      time: "22:45",
      status: "resolved",
    },
    {
      id: "004",
      title: "Equipamento danificado",
      description: "Empilhadeira apresentou danos após colisão",
      severity: "low",
      unit: "CMP",
      location: "Pátio ferroviário",
      reporter: "Ana Costa",
      date: "2024-01-12",
      time: "16:20",
      status: "resolved",
    },
    {
      id: "005",
      title: "Incidente com funcionário",
      description: "Funcionário sofreu pequeno ferimento durante operação",
      severity: "medium",
      unit: "FPR",
      location: "Oficina de manutenção mecânica e planejamento",
      reporter: "Pedro Lima",
      date: "2024-01-11",
      time: "11:30",
      status: "investigating",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical":
        return "🔴 Crítica";
      case "high":
        return "🟠 Alta";
      case "medium":
        return "🟡 Média";
      case "low":
        return "🟢 Baixa";
      default:
        return "⚪ Desconhecida";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-500";
      case "investigating":
        return "bg-yellow-500";
      case "resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Aberta";
      case "investigating":
        return "Investigando";
      case "resolved":
        return "Resolvida";
      default:
        return "Desconhecido";
    }
  };

  const filteredOccurrences = occurrences.filter((occurrence) => {
    const matchesSearch =
      occurrence.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      occurrence.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      occurrence.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      filterSeverity === "all" || occurrence.severity === filterSeverity;
    const matchesUnit = filterUnit === "all" || occurrence.unit === filterUnit;

    return matchesSearch && matchesSeverity && matchesUnit;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <Card className="border-0 shadow-lg py-4">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <AlertTriangle className="mr-3 h-6 w-6 text-blue-600" />
            Lista de Ocorrências
            <Badge className="ml-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              {filteredOccurrences.length} Ocorrências
            </Badge>
          </CardTitle>
          <CardDescription>
            Gerencie e monitore todas as ocorrências registradas no sistema
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Enhanced Filters */}
      <Card className="border-0 shadow-lg py-4">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="mr-2 h-5 w-5 text-gray-600" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título, descrição ou unidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Severity Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Severidade
              </label>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as severidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as severidades</SelectItem>
                  <SelectItem value="critical">🔴 Crítica</SelectItem>
                  <SelectItem value="high">🟠 Alta</SelectItem>
                  <SelectItem value="medium">🟡 Média</SelectItem>
                  <SelectItem value="low">🟢 Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Unit Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Unidade
              </label>
              <Select value={filterUnit} onValueChange={setFilterUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as unidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as unidades</SelectItem>
                  {unidades.map((unit) => (
                    <SelectItem key={unit.id} value={unit.codigo}>
                      {unit.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Occurrences List */}
      <div className="space-y-4">
        {filteredOccurrences.map((occurrence) => (
          <Card
            key={occurrence.id}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`bg-gradient-to-r ${
                        occurrence.severity === "critical"
                          ? "from-red-500 to-pink-500"
                          : occurrence.severity === "high"
                          ? "from-orange-500 to-red-500"
                          : occurrence.severity === "medium"
                          ? "from-yellow-500 to-orange-500"
                          : "from-green-500 to-emerald-500"
                      } text-white border-0`}
                    >
                      {getSeverityLabel(occurrence.severity)}
                    </Badge>
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        occurrence.status
                      )} animate-pulse`}
                    ></div>
                    <span className="text-sm text-gray-500">
                      {getStatusLabel(occurrence.status)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {occurrence.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {occurrence.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-1 text-gray-600 ml-[-5px]">
                      <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                      <span className="truncate">{occurrence.location}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {occurrence.reporter}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      Unidade: {occurrence.unit}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {occurrence.date}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {occurrence.time}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/occurrences/${occurrence.id}`)
                      }
                    >
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredOccurrences.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma ocorrência encontrada
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou criar uma nova ocorrência.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
