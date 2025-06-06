
export interface Kit {
  id: number;
  name: string;
  modules: number;
  powerPerModule: number; // kWp
  totalPower: number; // kWp
  inverters: number;
  microInverters?: number;
  areaRequired: number; // m²
  structureType: string;
  estimatedProduction: number; // kWh/mês
  price: number; // R$
}

export interface SimulationData {
  name: string;
  city: string;
  monthlyConsumption: number; // kWh
  roofType: 'ceramica' | 'fibrocimento' | 'metalico';
  proposalNumber?: string;
}

export interface SimulationResult {
  requiredGeneration: number; // kWh/mês
  selectedKit: Kit;
  annualSavings: number; // R$
  paybackTime: number; // anos
  currentMonthlyCost: number; // R$
  newMonthlyCost: number; // R$
  proposalNumber: string;
  simulationDate: string;
}

export interface Proposal {
  id: string;
  clientData: SimulationData;
  result: SimulationResult;
  createdAt: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
}
