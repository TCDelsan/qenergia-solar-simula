
import { Kit } from '@/types/solar';
import { solarKits } from '@/data/kits';

const KWH_PRICE = 0.75; // R$ por kWh (valor médio nacional)
const PERFORMANCE_FACTOR = 0.8; // Fator de performance para cálculos

export const calculateRequiredGeneration = (monthlyConsumption: number): number => {
  return Math.ceil(monthlyConsumption / PERFORMANCE_FACTOR);
};

export const selectBestKit = (requiredGeneration: number): Kit | null => {
  // Encontra o kit com menor capacidade que atende a geração necessária
  const suitableKits = solarKits.filter(kit => kit.estimatedProduction >= requiredGeneration);
  
  if (suitableKits.length === 0) {
    return null; // Nenhum kit atende
  }
  
  // Retorna o kit mais econômico que atende
  return suitableKits.reduce((best, current) => 
    current.price < best.price ? current : best
  );
};

export const calculateSavings = (
  monthlyConsumption: number, 
  kitProduction: number
): {
  currentMonthlyCost: number;
  newMonthlyCost: number;
  annualSavings: number;
} => {
  const currentMonthlyCost = monthlyConsumption * KWH_PRICE;
  const monthlyProduction = kitProduction;
  
  // Assume que a produção cobre o consumo, sobrando apenas a taxa mínima
  const newMonthlyCost = Math.max(0, (monthlyConsumption - monthlyProduction) * KWH_PRICE) + 30; // Taxa mínima
  
  const monthlySavings = Math.max(0, currentMonthlyCost - newMonthlyCost);
  const annualSavings = monthlySavings * 12;
  
  return {
    currentMonthlyCost,
    newMonthlyCost,
    annualSavings
  };
};

export const calculatePayback = (kitPrice: number, annualSavings: number): number => {
  if (annualSavings <= 0) return 0;
  return Math.round((kitPrice / annualSavings) * 10) / 10; // Arredonda para 1 casa decimal
};

export const generateProposalNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `QEN${year}${month}${random}`;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

// Função para converter valor da conta em kWh
export const convertBillValueToKwh = (billValue: number): number => {
  return Math.round(billValue / KWH_PRICE);
};

// Função para converter kWh em valor da conta
export const convertKwhToBillValue = (kwh: number): number => {
  return kwh * KWH_PRICE;
};
