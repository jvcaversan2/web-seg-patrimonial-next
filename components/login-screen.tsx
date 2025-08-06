"use client";

import type React from "react";
import { useAudit } from "@/components/audit-context";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Eye, EyeOff, Leaf, Factory } from "lucide-react";
import Image from "next/image";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { logAction } = useAudit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log successful login
    logAction(
      "LOGIN",
      "Sistema",
      `Login realizado com sucesso para ${credentials.email}`,
      "low",
      "auth"
    );

    // Simulate login
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-300/10 rounded-full blur-2xl"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 animate-bounce">
        <Leaf className="h-8 w-8 text-white/30" />
      </div>
      <div className="absolute bottom-20 right-20 animate-pulse">
        <Factory className="h-10 w-10 text-white/20" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <Image
            src="/Group 47.svg"
            alt="Logo"
            width={80}
            height={80}
            className="w-20 h-20"
          />
          <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
            Mosaic Fertilizantes
          </h1>
          <p className="text-emerald-100 text-lg">Portal de Segurança</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Acesso ao Sistema
            </CardTitle>
            <CardDescription className="text-gray-600">
              Entre com suas credenciais para acessar o portal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  className="border-2 border-gray-200 focus:border-green-500 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="border-2 border-gray-200 focus:border-green-500 transition-colors pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Entrar no Portal
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-white/80">
          © 2024 Mosaic Fertilizantes. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}
