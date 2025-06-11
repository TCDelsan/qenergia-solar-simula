
import { useState } from "react";
import { Calculator, Sun, Building, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { SimulationData } from "@/types/solar";
import { 
  calculateRequiredGeneration, 
  selectBestKit, 
  calculateSavings, 
  calculatePayback,
  generateProposalNumber 
} from "@/utils/solarCalculations";
import { supabase } from "@/integrations/supabase/client";

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (simulationId: string) => void;
}

const SimulationModal = ({ isOpen, onClose, onSuccess }: SimulationModalProps) => {
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

      // Salvar no Supabase
      const { data: simulation, error } = await supabase
        .from('simulations')
        .insert({
          client_name: formData.name,
          client_city: formData.city,
          monthly_consumption: monthlyConsumptionKwh,
          roof_type: formData.roofType,
          proposal_number: proposalNumber,
          selected_kit_id: selectedKit.id,
          selected_kit_name: selectedKit.name,
          selected_kit_power: selectedKit.totalPower,
          selected_kit_price: selectedKit.price,
          required_generation: requiredGeneration,
          current_monthly_cost: currentMonthlyCost,
          new_monthly_cost: newMonthlyCost,
          annual_savings: annualSavings,
          payback_time: paybackTime
        })
        .select()
        .single();

      if (error) throw error;

      // Salvar dados para a página de resultados
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

      localStorage.setItem('simulationData', JSON.stringify({
        ...formData,
        monthlyBillValue: formData.monthlyConsumption
      }));
      localStorage.setItem('simulationResult', JSON.stringify(result));

      toast.success("Simulação concluída com sucesso!");
      onSuccess(simulation.id);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar simulação:', error);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-qenergia-blue">
            <div className="bg-gradient-qenergia p-2 rounded-xl">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            Simulador Fotovoltaico
          </DialogTitle>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <CardDescription className="text-base text-qenergia-gray-medium">
              Preencha os dados abaixo e descubra a solução solar ideal para você
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-qenergia-blue">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="h-10 border-gray-300 focus:border-qenergia-green"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-qenergia-blue">
                  Cidade *
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Digite sua cidade"
                  className="h-10 border-gray-300 focus:border-qenergia-green"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consumption" className="text-sm font-medium text-qenergia-blue">
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
                  className="h-10 border-gray-300 focus:border-qenergia-green"
                  required
                />
                <p className="text-xs text-qenergia-gray-medium">
                  Consulte sua conta de luz para encontrar este valor
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofType" className="text-sm font-medium text-qenergia-blue">
                  Tipo de Telhado *
                </Label>
                <Select 
                  value={formData.roofType} 
                  onValueChange={(value: any) => handleInputChange('roofType', value)}
                >
                  <SelectTrigger className="h-10 border-gray-300 focus:border-qenergia-green">
                    <SelectValue placeholder="Selecione o tipo de telhado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 z-50">
                    {roofTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4 text-qenergia-blue" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-qenergia hover:opacity-90 transition-all duration-300 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <span>Calcular Projeto Solar</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SimulationModal;
