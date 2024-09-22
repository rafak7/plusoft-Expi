'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export function LandingPageComponent() {
  const [selectedGif, setSelectedGif] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('chat')
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isButtonBouncing, setIsButtonBouncing] = useState(true)
  const sections = [
    { 
      title: 'Inserindo Nome de Usuário', 
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
    { 
      title: 'Armazenamento de Chamados', 
      description: 'Nesta etapa, todos os chamados e feedbacks são armazenados em um dashboard centralizado, permitindo fácil acesso e análise para melhorias contínuas no atendimento.', 
      gif: '/gif5.gif' 
    },
  ]

  const gifRefs = useRef<(HTMLImageElement | null)[]>([])

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
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.src || ''
            } else {
              const img = entry.target as HTMLImageElement
              img.src = ''
            }
          })
        },
        { threshold: 0.5 }
      )

      gifRefs.current.forEach((gif) => {
        if (gif) observer.observe(gif)
      })

      return () => {
        gifRefs.current.forEach((gif) => {
          if (gif) observer.unobserve(gif)
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
                    onClick={() => setSelectedGif(section.gif)}
                  >
                    <Image
                      ref={(el: HTMLImageElement | null) => {
                        if (el) gifRefs.current[index] = el;
                      }}
                      data-src={section.gif}
                      src={section.gif}
                      alt={section.title}
                      width={500}
                      height={300}
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
            <h2 className="text-3xl font-bold mb-8 text-purple-600 text-center mt-16">Expi Voice</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-purple-600 text-center mt-16">Expi Express</h2>
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

      {selectedGif && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedGif(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-black bg-opacity-50 p-1 rounded-lg">
            <img
              src={selectedGif}
              alt="GIF em tamanho grande"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  )
}