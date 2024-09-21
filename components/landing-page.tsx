'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function LandingPageComponent() {
  const gifRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: gifRef,
    offset: ["start start", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8])

  const sections = [
    { title: 'Seção 1', description: 'Descrição da seção 1', gif: '/gif1.gif' },
    { title: 'Seção 2', description: 'Descrição da seção 2', gif: '/gif2.gif' },
    { title: 'Seção 3', description: 'Descrição da seção 3', gif: '/gif3.gif' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">Bem-vindo à Nossa Landing Page Interativa</h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">Explore nossas imagens incríveis e descubra mais sobre nossos serviços.</p>
          <button className="bg-white text-purple-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300">
            Saiba Mais
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div 
          ref={gifRef}
          style={{ scale, opacity }}
          className="w-full mb-8 sm:mb-16"
        >
          <Image
            src={sections[0].gif}
            alt={sections[0].title}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {sections.map((section, index) => (
          <motion.section 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-600 text-center">{section.title}</h2>
            <div className="flex flex-col items-center gap-4 sm:gap-8">
              {index !== 0 && (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full sm:w-2/3 lg:w-1/2"
                >
                  <Image
                    src={section.gif}
                    alt={section.title}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </motion.div>
              )}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full sm:w-2/3 lg:w-1/2"
              >
                <p className="text-base sm:text-xl text-gray-700 text-center">{section.description}</p>
              </motion.div>
            </div>
          </motion.section>
        ))}
      </main>

      <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base">&copy; 2023 Landing Page Interativa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}