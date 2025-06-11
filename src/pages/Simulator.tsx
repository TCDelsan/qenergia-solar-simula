
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, Sun, Building, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SimulationData } from "@/types/solar";
import { 
  calculateRequiredGeneration, 
  selectBestKit, 
  calculateSavings, 
  calculatePayback,
  generateProposalNumber 
} from "@/utils/solarCalculations";

const Simulator = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SimulationData>({
    name: "",
    city: "",
    monthlyConsumption: 0,
    roofType: "ceramica"
  });

  const handleInputChange = (field: keyof SimulationData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city || formData.monthlyConsumption <= 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (formData.monthlyConsumption < 75 || formData.monthlyConsumption > 37500) {
      toast.error("O valor da conta deve estar entre R$ 75 e R$ 37.500");
      return;
    }

    setIsLoading(true);

    try {
      // Simula processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Converter valor da conta para kWh aproximado (R$ 0,75 por kWh)
      const monthlyConsumptionKwh = Math.round(formData.monthlyConsumption / 0.75);
      const requiredGeneration = calculateRequiredGeneration(monthlyConsumptionKwh);
      const selectedKit = selectBestKit(requiredGeneration);

      if (!selectedKit) {
        toast.error("Valor muito alto para nossos kits padrão. Entraremos em contato para uma proposta personalizada.");
        setIsLoading(false);
        return;
      }

      const { currentMonthlyCost, newMonthlyCost, annualSavings } = calculateSavings(
        monthlyConsumptionKwh, 
        selectedKit.estimatedProduction
      );

      const paybackTime = calculatePayback(selectedKit.price, annualSavings);
      const proposalNumber = generateProposalNumber();

      const result = {
        requiredGeneration,
        selectedKit,
        annualSavings,
        paybackTime,
        currentMonthlyCost,
        newMonthlyCost,
        proposalNumber,
        simulationDate: new Date().toLocaleDateString('pt-BR'),
        monthlyBillValue: formData.monthlyConsumption
      };

      // Salva no localStorage para a página de resultados
      localStorage.setItem('simulationData', JSON.stringify({
        ...formData,
        monthlyBillValue: formData.monthlyConsumption
      }));
      localStorage.setItem('simulationResult', JSON.stringify(result));

      toast.success("Simulação concluída com sucesso!");
      navigate('/results');
    } catch (error) {
      toast.error("Erro ao processar simulação. Tente novamente.");
      setIsLoading(false);
    }
  };

  const roofTypes = [
    { value: "ceramica", label: "Telhado Cerâmico", icon: Home },
    { value: "fibrocimento", label: "Fibrocimento", icon: Building },
    { value: "metalico", label: "Telhado Metálico", icon: Building }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-qenergia-gray-light via-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-qenergia p-3 rounded-xl w-fit mx-auto mb-4">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-qenergia-blue mb-4">
              Simulador Fotovoltaico
            </h1>
            <p className="text-lg text-qenergia-gray-medium">
              Preencha os dados abaixo e descubra a solução solar ideal para você
            </p>
          </div>

          {/* Form */}
          <Card className="qenergia-card border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl gradient-text">Dados do Projeto</CardTitle>
              <CardDescription className="text-base text-qenergia-gray-medium">
                Todas as informações são utilizadas apenas para cálculos de viabilidade
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium text-qenergia-blue">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="h-12 text-base border-gray-300 focus:border-qenergia-green"
                    required
                  />
                </div>

                {/* Cidade */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-base font-medium text-qenergia-blue">
                    Cidade *
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Digite sua cidade"
                    className="h-12 text-base border-gray-300 focus:border-qenergia-green"
                    required
                  />
                </div>

                {/* Valor da Conta */}
                <div className="space-y-2">
                  <Label htmlFor="consumption" className="text-base font-medium text-qenergia-blue">
                    Valor Médio da Conta de Luz (R$) *
                  </Label>
                  <Input
                    id="consumption"
                    type="number"
                    min="75"
                    max="37500"
                    step="0.01"
                    value={formData.monthlyConsumption || ""}
                    onChange={(e) => handleInputChange('monthlyConsumption', Number(e.target.value))}
                    placeholder="Ex: 450.00"
                    className="h-12 text-base border-gray-300 focus:border-qenergia-green"
                    required
                  />
                  <p className="text-sm text-qenergia-gray-medium">
                    Consulte sua conta de luz para encontrar este valor
                  </p>
                </div>

                {/* Tipo de Telhado */}
                <div className="space-y-2">
                  <Label htmlFor="roofType" className="text-base font-medium text-qenergia-blue">
                    Tipo de Telhado *
                  </Label>
                  <Select 
                    value={formData.roofType} 
                    onValueChange={(value: any) => handleInputChange('roofType', value)}
                  >
                    <SelectTrigger className="h-12 text-base border-gray-300 focus:border-qenergia-green">
                      <SelectValue placeholder="Selecione o tipo de telhado" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 z-50">
                      {roofTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-base">
                          <div className="flex items-center space-x-2">
                            <type.icon className="h-4 w-4 text-qenergia-blue" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg bg-gradient-qenergia hover:opacity-90 transition-all duration-300 hover:shadow-xl text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processando Simulação...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sun className="h-5 w-5" />
                      <span>Calcular Projeto Solar</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4 bg-white/50 border-0">
              <div className="text-2xl font-bold text-qenergia-blue">+500</div>
              <div className="text-sm text-qenergia-gray-medium">Projetos Simulados</div>
            </Card>
            <Card className="text-center p-4 bg-white/50 border-0">
              <div className="text-2xl font-bold text-qenergia-green">98%</div>
              <div className="text-sm text-qenergia-gray-medium">Precisão nas Estimativas</div>
            </Card>
            <Card className="text-center p-4 bg-white/50 border-0">
              <div className="text-2xl font-bold text-qenergia-green">5 anos</div>
              <div className="text-sm text-qenergia-gray-medium">Payback Médio</div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Simulator;
