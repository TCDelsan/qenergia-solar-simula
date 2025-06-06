
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

    if (formData.monthlyConsumption < 100 || formData.monthlyConsumption > 50000) {
      toast.error("O consumo mensal deve estar entre 100 e 50.000 kWh");
      return;
    }

    setIsLoading(true);

    try {
      const requiredGeneration = calculateRequiredGeneration(formData.monthlyConsumption);
      const selectedKit = selectBestKit(requiredGeneration);

      if (!selectedKit) {
        toast.error("Consumo muito alto para nossos kits padrão. Entraremos em contato para uma proposta personalizada.");
        setIsLoading(false);
        return;
      }

      const { currentMonthlyCost, newMonthlyCost, annualSavings } = calculateSavings(
        formData.monthlyConsumption, 
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
          monthly_consumption: formData.monthlyConsumption,
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
        simulationDate: new Date().toLocaleDateString('pt-BR')
      };

      localStorage.setItem('simulationData', JSON.stringify(formData));
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="bg-gradient-solar p-2 rounded-xl">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            Simulador Fotovoltaico
          </DialogTitle>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <CardDescription className="text-base">
              Preencha os dados abaixo e descubra a solução solar ideal para você
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="h-10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  Cidade *
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Digite sua cidade"
                  className="h-10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consumption" className="text-sm font-medium">
                  Consumo Mensal Médio (kWh) *
                </Label>
                <Input
                  id="consumption"
                  type="number"
                  min="100"
                  max="50000"
                  value={formData.monthlyConsumption || ""}
                  onChange={(e) => handleInputChange('monthlyConsumption', Number(e.target.value))}
                  placeholder="Ex: 450"
                  className="h-10"
                  required
                />
                <p className="text-xs text-slate-500">
                  Consulte sua conta de luz para encontrar este valor
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofType" className="text-sm font-medium">
                  Tipo de Telhado *
                </Label>
                <Select 
                  value={formData.roofType} 
                  onValueChange={(value: any) => handleInputChange('roofType', value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Selecione o tipo de telhado" />
                  </SelectTrigger>
                  <SelectContent>
                    {roofTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-solar hover:opacity-90 transition-all duration-300"
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
