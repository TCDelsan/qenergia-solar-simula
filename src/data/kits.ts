
import { Kit } from '@/types/solar';

export const solarKits: Kit[] = [
  {
    id: 1,
    name: "Kit Residencial Básico",
    modules: 8,
    powerPerModule: 0.55,
    totalPower: 4.4,
    inverters: 1,
    areaRequired: 22,
    structureType: "Alumínio para telhado cerâmico",
    estimatedProduction: 620,
    price: 18500
  },
  {
    id: 2,
    name: "Kit Residencial Plus",
    modules: 12,
    powerPerModule: 0.55,
    totalPower: 6.6,
    inverters: 1,
    areaRequired: 33,
    structureType: "Alumínio para telhado cerâmico",
    estimatedProduction: 930,
    price: 25800
  },
  {
    id: 3,
    name: "Kit Residencial Premium",
    modules: 16,
    powerPerModule: 0.55,
    totalPower: 8.8,
    inverters: 1,
    areaRequired: 44,
    structureType: "Alumínio para telhado cerâmico",
    estimatedProduction: 1240,
    price: 33500
  },
  {
    id: 4,
    name: "Kit Comercial Compacto",
    modules: 20,
    powerPerModule: 0.55,
    totalPower: 11.0,
    inverters: 1,
    areaRequired: 55,
    structureType: "Estrutura para laje",
    estimatedProduction: 1550,
    price: 42000
  },
  {
    id: 5,
    name: "Kit Comercial Standard",
    modules: 30,
    powerPerModule: 0.55,
    totalPower: 16.5,
    inverters: 2,
    areaRequired: 82,
    structureType: "Estrutura para laje",
    estimatedProduction: 2325,
    price: 62500
  },
  {
    id: 6,
    name: "Kit Industrial Básico",
    modules: 40,
    powerPerModule: 0.55,
    totalPower: 22.0,
    inverters: 2,
    areaRequired: 110,
    structureType: "Estrutura metálica",
    estimatedProduction: 3100,
    price: 82000
  },
  {
    id: 7,
    name: "Kit Industrial Plus",
    modules: 60,
    powerPerModule: 0.55,
    totalPower: 33.0,
    inverters: 3,
    areaRequired: 165,
    structureType: "Estrutura metálica",
    estimatedProduction: 4650,
    price: 118000
  },
  {
    id: 8,
    name: "Kit Industrial Premium",
    modules: 80,
    powerPerModule: 0.55,
    totalPower: 44.0,
    inverters: 4,
    areaRequired: 220,
    structureType: "Estrutura metálica",
    estimatedProduction: 6200,
    price: 152000
  },
  {
    id: 9,
    name: "Kit Mega Industrial",
    modules: 100,
    powerPerModule: 0.55,
    totalPower: 55.0,
    inverters: 5,
    areaRequired: 275,
    structureType: "Estrutura metálica",
    estimatedProduction: 7750,
    price: 185000
  },
  {
    id: 10,
    name: "Kit Ultra Industrial",
    modules: 150,
    powerPerModule: 0.55,
    totalPower: 82.5,
    inverters: 7,
    areaRequired: 412,
    structureType: "Estrutura metálica",
    estimatedProduction: 11625,
    price: 275000
  }
];
