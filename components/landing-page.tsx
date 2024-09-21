'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function LandingPageComponent() {
  const sections = [
    { 
      title: 'Inserindo Nome', 
      description: 'Nesta etapa inicial, você insere seu nome para personalizar sua experiência e receber feedback individualizado ao longo da análise.', 
      gif: '/gif1.gif' 
    },
    { title: 'Seção 2', description: 'Descrição da seção 2', gif: '/gif1.gif' },
    { title: 'Seção 3', description: 'Descrição da seção 3', gif: '/gif1.gif' },
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

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-16">
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
                className="w-full flex justify-center"
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
      </main>

      <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Landing Page Interativa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}