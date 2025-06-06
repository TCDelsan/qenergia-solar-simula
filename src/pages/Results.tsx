
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, Download, Share2, CheckCircle, 
  Zap, TrendingUp, Calendar, DollarSign,
  Sun, Battery, Home, Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SimulationData, SimulationResult } from "@/types/solar";
import { formatCurrency, formatNumber } from "@/utils/solarCalculations";

const Results = () => {
  const navigate = useNavigate();
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('simulationData');
    const savedResult = localStorage.getItem('simulationResult');

    if (!savedData || !savedResult) {
      toast.error("Dados da simulação não encontrados");
      navigate('/simulator');
      return;
    }

    try {
      setSimulationData(JSON.parse(savedData));
      setResult(JSON.parse(savedResult));
    } catch (error) {
      toast.error("Erro ao carregar dados da simulação");
      navigate('/simulator');
    }
  }, [navigate]);

  const handleDownloadProposal = () => {
    toast.success("Proposta sendo preparada para download!");
    // Aqui seria implementada a geração do arquivo PPTX/PDF
  };

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Minha Simulação Solar - QEnergia',
        text: `Simulei meu projeto solar e descobri que posso economizar ${formatCurrency(result?.annualSavings || 0)} por ano!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  if (!simulationData || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solar-blue mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  const roofTypeLabels = {
    ceramica: "Telhado Cerâmico",
    fibrocimento: "Fibrocimento", 
    metalico: "Telhado Metálico"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate('/simulator')} className="hover:bg-white/50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Nova Simulação
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleShareResults} className="hover:bg-white/50">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button onClick={handleDownloadProposal} className="bg-gradient-solar hover:opacity-90">
              <Download className="h-4 w-4 mr-2" />
              Baixar Proposta
            </Button>
          </div>
        </div>

        {/* Success Banner */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">
                Simulação Concluída com Sucesso!
              </h2>
              <p className="text-green-700">
                Encontramos a solução solar ideal para o perfil de <strong>{simulationData.name}</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Resultados */}
          <div className="lg:col-span-2 space-y-6">
            {/* Kit Selecionado */}
            <Card className="solar-card border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl gradient-text">
                      {result.selectedKit.name}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      Kit recomendado para seu consumo de {formatNumber(simulationData.monthlyConsumption)} kWh/mês
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm px-3 py-1">
                    Ideal para Você
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Especificações Técnicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Sun className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Potência Total</p>
                        <p className="font-semibold text-lg">{result.selectedKit.totalPower} kWp</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Battery className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Módulos Solares</p>
                        <p className="font-semibold text-lg">{result.selectedKit.modules} unidades</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Zap className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Inversores</p>
                        <p className="font-semibold text-lg">{result.selectedKit.inverters} unidade(s)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Home className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Área Necessária</p>
                        <p className="font-semibold text-lg">{result.selectedKit.areaRequired} m²</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Geração e Estrutura */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Detalhes do Sistema</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Geração Estimada:</span> {formatNumber(result.selectedKit.estimatedProduction)} kWh/mês</p>
                    <p><span className="font-medium">Tipo de Estrutura:</span> {result.selectedKit.structureType}</p>
                    <p><span className="font-medium">Tipo de Telhado:</span> {roofTypeLabels[simulationData.roofType]}</p>
                    <p><span className="font-medium">Cidade:</span> {simulationData.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Análise Financeira */}
            <Card className="solar-card border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Análise Financeira</span>
                </CardTitle>
                <CardDescription>
                  Projeção de economia e retorno do investimento
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Comparativo de Custos */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg mb-3">Comparativo Mensal</h4>
                    
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <p className="text-sm text-red-600 mb-1">Conta Atual (sem solar)</p>
                      <p className="text-2xl font-bold text-red-700">
                        {formatCurrency(result.currentMonthlyCost)}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-600 mb-1">Nova Conta (com solar)</p>
                      <p className="text-2xl font-bold text-green-700">
                        {formatCurrency(result.newMonthlyCost)}
                      </p>
                      <p className="text-xs text-green-600 mt-1">Apenas taxa mínima</p>
                    </div>
                  </div>
                  
                  {/* Economia e Payback */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg mb-3">Retorno do Investimento</h4>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-600 mb-1">Economia Anual</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {formatCurrency(result.annualSavings)}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="text-sm text-purple-600 mb-1">Payback</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {result.paybackTime} anos
                      </p>
                      <p className="text-xs text-purple-600 mt-1">Tempo para recuperar investimento</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Informações do Cliente e Ações */}
          <div className="space-y-6">
            {/* Dados do Cliente */}
            <Card className="solar-card border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Dados da Simulação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Cliente</p>
                  <p className="font-semibold">{simulationData.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Cidade</p>
                  <p className="font-semibold">{simulationData.city}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Consumo Mensal</p>
                  <p className="font-semibold">{formatNumber(simulationData.monthlyConsumption)} kWh</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Proposta Nº</p>
                  <p className="font-semibold font-mono">{result.proposalNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Data da Simulação</p>
                  <p className="font-semibold">{result.simulationDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card className="solar-card border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Próximos Passos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="bg-green-500 rounded-full p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span>Simulação concluída</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <span>Baixar proposta detalhada</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <span>Agendar visita técnica</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                      4
                    </div>
                    <span>Instalação do sistema</span>
                  </div>
                </div>
                
                <Separator />
                
                <Button className="w-full bg-gradient-solar hover:opacity-90">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Solicitar Orçamento Final
                </Button>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-solar text-white border-0">
              <CardContent className="p-6 text-center">
                <Sun className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="font-bold text-lg mb-2">Gostou da simulação?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Compartilhe com amigos e familiares para que eles também economizem!
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleShareResults}
                  className="bg-white text-solar-blue hover:bg-white/90 w-full"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar Resultados
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <div className="space-y-4">
            <p className="text-slate-600">
              Tem dúvidas sobre a simulação? Nossa equipe está pronta para ajudar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="hover:bg-white/50">
                <Link to="/simulator">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Fazer Nova Simulação
                </Link>
              </Button>
              <Button asChild className="bg-gradient-solar hover:opacity-90">
                <Link to="/dashboard">
                  Ver Histórico de Simulações
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Results;
