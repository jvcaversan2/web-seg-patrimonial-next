"use client";

import type React from "react";
import { useAudit } from "@/components/audit-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, MapPin, Upload, X } from "lucide-react";
import { unidades, locaisEspecificos } from "@/data/data";

export function OccurrenceForm() {
  const now = new Date();
  const today = new Date().toISOString().split("T")[0];

  const currentTime = now.toTimeString().split(":").slice(0, 2).join(":");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "",
    unit: "",
    location: "",
    reporter: "",
    date: today,
    time: currentTime,
  });
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const { logAction } = useAudit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Occurrence registered:", formData);
    console.log("Attached images:", attachedImages);

    // Log the action
    logAction(
      "CREATE_OCCURRENCE",
      `Ocorrência: ${formData.title}`,
      `Nova ocorrência criada na ${formData.unit} com severidade ${formData.severity} - ${attachedImages.length} imagens anexadas`,
      formData.severity === "critical"
        ? "critical"
        : formData.severity === "high"
        ? "high"
        : "medium",
      "occurrence"
    );

    // Reset form
    setFormData({
      title: "",
      description: "",
      severity: "",
      unit: "",
      location: "",
      reporter: "",
      date: "",
      time: "",
    });
    setAttachedImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      setAttachedImages((prev) => [...prev, ...imageFiles]);
    }
  };

  const removeImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto gap-2">
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <AlertTriangle className="mr-3 h-6 w-6 text-red-500" />
            Registrar Nova Ocorrência
          </CardTitle>
          <CardDescription>
            Preencha todos os campos para registrar uma nova ocorrência no
            sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Ocorrência *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Ex: Vazamento de produto químico"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severidade *</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) =>
                    setFormData({ ...formData, severity: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a severidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🟢 Baixa</SelectItem>
                    <SelectItem value="medium">🟡 Média</SelectItem>
                    <SelectItem value="high">🟠 Alta</SelectItem>
                    <SelectItem value="critical">🔴 Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="unit">Unidade *</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, unit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidades.map((unit) => (
                      <SelectItem key={unit.id} value={unit.codigo}>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {unit.nome}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Local Específico</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    setFormData({ ...formData, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o local específico" />
                  </SelectTrigger>
                  <SelectContent>
                    {locaisEspecificos.map((local) => (
                      <SelectItem key={local.id} value={local.nome}>
                        {local.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Data da Ocorrência *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporter">Responsável pelo Relato *</Label>
                <Input
                  id="reporter"
                  value={formData.reporter}
                  onChange={(e) =>
                    setFormData({ ...formData, reporter: e.target.value })
                  }
                  placeholder="Nome do funcionário"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição Detalhada *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descreva detalhadamente o que aconteceu, as circunstâncias, pessoas envolvidas, danos causados, etc."
                rows={5}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Anexar Imagens</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Clique para selecionar imagens
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG até 10MB cada
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {attachedImages.length > 0 && (
                <div className="space-y-3">
                  <Label>Imagens Anexadas ({attachedImages.length})</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {attachedImages.map((file, index) => (
                      <div
                        key={index}
                        className="relative group border rounded-lg overflow-hidden bg-gray-50"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Imagem ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="p-2">
                          <p className="text-xs text-gray-600 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Registrar Ocorrência
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
