'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import {
  MoonIcon,
  SunIcon,
  Squares2X2Icon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  ClipboardIcon, 
  BoltIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

export function LandingPageComponent() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('home') 
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isButtonBouncing, setIsButtonBouncing] = useState(true)
  const sections = [
    { 
      title: 'Inserindo Nome de Usuário', 
      description: 'Nesta etapa inicial, você insere seu nome para personalizar sua experiência e receber feedback individualizado ao longo da análise.', 
      video: '/video1-1.mp4' 
    },
    { 
      title: 'Criando Chamado', 
      description: 'Nesta etapa, você cria um novo chamado, fornecendo detalhes sobre o problema ou solicitação que precisa de atenção.', 
      video: '/video2-2.mp4' 
    },
    { 
      title: 'Envio de Feedback', 
      description: 'Na etapa final, você tem a oportunidade de enviar seu feedback sobre o atendimento, ajudando-nos a melhorar continuamente nossos serviços.', 
      video: '/video3-3.mp4' 
    },
    { 
      title: 'Armazenamento de Chamados', 
      description: 'Nesta etapa, todos os chamados e feedbacks são armazenados em um dashboard centralizado, permitindo fácil acesso e análise para melhorias contínuas no atendimento.', 
      video: '/video4-4.mp4' 
    },
  ]

  const voiceSections = [
    { 
      title: 'Funcionalidades do Expi Voice', 
      description: 'Este vídeo demonstra como acessar o canal de voz e a entrada simultânea do atendente de suporte, proporcionando uma experiência de atendimento integrada e eficiente.', 
      video: '/voice1.mp4' 
    },
    { 
      title: 'Transcrição Automática da Chamada', 
      description: 'Neste vídeo, as conversas são iniciadas gerando a transcrição automaticamente, permitindo que o atendimento seja analisado detalhadamente.', 
      video: '/voice2.mp4' 
    },
    { 
      title: 'Analise de Feedbacks no Dashboard', 
      description: 'Neste vídeo, o chamado é transcrito automaticamente e analisado, retornando um feedback detalhado no dashboard, ajudando a categorizar e priorizar as interações.', 
      video: '/voice3.mp4' 
    }

  ]

  const expressSections = [
    { 
      title: 'Funcionalidades do Expi Express', 
      description: 'O Expi Express oferece análises em tempo real, permitindo respostas rápidas e eficientes às necessidades do cliente.', 
      video: '/express1.mp4' 
    },
    { 
      title: 'Suporte ao Cliente', 
      description: 'Neste vídeo, ocorre uma solicitação do cliente e o Expi Express responde com eficiência e rapidez, garantindo um fluxo de trabalho suave e integrado com suas ferramentas existentes.', 
      video: '/express2.mp4' 
    }
  ]

  const dashboardSections = [
    { 
      title: 'Visão Geral do Dashboard', 
      description: 'Explore o menu principal do dashboard e a funcionalidade de usuários. Visualize métricas essenciais e gerencie contas de usuário em uma interface intuitiva, proporcionando uma visão abrangente e acionável do desempenho do seu negócio.',
      video: '/dashboard1.mp4' 
    },
    { 
      title: 'Análise de Feedbacks', 
      description: 'Explore a página de feedbacks do dashboard gerados pelo Expi Chat, visualizando análises de sentimentos e insights valiosos em gráficos intuitivos.',
      video: '/dashboard2.mp4' 
    },
    { 
      title: 'Análise de Feedbacks URA', 
      description: 'Visualize os feedbacks gerados pelo Expi Voice, oferecendo insights detalhados sobre as interações de voz com os clientes.',
      video: '/dashboard3.mp4' 
    },
    { 
      title: 'Clientes', 
      description: 'Visualize e gerencie a lista de clientes que utilizam o Expi, permitindo um acompanhamento detalhado de cada conta.',
      video: '/dashboard4.mp4' 
    },
  ]

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Check for user's dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (sections.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const video = entry.target as HTMLVideoElement
              video.play()
            } else {
              const video = entry.target as HTMLVideoElement
              video.pause()
              video.currentTime = 0
            }
          })
        },
        { threshold: 0.5 }
      )

      videoRefs.current.forEach((video) => {
        if (video) observer.observe(video)
      })

      return () => {
        videoRefs.current.forEach((video) => {
          if (video) observer.unobserve(video)
        })
      }
    }
  }, [sections])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  const navItems = [
    { id: 'home', label: 'Home' }, // Novo item adicionado
    { id: 'chat', label: 'Expi Chat' },
    { id: 'voice', label: 'Expi Voice' },
    { id: 'express', label: 'Expi Express' },
    { id: 'dashboard', label: 'Expi Dashboard' }
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setIsButtonBouncing(false)
  }

  const buttonVariants = {
    initial: { opacity: 0, y: 50 },
    animate: isButtonBouncing 
      ? {
          opacity: 1,
          y: [0, -10, 0],
          transition: {
            y: {
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut"
            }
          }
        }
      : {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
          }
        },
    exit: { opacity: 0, y: 50 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  }

  

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-transparent absolute w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              {darkMode ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Expi Analyzer Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-semibold text-purple-600">Expi Analyzer</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-600 dark:text-purple-400 p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          )}
        </div>
      </header>

      {isMobile && isMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-white dark:bg-gray-800 shadow-md z-20">
          <ul className="container mx-auto px-6 py-4">
            {navItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`w-full py-3 px-4 text-left rounded-md transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-16 pt-32">
      {activeSection === 'home' && (
  <div className="mt-12">
  
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-purple-600">Bem Vindo ao Expi Analyzer</h2>
      <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">
        A solução completa para automatizar a coleta, análise e visualização de feedbacks com Inteligência Artificial.
      </p>
    </div>


    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-purple-600 text-center">Sobre o Expi</h3>
      <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl mx-auto">
        O Expi é uma plataforma que automatiza a coleta, análise e visualização de feedbacks com IA, ajudando empresas a entender e melhorar a satisfação dos clientes de forma eficiente e escalável.
      </p>
    </section>


    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-purple-600 text-center">Funcionalidades</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <Squares2X2Icon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Coleta Automatizada de Feedbacks</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Utiliza IA para captar feedbacks via interações automáticas e canais de voz.
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <ChartBarIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Análise Avançada com IA</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Avalia sentimentos e classifica feedbacks de forma inteligente.
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Dashboard de Análise</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Exibe ratings, gráficos e relatórios claros para gerar insights e melhorar estratégias.
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <Cog6ToothIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Integração Fácil</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Conecte-se facilmente com suas ferramentas existentes.
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <ClipboardIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Monitoramento Contínuo</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Acompanha a satisfação do cliente, facilitando melhorias constantes.
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <BoltIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Resposta Mais Rápida</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            A empresa consegue reagir imediatamente aos problemas identificados, aumentando a eficiência no atendimento ao cliente.
          </p>
        </div>
      </div>
    </section>

  
    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-purple-600 text-center">Benefícios</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <RocketLaunchIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Eficiência Operacional</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Elimina a necessidade de intervenção humana, reduzindo custos e tempo.
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <ChartBarIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Decisões Estratégicas Baseadas em Dados</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Oferece insights precisos para aprimorar produtos e serviços.
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700 p-4 rounded-lg shadow-sm">
          <Cog6ToothIcon className="w-8 h-8 text-purple-600 mb-2" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">Integração com Outras Ferramentas</h4>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            A automação pode ser integrada a sistemas de CRM e ERP, centralizando informações e facilitando a gestão.
          </p>
        </div>
      </div>
    </section>

  
    <section className="text-center">
      <h3 className="text-2xl font-semibold mb-4 text-purple-600">Pronto para Transformar sua Gestão de Feedbacks?</h3>
    </section>
  </div>
)}



        {activeSection === 'chat' && (
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-purple-600 text-center mt-16">Expi Chat</h2>
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
                    onClick={() => setSelectedVideo(section.video)}
                  >
                    <video
                      ref={(el: HTMLVideoElement | null) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      src={section.video}
                      loop
                      muted
                      playsInline
                      className="w-full max-w-2xl rounded-lg shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full sm:max-w-4xl px-4 sm:px-0"
                  >
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center">{section.description}</p>
                  </motion.div>
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {activeSection === 'voice' && (
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-purple-600 text-center mt-16">Expi Voice</h2>
            {voiceSections.map((section, index) => (
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
                    onClick={() => setSelectedVideo(section.video)}
                  >
                    <video
                      ref={(el: HTMLVideoElement | null) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      src={section.video}
                      loop
                      muted
                      playsInline
                      className="w-full max-w-2xl rounded-lg shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full sm:max-w-4xl px-4 sm:px-0"
                  >
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center">{section.description}</p>
                  </motion.div>
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {activeSection === 'express' && (
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-purple-600 text-center mt-16">Expi Express</h2>
            {expressSections.map((section, index) => (
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
                    onClick={() => setSelectedVideo(section.video)}
                  >
                    <video
                      ref={(el: HTMLVideoElement | null) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      src={section.video}
                      loop
                      muted
                      playsInline
                      className="w-full max-w-2xl rounded-lg shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full sm:max-w-4xl px-4 sm:px-0"
                  >
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center">{section.description}</p>
                  </motion.div>
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-purple-600 text-center mt-16">Expi Dashboard</h2>
            {dashboardSections.map((section, index) => (
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
                    onClick={() => setSelectedVideo(section.video)}
                  >
                    <video
                      ref={(el: HTMLVideoElement | null) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      src={section.video}
                      loop
                      muted
                      playsInline
                      className="w-full max-w-2xl rounded-lg shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full sm:max-w-4xl px-4 sm:px-0"
                  >
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center">{section.description}</p>
                  </motion.div>
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 z-50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            aria-label="Back to top"
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>

      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-black bg-opacity-50 p-1 rounded-lg">
            <video
              src={selectedVideo}
              autoPlay
              loop
              muted
              controls
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  )
}