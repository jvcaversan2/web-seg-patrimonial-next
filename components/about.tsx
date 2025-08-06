import { CheckCircle, Award, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function About() {
  const achievements = [
    { icon: Users, number: "500+", label: "Clientes Satisfeitos" },
    { icon: Clock, number: "15+", label: "Anos de Experiência" },
    { icon: Award, number: "50+", label: "Certificações" },
    { icon: CheckCircle, number: "99.9%", label: "Taxa de Sucesso" },
  ]

  const benefits = [
    "Equipe altamente treinada e certificada",
    "Tecnologia de ponta em segurança",
    "Atendimento 24 horas por dia",
    "Relatórios detalhados e transparentes",
    "Preços competitivos e justos",
    "Suporte técnico especializado",
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Sobre Nossa Empresa</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Com mais de 15 anos de experiência no mercado de segurança patrimonial, somos referência em proteção e
                monitoramento. Nossa missão é garantir a tranquilidade de nossos clientes através de soluções
                personalizadas e tecnologia de ponta.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Contamos com uma equipe de profissionais altamente qualificados e certificados, equipamentos modernos e
                um sistema de monitoramento que funciona 24 horas por dia, 7 dias por semana.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="text-lg px-8 py-3">
              Conheça Nossa História
            </Button>
          </div>

          {/* Image and Stats */}
          <div className="space-y-8">
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Equipe de Segurança"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <achievement.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.number}</div>
                  <div className="text-sm text-gray-600">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
