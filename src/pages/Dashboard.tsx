
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Search, Filter, Download, Eye, LogOut,
  BarChart3, TrendingUp, Users, Zap,
  Calendar, DollarSign, Sun, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatNumber } from "@/utils/solarCalculations";

interface Simulation {
  id: string;
  client_name: string;
  client_city: string;
  monthly_consumption: number;
  roof_type: string;
  proposal_number: string;
  selected_kit_name: string;
  selected_kit_power: number;
  annual_savings: number;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      fetchSimulations();
    }
  }, [user, loading, navigate]);

  const fetchSimulations = async () => {
    try {
      const { data, error } = await supabase
        .from('simulations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSimulations(data || []);
    } catch (error) {
      console.error('Erro ao buscar simulações:', error);
      toast.error("Erro ao carregar simulações");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logout realizado com sucesso!");
      navigate('/');
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

  const updateSimulationStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('simulations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setSimulations(prev => 
        prev.map(sim => 
          sim.id === id ? { ...sim, status: newStatus } : sim
        )
      );

      toast.success("Status atualizado com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error("Erro ao atualizar status");
    }
  };

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solar-blue mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const filteredSimulations = simulations.filter(simulation => {
    const matchesSearch = simulation.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         simulation.client_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         simulation.proposal_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || simulation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusLabels = {
    new: { label: "Nova", color: "bg-blue-100 text-blue-700" },
    contacted: { label: "Contatado", color: "bg-yellow-100 text-yellow-700" },
    proposal_sent: { label: "Proposta Enviada", color: "bg-purple-100 text-purple-700" },
    approved: { label: "Aprovada", color: "bg-green-100 text-green-700" },
    rejected: { label: "Rejeitada", color: "bg-red-100 text-red-700" },
    installed: { label: "Instalado", color: "bg-emerald-100 text-emerald-700" }
  };

  // Métricas calculadas
  const totalSimulations = simulations.length;
  const totalPotential = simulations.reduce((sum, s) => sum + s.annual_savings, 0);
  const approvedSimulations = simulations.filter(s => s.status === 'approved').length;
  const avgConsumption = simulations.length > 0 ? 
    simulations.reduce((sum, s) => sum + s.monthly_consumption, 0) / simulations.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-solar p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">QEnergia Dashboard</h1>
                <p className="text-sm text-slate-600">Gestão de Simulações</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">
                Olá, {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="solar-card border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total de Simulações</p>
                  <p className="text-2xl font-bold text-slate-800">{totalSimulations}</p>
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
                  <p className="text-sm text-slate-500 mb-1">Economia Total/Ano</p>
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
                    {totalSimulations > 0 ? Math.round((approvedSimulations / totalSimulations) * 100) : 0}%
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
                  <p className="text-sm text-slate-500 mb-1">Consumo Médio</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {Math.round(avgConsumption)} kWh
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-orange-600" />
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
                    <SelectItem value="new">Nova</SelectItem>
                    <SelectItem value="contacted">Contatado</SelectItem>
                    <SelectItem value="proposal_sent">Proposta Enviada</SelectItem>
                    <SelectItem value="approved">Aprovada</SelectItem>
                    <SelectItem value="rejected">Rejeitada</SelectItem>
                    <SelectItem value="installed">Instalado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Simulações */}
        <Card className="solar-card border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Simulações Recebidas</CardTitle>
            <CardDescription>
              Lista completa de todas as simulações realizadas pelos clientes
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {filteredSimulations.length === 0 ? (
              <div className="text-center py-12">
                <Sun className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  Nenhuma simulação encontrada
                </h3>
                <p className="text-slate-500">
                  {simulations.length === 0 
                    ? "Aguardando primeiras simulações" 
                    : "Tente ajustar os filtros de busca"
                  }
                </p>
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
                    {filteredSimulations.map((simulation) => (
                      <TableRow key={simulation.id} className="hover:bg-slate-50">
                        <TableCell className="font-mono text-sm">
                          {simulation.proposal_number}
                        </TableCell>
                        <TableCell className="font-medium">
                          {simulation.client_name}
                        </TableCell>
                        <TableCell>
                          {simulation.client_city}
                        </TableCell>
                        <TableCell>
                          {formatNumber(simulation.monthly_consumption)} kWh
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{simulation.selected_kit_name}</p>
                            <p className="text-xs text-slate-500">
                              {simulation.selected_kit_power} kWp
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(simulation.annual_savings)}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={simulation.status}
                            onValueChange={(value) => updateSimulationStatus(simulation.id, value)}
                          >
                            <SelectTrigger className="w-fit border-0 bg-transparent p-0 h-auto">
                              <Badge className={statusLabels[simulation.status as keyof typeof statusLabels].color}>
                                {statusLabels[simulation.status as keyof typeof statusLabels].label}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusLabels).map(([key, config]) => (
                                <SelectItem key={key} value={key}>
                                  <Badge className={config.color}>
                                    {config.label}
                                  </Badge>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(simulation.created_at).toLocaleDateString('pt-BR')}
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
      </div>
    </div>
  );
};

export default Dashboard;
