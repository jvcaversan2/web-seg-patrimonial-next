"use client";

import { useEffect, useState } from "react";
import { ocorrencias } from "@/data/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Target,
} from "lucide-react";

export function MapView() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  // Importações que precisam de window
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  const L = require("leaflet");

  require("leaflet/dist/leaflet.css");

  // Corrigido: caminhos absolutos para /public
  const greenIcon = new L.Icon({
    iconUrl: "/icons/marker-icon-green.png",
    shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const yellowIcon = new L.Icon({
    iconUrl: "/icons/marker-icon-yellow.png",
    shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl: "/icons/marker-icon-red.png",
    shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case "active":
        return greenIcon;
      case "warning":
        return yellowIcon;
      case "critical":
        return redIcon;
      default:
        return greenIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return CheckCircle;
      case "warning":
        return Clock;
      case "critical":
        return AlertTriangle;
      default:
        return MapPin;
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardHeader className="bg-gray-50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Mapa de Ocorrências
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Visualização interativa das ocorrências registradas
              </p>
            </div>
          </div>
          <Badge className="bg-gray-100 text-gray-700 px-3 py-1 border border-gray-300">
            {ocorrencias.length} Ocorrências
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative h-[500px] z-0">
          <MapContainer
            center={[-21.5, -45]}
            zoom={5}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            />

            {ocorrencias.map((occurrence) => {
              const StatusIcon = getStatusIcon(occurrence.status);

              return (
                <Marker
                  key={occurrence.id}
                  position={[occurrence.lat, occurrence.lng]}
                  icon={getMarkerIcon(occurrence.status)}
                >
                  <Popup>
                    <div className="space-y-2 w-64">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(
                              occurrence.status
                            )}`}
                          ></div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm">
                              {occurrence.titulo}
                            </h4>
                            <p className="text-gray-500 text-xs font-medium">
                              Unidade: {occurrence.unidadeId}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            occurrence.status === "critical"
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : occurrence.status === "warning"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                              : "bg-green-100 text-green-700 border border-green-300"
                          } font-semibold text-xs`}
                        >
                          {occurrence.status === "critical"
                            ? "Crítico"
                            : occurrence.status === "warning"
                            ? "Atenção"
                            : "Ativo"}
                        </Badge>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <StatusIcon className="h-4 w-4 text-gray-600" />
                          <span className="font-semibold text-gray-700">
                            Status:{" "}
                            {occurrence.status === "active"
                              ? "Ativo"
                              : occurrence.status === "warning"
                              ? "Atenção"
                              : "Crítico"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {occurrence.status === "active"
                            ? "Unidade operando normalmente."
                            : occurrence.status === "warning"
                            ? "Atenção: risco potencial."
                            : "Crítico: ação imediata necessária."}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                        <div className="bg-gray-50 p-2 border border-gray-200 rounded">
                          <p className="font-semibold">Atualização</p>
                          <p>{occurrence.status}</p>
                        </div>
                        <div className="bg-gray-50 p-2 border border-gray-200 rounded">
                          <p className="font-semibold">Próxima Verificação</p>
                          <p>Em 15 min</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-all border border-gray-300 flex items-center justify-center space-x-1">
                          <ArrowUpRight className="h-3 w-3" />
                          <span>Ver Detalhes</span>
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-all border border-gray-300 flex items-center justify-center space-x-1">
                          <Target className="h-3 w-3" />
                          <span>Relatório</span>
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
