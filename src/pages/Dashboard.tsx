
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Search, Filter, Download, Eye, 
  BarChart3, TrendingUp, Users, Zap,
  Calendar, DollarSign, Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Proposal } from "@/types/solar";
import { formatCurrency, formatNumber } from "@/utils/solarCalculations";

const Dashboard = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Simula dados de propostas
    const mockProposals: Proposal[] = [
      {
        id: "QEN202412001",
        clientData: {
          name: "João Silva",
          city: "São Paulo",
          monthlyConsumption: 450,
          roofType: "ceramica"
        },
        result: {
          requiredGeneration: 563,
          selectedKit: {
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
          annualSavings: 4050,
          paybackTime: 6.4,
          currentMonthlyCost: 337.5,
          newMonthlyCost: 30,
          proposalNumber: "QEN202412001",
          simulationDate: "15/12/2024"
        },
        createdAt: "2024-12-15T10:30:00",
        status: "sent"
      },
      {
        id: "QEN202412002",
        clientData: {
          name: "Maria Santos",
          city: "Rio de Janeiro",
          monthlyConsumption: 320,
          roofType: "fibrocimento"
        },
        result: {
          requiredGeneration: 400,
          selectedKit: {
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
          annualSavings: 2880,
          paybackTime: 6.4,
          currentMonthlyCost: 240,
          newMonthlyCost: 30,
          proposalNumber: "QEN202412002",
          simulationDate: "14/12/2024"
        },
        createdAt: "2024-12-14T15:45:00",
        status: "approved"
      },
      {
        id: "QEN202412003",
        clientData: {
          name: "Carlos Oliveira",
          city: "Belo Horizonte",
          monthlyConsumption: 680,
          roofType: "metalico"
        },
        result: {
          requiredGeneration: 850,
          selectedKit: {
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
          annualSavings: 6120,
          paybackTime: 5.5,
          currentMonthlyCost: 510,
          newMonthlyCost: 30,
          proposalNumber: "QEN202412003",
          simulationDate: "13/12/2024"
        },
        createdAt: "2024-12-13T09:20:00",
        status: "draft"
      }
    ];
    
    setProposals(mockProposals);
  }, []);

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.clientData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.clientData.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusLabels = {
    draft: { label: "Rascunho", color: "bg-gray-100 text-gray-700" },
    sent: { label: "Enviada", color: "bg-blue-100 text-blue-700" },
    approved: { label: "Aprovada", color: "bg-green-100 text-green-700" },
    rejected: { label: "Rejeitada", color: "bg-red-100 text-red-700" }
  };

  // Métricas calculadas
  const totalProposals = proposals.length;
  const totalPotential = proposals.reduce((sum, p) => sum + p.result.selectedKit.price, 0);
  const approvedProposals = proposals.filter(p => p.status === 'approved').length;
  const avgPayback = proposals.reduce((sum, p) => sum + p.result.paybackTime, 0) / proposals.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
            <p className="text-slate-600">Gerencie suas simulações e propostas fotovoltaicas</p>
          </div>
          
          <Button asChild className="bg-gradient-solar hover:opacity-90 mt-4 md:mt-0">
            <Link to="/simulator">
              <Plus className="h-4 w-4 mr-2" />
              Nova Simulação
            </Link>
          </Button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="solar-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total de Simulações</p>
                  <p className="text-2xl font-bold text-slate-800">{totalProposals}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="solar-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Potencial Total</p>
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalPotential)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="solar-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {totalProposals > 0 ? Math.round((approvedProposals / totalProposals) * 100) : 0}%
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="solar-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Payback Médio</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {totalProposals > 0 ? avgPayback.toFixed(1) : 0} anos
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Sun className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="solar-card border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por cliente, cidade ou número da proposta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="sent">Enviada</SelectItem>
                    <SelectItem value="approved">Aprovada</SelectItem>
                    <SelectItem value="rejected">Rejeitada</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="hover:bg-white/50">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Propostas */}
        <Card className="solar-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Histórico de Simulações</CardTitle>
            <CardDescription>
              Lista completa de todas as simulações realizadas
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {filteredProposals.length === 0 ? (
              <div className="text-center py-12">
                <Sun className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  Nenhuma simulação encontrada
                </h3>
                <p className="text-slate-500 mb-4">
                  {proposals.length === 0 
                    ? "Comece criando sua primeira simulação" 
                    : "Tente ajustar os filtros de busca"
                  }
                </p>
                <Button asChild className="bg-gradient-solar hover:opacity-90">
                  <Link to="/simulator">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Simulação
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proposta</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Cidade</TableHead>
                      <TableHead>Consumo</TableHead>
                      <TableHead>Kit Selecionado</TableHead>
                      <TableHead>Economia Anual</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProposals.map((proposal) => (
                      <TableRow key={proposal.id} className="hover:bg-slate-50">
                        <TableCell className="font-mono text-sm">
                          {proposal.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {proposal.clientData.name}
                        </TableCell>
                        <TableCell>
                          {proposal.clientData.city}
                        </TableCell>
                        <TableCell>
                          {formatNumber(proposal.clientData.monthlyConsumption)} kWh
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{proposal.result.selectedKit.name}</p>
                            <p className="text-xs text-slate-500">
                              {proposal.result.selectedKit.totalPower} kWp
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(proposal.result.annualSavings)}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusLabels[proposal.status].color}>
                            {statusLabels[proposal.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estatísticas Adicionais */}
        {proposals.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card className="solar-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">Distribuição por Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(statusLabels).map(([status, config]) => {
                    const count = proposals.filter(p => p.status === status).length;
                    const percentage = totalProposals > 0 ? (count / totalProposals) * 100 : 0;
                    
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={config.color}>
                            {config.label}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{count}</span>
                          <span className="text-sm text-slate-500 ml-2">
                            ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="solar-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">Kits Mais Selecionados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Kit Residencial Plus", count: 1 },
                    { name: "Kit Residencial Básico", count: 1 },
                    { name: "Kit Residencial Premium", count: 1 }
                  ].map((kit, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{kit.name}</span>
                      <span className="text-sm text-slate-500">{kit.count}x</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
