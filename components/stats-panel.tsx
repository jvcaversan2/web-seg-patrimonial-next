import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  MapPin,
  Building,
  TrendingUp,
  Globe,
  Target,
  ArrowUpRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import { unidades, locaisEspecificos, ocorrencias } from "@/data/data";

interface StatsPanelProps {
  detailed?: boolean;
}

export function StatsPanel({ detailed = false }: StatsPanelProps) {
  const getOccurrencesForUnit = (unitId: string) =>
    ocorrencias.filter((o) => o.unidadeId === unitId);

  const getStatusForOccurrences = (unitOccurrences: typeof ocorrencias) => {
    const critical = unitOccurrences.filter(
      (o) => o.status === "critical"
    ).length;
    const warning = unitOccurrences.filter(
      (o) => o.status === "warning"
    ).length;
    if (critical > 0) return "critical";
    if (warning > 0) return "warning";
    return "active";
  };

  const unitStats = unidades.map((u) => {
    const ocorrenciasDaUnidade = getOccurrencesForUnit(u.id);
    const status = getStatusForOccurrences(ocorrenciasDaUnidade);
    const color =
      status === "critical"
        ? "border-red-500 text-red-600"
        : status === "warning"
        ? "border-yellow-500 text-yellow-600"
        : "border-green-500 text-green-600";

    return {
      id: u.id,
      unit: u.nome,
      code: u.codigo,
      occurrences: ocorrenciasDaUnidade.length,
      status,
      color,
    };
  });

  const estadosMapeados = [
    { state: "SP", unidades: ["ara", "caj", "cig", "cmp", "cub", "sor"] },
    { state: "RJ", unidades: ["cad", "ciu"] },
    { state: "MG", unidades: ["cma", "cmt", "rgd"] },
    { state: "GO", unidades: ["cat", "rvd"] },
    { state: "MT", unidades: ["ctv"] },
    { state: "BA", unidades: ["cmmm", "pra_i", "pra_ii"] },
    { state: "SE", unidades: ["cmc", "cmc_mist"] },
    { state: "PR", unidades: ["fpr"] },
    { state: "RS", unidades: ["upm"] },
    { state: "RO", unidades: ["rod"] },
    { state: "TO", unidades: ["ura_i", "ura_ii"] },
  ];

  const stateStats = estadosMapeados
    .map(({ state, unidades: uids }) => {
      const filtered = unitStats.filter((u) => uids.includes(u.id));

      const occurrences = filtered.reduce((s, u) => s + u.occurrences, 0);

      // 🔥 Determina a pior cor entre as unidades do estado
      let color = "border-green-500 text-green-600";
      if (filtered.some((u) => u.status === "critical")) {
        color = "border-red-500 text-red-600";
      } else if (filtered.some((u) => u.status === "warning")) {
        color = "border-yellow-500 text-yellow-600";
      }

      return {
        state,
        occurrences,
        units: filtered.length,
        color,
      };
    })
    .filter((s) => s.occurrences > 0);

  const totalOccurrences = ocorrencias.length;
  const totalLocaisEspecificos = locaisEspecificos.length;
  const totalUnits = unitStats.length;

  if (detailed) {
    return (
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border-2 border-red-500 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-red-100 p-3 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex items-center space-x-1 text-red-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium">+12%</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-red-600 text-sm font-semibold uppercase tracking-wide">
                    Total de Ocorrências
                  </p>
                  <p className="text-4xl font-bold text-red-600 mt-2">
                    {totalOccurrences}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-red-500">
                  <ArrowUpRight className="h-3 w-3" />
                  <span className="text-xs">vs mês anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">Ativo</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">
                    Unidades Ativas
                  </p>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    {totalUnits}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-green-500">
                  <CheckCircle className="h-3 w-3" />
                  <span className="text-xs">100% operacionais</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex items-center space-x-1 text-blue-600">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-medium">Monitorado</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                    Locais Específicos
                  </p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">
                    {totalLocaisEspecificos}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-500">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">Pontos de monitoramento</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats – mesma altura + rolagem interna em ambos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-[560px] overflow-hidden">
          {/* ESQUERDA */}
          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 flex flex-col min-h-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MapPin className="mr-3 h-5 w-5 text-purple-600" />
                Distribuição por Estado
              </CardTitle>
              <CardDescription className="text-gray-600">
                Ocorrências registradas por região
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 px-2 pb-2 flex-1 min-h-0 overflow-hidden">
              <div className="h-full overflow-y-auto pr-2">
                <div className="flex flex-col gap-3">
                  {stateStats.map((stat) => (
                    <div
                      key={stat.state}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${stat.color
                            .replace("text-", "bg-")
                            .replace("-600", "-500")}`}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {stat.state}
                          </p>
                          <p className="text-sm text-gray-500">
                            {stat.occurrences} ocorrências registradas
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gray-200 text-gray-700 font-medium"
                      >
                        {stat.units} unidade{stat.units > 1 ? "s" : ""}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DIREITA */}
          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 flex flex-col min-h-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Building className="mr-3 h-5 w-5 text-blue-600" />
                Status das Unidades
              </CardTitle>
              <CardDescription className="text-gray-600">
                Monitoramento operacional em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 px-2 pb-2 flex-1 min-h-0 overflow-hidden">
              <div className="h-full overflow-y-auto pr-2">
                <div className="flex flex-col gap-3">
                  {unitStats.map((stat) => (
                    <div
                      key={stat.unit}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full ${stat.color
                            .replace("border-", "bg-")
                            .replace("text-", "")
                            .replace("-600", "-500")}`}
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-900">
                            {stat.unit}
                          </p>
                          <p className="text-xs text-gray-500">
                            Código: {stat.code}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`${
                            stat.status === "critical"
                              ? "bg-red-100 text-red-600 border border-red-300"
                              : stat.status === "warning"
                              ? "bg-yellow-100 text-yellow-600 border border-yellow-300"
                              : "bg-green-100 text-green-600 border border-green-300"
                          } font-medium`}
                        >
                          {stat.occurrences}
                        </Badge>
                        {stat.status === "critical" && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        {stat.status === "warning" && (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        {stat.status === "active" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Compact view
  return (
    <div className="space-y-4">
      <Card className="bg-white border-2 border-red-500 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-red-600 text-sm font-semibold uppercase tracking-wide">
                Ocorrências
              </p>
              <p className="text-2xl font-bold text-red-600">
                {totalOccurrences}
              </p>
            </div>
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-2 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">
                Unidades
              </p>
              <p className="text-2xl font-bold text-green-600">{totalUnits}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <Building className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-2 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                Estados
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {stateStats.length}
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-2 border-purple-500 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">
                Pontos monitorados
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {locaisEspecificos.length}
              </p>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
