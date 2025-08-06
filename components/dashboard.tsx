"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { MapView } from "@/components/map-view";
import { StatsPanel } from "@/components/stats-panel";
import { OccurrenceForm } from "@/components/occurrence-form";
import { OccurrenceList } from "@/components/occurrence-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditLog } from "@/components/audit-log";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white shadow-lg border border-gray-200 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Portal de Monitoramento
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Mosaic Fertilizantes - Acompanhe ocorrências em tempo real
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="flex w-full bg-white shadow-lg border border-gray-200 p-1 h-auto">
            <TabsTrigger
              value="map"
              className="flex-1 justify-center px-2 py-3 font-semibold transition-all duration-200 text-sm
                         data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700
                         hover:bg-gray-50 rounded-md min-w-0"
            >
              <span className="truncate">🗺️ Mapa</span>
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="flex-1 justify-center px-2 py-3 font-semibold transition-all duration-200 text-sm
                         data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700
                         hover:bg-gray-50 rounded-md min-w-0"
            >
              <span className="truncate">📊 Estatísticas</span>
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="flex-1 justify-center px-2 py-3 font-semibold transition-all duration-200 text-sm
                         data-[state=active]:bg-green-100 data-[state=active]:text-green-700
                         hover:bg-gray-50 rounded-md min-w-0"
            >
              <span className="truncate">➕ Registrar</span>
            </TabsTrigger>
            <TabsTrigger
              value="occurrences"
              className="flex-1 justify-center px-2 py-3 font-semibold transition-all duration-200 text-sm
                         data-[state=active]:bg-red-100 data-[state=active]:text-red-700
                         hover:bg-gray-50 rounded-md min-w-0"
            >
              <span className="truncate">📋 Ocorrências</span>
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="flex-1 justify-center px-2 py-3 font-semibold transition-all duration-200 text-sm
                         data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700
                         hover:bg-gray-50 rounded-md min-w-0"
            >
              <span className="truncate">🔍 Auditoria</span>
            </TabsTrigger>
          </TabsList>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <div className="grid xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <MapView />
              </div>
              <div className="xl:col-span-1">
                <StatsPanel />
              </div>
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <StatsPanel detailed />
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <OccurrenceForm />
          </TabsContent>

          {/* Occurrences Tab */}
          <TabsContent value="occurrences">
            <OccurrenceList />
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit">
            <AuditLog />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
