'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function LandingPageComponent() {
  const [selectedGif, setSelectedGif] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('chat')

  const sections = [
    { 
      title: 'Inserindo Nome', 
      description: 'Nesta etapa inicial, você insere seu nome para personalizar sua experiência e receber feedback individualizado ao longo da análise.', 
      gif: '/gif1.gif' 
    },
    { 
      title: 'Criando Chamado', 
      description: 'Nesta etapa, você cria um novo chamado, fornecendo detalhes sobre o problema ou solicitação que precisa de atenção.', 
      gif: '/gif2.gif' 
    },
    { 
      title: 'Envio de Feedback', 
      description: 'Na etapa final, você tem a oportunidade de enviar seu feedback sobre o atendimento, ajudando-nos a melhorar continuamente nossos serviços.', 
      gif: '/gif4.gif' 
    },
  ]

  const navItems = [
    { id: 'chat', label: 'Expi Chat' },
    { id: 'voice', label: 'Expi Voice' },
    { id: 'express', label: 'Expi Express' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindo à página de demonstração do Expi Analyzer</h1>
          <p className="text-xl mb-8">Explore nossas imagens incríveis e descubra mais sobre nossos serviços.</p>
          <button className="bg-white text-purple-500 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300">
            Saiba Mais
          </button>
        </div>
      </header>

      <nav className="bg-purple-100 shadow-md">
        <div className="container mx-auto px-6">
          <ul className="flex justify-center space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`py-4 px-2 text-lg font-semibold ${
                    activeSection === item.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-purple-500'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {activeSection === 'chat' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-600 text-center">Expi Chat</h2>
            <p className="text-lg text-center mb-8">Experimente nossa análise de chat interativa.</p>
            {sections.map((section, index) => (
              <motion.section 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="mb-12 sm:mb-24 py-8 sm:py-16"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-purple-600 text-center">{section.title}</h2>
                <div className="flex flex-col items-center gap-6 sm:gap-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center cursor-pointer"
                    onClick={() => setSelectedGif(section.gif)}
                  >
                    <Image
                      src={section.gif}
                      alt={section.title}
                      width={1000}
                      height={750}
                      className="w-full sm:max-w-4xl h-auto rounded-lg shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full sm:max-w-4xl px-4 sm:px-0"
                  >
                    <p className="text-lg sm:text-xl text-gray-700 text-center">{section.description}</p>
                  </motion.div>
                </div>
              </motion.section>
            ))}
          </div>
        )}
        {activeSection === 'voice' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-600 text-center">Expi Voice</h2>
            <p className="text-lg text-center mb-8">Descubra o poder da análise de voz com Expi Voice.</p>
            <div className="bg-purple-100 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Recursos do Expi Voice</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Análise de tom e emoção na voz</li>
                <li>Transcrição automática de áudio</li>
                <li>Detecção de palavras-chave</li>
                <li>Relatórios detalhados de análise vocal</li>
              </ul>
            </div>
          </div>
        )}
        {activeSection === 'express' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-600 text-center">Expi Express</h2>
            <p className="text-lg text-center mb-8">Análise rápida e eficiente com Expi Express.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Análise Instantânea</h3>
                <p>Obtenha resultados em segundos com nossa tecnologia de ponta.</p>
              </div>
              <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Integração Fácil</h3>
                <p>Conecte-se facilmente com suas ferramentas existentes.</p>
              </div>
              <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Personalização Avançada</h3>
                <p>Adapte a análise às necessidades específicas do seu negócio.</p>
              </div>
              <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Suporte 24/7</h3>
                <p>Nossa equipe está sempre disponível para ajudar.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Landing Page Interativa. Todos os direitos reservados.</p>
        </div>
      </footer>

      {selectedGif && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedGif(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-black bg-opacity-50 p-1 rounded-lg">
            <Image
              src={selectedGif}
              alt="GIF em tamanho grande"
              width={1000}
              height={750}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  )
}