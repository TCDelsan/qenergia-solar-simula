
import { Sun, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-solar p-2 rounded-xl">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">QEnergia</h2>
                <p className="text-sm text-gray-300">Simulator</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Tecnologia avançada para simular e projetar sistemas fotovoltaicos 
              personalizados com máxima eficiência energética.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Início
              </Link>
              <Link to="/simulator" className="block text-gray-300 hover:text-white transition-colors">
                Simulador
              </Link>
              <Link to="/dashboard" className="block text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Serviços */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• Projetos Fotovoltaicos</p>
              <p>• Simulação Energética</p>
              <p>• Análise de Viabilidade</p>
              <p>• Instalação Completa</p>
              <p>• Manutenção Preventiva</p>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-solar-teal" />
                <span className="text-sm text-gray-300">contato@qenergia.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-solar-teal" />
                <span className="text-sm text-gray-300">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-solar-teal" />
                <span className="text-sm text-gray-300">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 QEnergia Simulator. Todos os direitos reservados. 
            Desenvolvido para revolucionar o mercado de energia solar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
