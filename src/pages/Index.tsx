
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Zap, TrendingUp, Shield, Clock, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Simulação Inteligente",
      description: "Algoritmo avançado que seleciona automaticamente o kit fotovoltaico ideal para cada perfil de consumo."
    },
    {
      icon: Zap,
      title: "Cálculos Precisos",
      description: "Estimativas precisas de geração, economia e payback baseadas em dados reais de performance."
    },
    {
      icon: TrendingUp,
      title: "ROI Transparente",
      description: "Análise completa do retorno sobre investimento com projeções de economia a longo prazo."
    },
    {
      icon: Shield,
      title: "Tecnologia Confiável",
      description: "Baseado em dados de mais de 10 kits padronizados testados e validados no mercado."
    },
    {
      icon: Clock,
      title: "Proposta Instantânea",
      description: "Gere propostas comerciais profissionais em segundos com todos os detalhes técnicos."
    },
    {
      icon: Sun,
      title: "Energia Limpa",
      description: "Contribua para um futuro sustentável com soluções de energia solar personalizadas."
    }
  ];

  const stats = [
    { number: "500+", label: "Projetos Simulados" },
    { number: "98%", label: "Precisão nas Estimativas" },
    { number: "5 anos", label: "Payback Médio" },
    { number: "30%", label: "Economia Média" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-solar-blue/10 to-solar-teal/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <Sun className="h-4 w-4 text-solar-teal mr-2" />
              <span className="text-sm font-medium text-solar-blue">
                Sistema Inteligente de Simulação Fotovoltaica
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">QEnergia</span>
              <br />
              <span className="text-slate-800">Simulator</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Revolucione seus projetos fotovoltaicos com nossa plataforma inteligente. 
              Simulações precisas, propostas automáticas e resultados em tempo real.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-solar hover:opacity-90 transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg px-8 py-4"
              >
                <Link to="/simulator">
                  Simular Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 hover:bg-white/50 text-lg px-8 py-4"
              >
                <Link to="/dashboard">
                  Ver Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Por que escolher o QEnergia Simulator?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tecnologia de ponta para transformar dados em soluções energéticas inteligentes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="solar-card hover-lift animate-slide-in border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="bg-gradient-solar p-3 rounded-xl w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-solar text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para revolucionar seus projetos fotovoltaicos?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Comece agora mesmo e descubra como nossa tecnologia pode 
              acelerar seus resultados e impressionar seus clientes.
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-white text-solar-blue hover:bg-white/90 border-2 border-white text-lg px-8 py-4"
            >
              <Link to="/simulator">
                Iniciar Simulação Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
