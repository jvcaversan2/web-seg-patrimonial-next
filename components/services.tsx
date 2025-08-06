import { Shield, Camera, Users, Clock, Phone, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Services() {
  const services = [
    {
      icon: Shield,
      title: "Segurança Patrimonial",
      description: "Vigilância especializada para proteção de patrimônio empresarial e residencial.",
      features: ["Vigilantes treinados", "Rondas programadas", "Relatórios detalhados"],
    },
    {
      icon: Camera,
      title: "Monitoramento CFTV",
      description: "Sistema de câmeras com monitoramento 24 horas e gravação em alta definição.",
      features: ["Câmeras HD", "Acesso remoto", "Armazenamento seguro"],
    },
    {
      icon: Users,
      title: "Portaria e Recepção",
      description: "Controle de acesso profissional com atendimento qualificado.",
      features: ["Controle de visitantes", "Atendimento cordial", "Registro de ocorrências"],
    },
    {
      icon: Clock,
      title: "Plantão 24h",
      description: "Cobertura completa com equipes preparadas para qualquer situação.",
      features: ["Disponibilidade total", "Resposta rápida", "Comunicação direta"],
    },
    {
      icon: Phone,
      title: "Central de Alarmes",
      description: "Monitoramento de sistemas de alarme com resposta imediata.",
      features: ["Monitoramento remoto", "Acionamento automático", "Suporte técnico"],
    },
    {
      icon: Lock,
      title: "Controle de Acesso",
      description: "Sistemas eletrônicos para controle e registro de entrada e saída.",
      features: ["Biometria", "Cartões de acesso", "Relatórios de movimento"],
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas de segurança adaptadas às necessidades específicas de cada cliente, com
            tecnologia avançada e profissionais qualificados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
