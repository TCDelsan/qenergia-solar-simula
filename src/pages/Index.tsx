
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimulationModal from "@/components/SimulationModal";

const Index = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSimulationSuccess = (simulationId: string) => {
    navigate('/results');
  };

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50 animate-pulse">
        <a 
          href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20gostaria%20de%20saber%20mais%20sobre%20energia%20solar!" 
          className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white text-2xl shadow-lg transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: '#25D366' }}
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      {/* Header */}
      <header id="header" className="fixed w-full z-50 bg-white transition-all duration-300 h-30 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-bold text-blue-900 flex items-center">
              <img src="Imagens/Qenergia - Logo - Colorido.png" alt="Qenergia Logo" className="h-20 mr-3" />
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-blue-900 hover:text-green-600 transition">Início</a>
            <a href="#servicos" className="text-blue-900 hover:text-green-600 transition">Serviços</a>
            <a href="#portfolio" className="text-blue-900 hover:text-green-600 transition">Portfólio</a>
            <a href="#depoimentos" className="text-blue-900 hover:text-green-600 transition">Depoimentos</a>
            <a href="#contato" className="text-blue-900 hover:text-green-600 transition">Contato</a>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20gostaria%20de%20conhecer%20seus%20serviços!" className="text-green-600 hover:text-green-800 transition">
              <i className="fab fa-whatsapp text-2xl"></i>
            </a>
            <button className="md:hidden text-blue-900">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('Imagens/DJI_0986.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 10%'
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 90, 146, 0.4)' }}></div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white -translate-y-20 md:-translate-y-30">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Economize até 90% na sua conta de luz
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Transforme luz em economia com projetos 100% personalizados
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 inline-block px-8 py-3 rounded-full text-white font-semibold text-lg"
              style={{ backgroundColor: '#4db560' }}
            >
              Simular Meu Projeto
            </button>
            <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20gostaria%20de%20saber%20mais%20sobre%20energia%20solar!" 
               className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-semibold text-lg"
               style={{ backgroundColor: '#25D366' }}>
              <i className="fab fa-whatsapp mr-2"></i> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#005a92] mb-12">Vantagens da Energia Solar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-check-circle text-4xl text-[#4db560]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2">Redução da Conta</h3>
              <p className="text-gray-600">Economize até 90% na sua conta de energia elétrica com nosso sistema fotovoltaico.</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-check-circle text-4xl text-[#4db560]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2">Valorização do Imóvel</h3>
              <p className="text-gray-600">Seu imóvel pode valorizar até 10% com a instalação de um sistema de energia solar.</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-check-circle text-4xl text-[#4db560]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2">Proteção contra Reajustes</h3>
              <p className="text-gray-600">Proteja-se dos constantes aumentos nas tarifas de energia elétrica.</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-check-circle text-4xl text-[#4db560]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2">Energia Limpa</h3>
              <p className="text-gray-600">Contribua para um planeta mais sustentável com energia 100% renovável.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20gostaria%20de%20um%20orçamento%20para%20energia%20solar!" 
               className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
               style={{ backgroundColor: '#25D366' }}>
              <i className="fab fa-whatsapp mr-2"></i> Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#005a92] mb-12">Nossos Serviços</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:bg-blue-50 cursor-pointer">
              <div className="flex justify-center mb-4">
                <i className="fas fa-home text-4xl text-[#005a92]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2 text-center">Instalação Residencial</h3>
              <p className="text-gray-600 text-center">Soluções personalizadas para sua casa com o melhor custo-benefício do mercado.</p>
              <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20quero%20saber%20mais%20sobre%20instalação%20residencial!" 
                 className="block w-full mt-4 py-2 rounded text-white text-center transition-all duration-300 hover:opacity-90"
                 style={{ backgroundColor: '#4db560' }}>
                Solicitar Orçamento
              </a>
            </div>
            
            <div className="p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:bg-blue-50 cursor-pointer">
              <div className="flex justify-center mb-4">
                <i className="fas fa-store text-4xl text-[#005a92]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2 text-center">Soluções Comerciais</h3>
              <p className="text-gray-600 text-center">Reduza custos operacionais da sua empresa com energia solar de qualidade.</p>
              <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20quero%20saber%20mais%20sobre%20soluções%20comerciais!" 
                 className="block w-full mt-4 py-2 rounded text-white text-center transition-all duration-300 hover:opacity-90"
                 style={{ backgroundColor: '#4db560' }}>
                Solicitar Orçamento
              </a>
            </div>
            
            <div className="p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:bg-blue-50 cursor-pointer">
              <div className="flex justify-center mb-4">
                <i className="fas fa-chart-line text-4xl text-[#005a92]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2 text-center">Usina Investimento</h3>
              <p className="text-gray-600 text-center">Invista em energia solar e tenha retorno financeiro garantido por décadas.</p>
              <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20quero%20saber%20mais%20sobre%20usinas%20de%20investimento!" 
                 className="block w-full mt-4 py-2 rounded text-white text-center transition-all duration-300 hover:opacity-90"
                 style={{ backgroundColor: '#4db560' }}>
                Solicitar Orçamento
              </a>
            </div>
            
            <div className="p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-2.5 hover:bg-blue-50 cursor-pointer">
              <div className="flex justify-center mb-4">
                <i className="fas fa-industry text-4xl text-[#005a92]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#005a92] mb-2 text-center">Industrial – Zero Grid</h3>
              <p className="text-gray-600 text-center">Soluções robustas para indústrias que buscam independência energética.</p>
              <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20quero%20saber%20mais%20sobre%20soluções%20industriais!" 
                 className="block w-full mt-4 py-2 rounded text-white text-center transition-all duration-300 hover:opacity-90"
                 style={{ backgroundColor: '#4db560' }}>
                Solicitar Orçamento
              </a>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">Não sabe qual solução é ideal para você?</p>
            <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20preciso%20de%20ajuda%20para%20escolher%20a%20melhor%20solução%20de%20energia%20solar!" 
               className="inline-flex items-center px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
               style={{ backgroundColor: '#25D366' }}>
              <i className="fab fa-whatsapp mr-2"></i> Fale com Nossos Especialistas
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Nossos Projetos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Conheça alguns dos nossos trabalhos recentes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img src="Imagens/DJI_0986.jpg" alt="Hotel Ilha Flat" className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Hotel em Ilhabela</h3>
                  <p className="text-white text-sm">Sistema de 130,98kWp suprindo demanda energética de hospedagem sustentável montado no modelo carport.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img src="Imagens/DJI_0909.JPG" alt="Rafael Tirelli" className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Usina Investimento</h3>
                  <p className="text-white text-sm">Sistema de 203,2kWp instalado para geração de receita com energia solar.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img src="Imagens/dji_fly_20250401_105648_844_1743515845784_photo_optimized.JPG" alt="Patriani Mirai" className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Patriani Mirai Campestre</h3>
                  <p className="text-white text-sm">Sistema de 50kWp em empreendimento vertical com rápido retorno financeiro.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img src="Imagens/DJI_0757.JPG" alt="Bueno Car" className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Oficina em Taubaté</h3>
                  <p className="text-white text-sm">Sistema de 13,8kWp para compensação de energia em ambiente automotivo.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img src="Imagens/DJI_0067.JPG" alt="Net Car" className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Concessionária em Taubaté</h3>
                  <p className="text-white text-sm">Sistema de 31,21kWp para abastecer showroom e oficinas com energia limpa.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img src="Imagens/DJI_0496.JPG" alt="Condomínio Jardim das Palmeiras" className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Condomínio Jardim das Palmeiras</h3>
                  <p className="text-white text-sm">Sistema de 88,56kWp com geração dividida entre 4 torres residenciais.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avaliações Google Reviews */}
      <section id="avaliacoes" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#005a92] mb-6">O que estão falando da Qenergia</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">Veja as avaliações reais de clientes no Google:</p>
          <div className="elfsight-app-8f585302-22de-47ad-b72a-df42ec787460"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-green-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Solicite seu projeto personalizado!</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-white hover:bg-gray-100 text-blue-900 px-8 py-3 rounded-full font-medium transition duration-300 transform hover:scale-105"
          >
            Simular Meu Projeto
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-[#005a92] mb-12">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50">
                <h3 className="font-medium text-[#005a92]">Quanto tempo dura um sistema de energia solar?</h3>
              </div>
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600 mb-3">Um sistema de energia solar fotovoltaico tem vida útil média de 25 a 30 anos, mantendo eficiência mesmo após décadas. A maioria dos painéis vem com garantia de performance de até 80% após 25 anos de uso.</p>
                <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20quero%20saber%20mais%20sobre%20a%20vida%20útil%20dos%20sistemas%20solares!" className="text-[#4db560] font-medium hover:underline">
                  Saiba mais sobre durabilidade <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50">
                <h3 className="font-medium text-[#005a92]">Quanto custa instalar energia solar?</h3>
              </div>
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600 mb-3">O valor do sistema varia conforme o consumo de energia e características do local. Em média, o investimento se paga em 2 a 4 anos com a economia na conta de luz.</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded text-white text-sm transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: '#4db560' }}
                >
                  Simular Meu Projeto
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50">
                <h3 className="font-medium text-[#005a92]">Preciso de manutenção frequente no sistema?</h3>
              </div>
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600">A manutenção é mínima. Recomendamos limpeza dos painéis 1-2 vezes ao ano e verificação do inversor. Oferecemos pacotes de manutenção preventiva para garantir máxima eficiência do seu sistema.</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50">
                <h3 className="font-medium text-[#005a92]">Funciona em dias nublados ou chuvosos?</h3>
              </div>
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600">Sim! Os painéis solares captam a luz difusa mesmo em dias nublados, com produção reduzida. O sistema é dimensionado para compensar períodos de menor insolação.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">Ainda tem dúvidas sobre energia solar?</p>
            <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20tenho%20algumas%20dúvidas%20sobre%20energia%20solar,%20pode%20me%20ajudar?" 
               className="inline-flex items-center px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
               style={{ backgroundColor: '#25D366' }}>
              <i className="fab fa-whatsapp mr-2"></i> Fale com Nossos Especialistas
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-[#005a92]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para Economizar na sua Conta de Luz?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Solicite um orçamento sem compromisso e descubra como a energia solar pode transformar suas finanças.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#4db560' }}
            >
              Simular Meu Projeto
            </button>
            <a href="https://wa.me/5512996291339?text=Olá%20Qenergia,%20quero%20fazer%20um%20orçamento%20para%20energia%20solar!" 
               className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
               style={{ backgroundColor: '#25D366' }}>
              <i className="fab fa-whatsapp mr-2"></i> Orçamento pelo WhatsApp
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center text-white">
              <i className="fas fa-check-circle text-[#4db560] mr-2"></i>
              <span>Sem custo de consultoria</span>
            </div>
            <div className="flex items-center text-white">
              <i className="fas fa-check-circle text-[#4db560] mr-2"></i>
              <span>Projeto personalizado</span>
            </div>
            <div className="flex items-center text-white">
              <i className="fas fa-check-circle text-[#4db560] mr-2"></i>
              <span>Instalação rápida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Solicite um Orçamento</h2>
              <p className="text-xl text-gray-600">Preencha os campos abaixo e nossa equipe entrará em contato com você</p>
            </div>

            <form 
              action="https://formspree.io/f/xpwdopbr" 
              method="POST"
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="nome" className="block text-gray-700 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    id="nome" 
                    name="nome"
                    placeholder="Digite seu nome" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-gray-700 mb-2">Telefone</label>
                  <input 
                    type="tel" 
                    id="telefone" 
                    name="telefone"
                    placeholder="(00) 00000-0000" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-gray-700 mb-2">Cidade</label>
                  <input 
                    type="text" 
                    id="cidade" 
                    name="cidade"
                    placeholder="Ex: Taubaté" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="tipo" className="block text-gray-700 mb-2">Tipo de Projeto</label>
                  <select 
                    id="tipo" 
                    name="tipo"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 transition"
                  >
                    <option value="">Selecione</option>
                    <option value="Residência">Residência</option>
                    <option value="Comércio">Comércio</option>
                    <option value="Indústria">Indústria</option>
                    <option value="Usina de Investimento">Usina de Investimento</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="consumo" className="block text-gray-700 mb-2">Consumo Médio Mensal</label>
                  <select 
                    id="consumo" 
                    name="consumo" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 transition"
                  >
                    <option value="">Selecione a faixa</option>
                    <option value="0–250 kWh">Até R$ 200,00</option>
                    <option value="251–500 kWh">De R$ 201,00 até R$ 450,00</option>
                    <option value="501–750 kWh">De R$ 451,00 até R$ 700,00</option>
                    <option value="751–1.000 kWh">De R$ 701,00 até R$ 950,00</option>
                    <option value="1.001–1.500 kWh">De R$ 951,00 até R$ 1.400,00</option>
                    <option value="1.501–2.000 kWh">De R$ 1.401,00 até R$ 1.850,00</option>
                    <option value="2.001+ kWh">Acima de R$ 2.000,00</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition duration-300 transform hover:scale-105"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="w-full text-center py-6 bg-gray-100 text-gray-700 text-sm font-medium tracking-wide">
        <span>Desenvolvido por <strong className="text-[#005a92]">Marcos Delgado SAT</strong></span>
      </div>

      {/* Simulation Modal */}
      <SimulationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSimulationSuccess}
      />
    </div>
  );
};

export default Index;
