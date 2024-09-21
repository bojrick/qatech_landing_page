"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Zap, Building2, Globe, Cpu, ArrowRight } from 'lucide-react'
import Image from 'next/image'

// Define types for project and industry
interface Project {
  title: string;
  description: string;
  image: string;
}

interface Industry {
  name: string;
  icon: React.ElementType;
  color: string;
  projects: Project[];
}

const industries: Industry[] = [
  { name: "Automobile", icon: Car, color: "from-blue-500 to-blue-600", projects: [
    { title: "Electric Vehicle Ecosystem", description: "Developed an integrated EV charging infrastructure and battery swapping network across major Indian cities.", image: "/placeholder.svg?height=400&width=600" },
    { title: "AI-Powered Traffic Management", description: "Implemented an AI system that reduced traffic congestion by 30% in metropolitan areas.", image: "/placeholder.svg?height=400&width=600" }
  ]},
  { name: "Energy", icon: Zap, color: "from-yellow-500 to-yellow-600", projects: [
    { title: "Solar-Powered Smart Villages", description: "Transformed 1000+ rural villages with solar microgrids and IoT-based energy management systems.", image: "/placeholder.svg?height=400&width=600" },
    { title: "Offshore Wind Farm Optimization", description: "Utilized quantum-inspired algorithms to optimize wind turbine placement, increasing energy output by 25%.", image: "/placeholder.svg?height=400&width=600" }
  ]},
  { name: "Infrastructure", icon: Building2, color: "from-green-500 to-green-600", projects: [
    { title: "Smart Water Management", description: "Developed an AI-driven system that reduced water wastage by 40% in urban areas through predictive maintenance and usage optimization.", image: "/placeholder.svg?height=400&width=600" },
    { title: "Earthquake-Resistant Structures", description: "Engineered innovative building materials and designs that improved structural integrity in seismic zones by 50%.", image: "/placeholder.svg?height=400&width=600" }
  ]},
  { name: "Exports", icon: Globe, color: "from-purple-500 to-purple-600", projects: [
    { title: "Blockchain-Powered Supply Chain", description: "Implemented a blockchain solution that increased traceability and reduced export documentation time by 60%.", image: "/placeholder.svg?height=400&width=600" },
    { title: "AI Market Trend Predictor", description: "Developed an AI model that forecasts international market trends with 85% accuracy, boosting export strategies.", image: "/placeholder.svg?height=400&width=600" }
  ]},
  { name: "Technology", icon: Cpu, color: "from-red-500 to-red-600", projects: [
    { title: "Quantum-Inspired Cybersecurity", description: "Created a next-gen encryption system using quantum-inspired algorithms, enhancing data protection for critical sectors.", image: "/placeholder.svg?height=400&width=600" },
    { title: "AI-Powered Language Translation", description: "Developed an AI model that accurately translates between 22 official Indian languages, bridging communication gaps.", image: "/placeholder.svg?height=400&width=600" }
  ]}
]

const ProjectCard: React.FC<{ project: Project; color: string }> = ({ project, color }) => (
  <motion.div
    className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative h-48">
      <Image
        src={project.image}
        alt={project.title}
        layout="fill"
        objectFit="cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-75`}></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <motion.button
        className={`flex items-center text-${color.split('-')[1]} font-semibold`}
        whileHover={{ x: 5 }}
      >
        Learn More <ArrowRight className="ml-1" size={18} />
      </motion.button>
    </div>
  </motion.div>
)

const Sidebar: React.FC<{
  industries: Industry[];
  selectedIndustry: Industry;
  setSelectedIndustry: (industry: Industry) => void;
}> = ({ industries, selectedIndustry, setSelectedIndustry }) => (
  <div className="w-64 bg-gray-900 text-white p-6 fixed h-full overflow-auto">
    <h2 className="text-2xl font-bold mb-6">Industries</h2>
    {industries.map((industry) => (
      <motion.button
        key={industry.name}
        className={`w-full text-left py-2 px-4 rounded-lg mb-2 flex items-center space-x-2 ${selectedIndustry.name === industry.name ? `bg-gradient-to-r ${industry.color}` : 'hover:bg-gray-800'}`}
        onClick={() => setSelectedIndustry(industry)}
        whileHover={{ x: 5 }}
      >
        <industry.icon size={18} />
        <span>{industry.name}</span>
      </motion.button>
    ))}
  </div>
)

const QuantumParticle: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-blue-500 rounded-full"
    style={{ x, y }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
    }}
  />
)

export default function QuantumProjects() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(industries[0])
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-20),
        { 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight 
        }
      ])
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        industries={industries}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />
      <main className="flex-1 p-8 ml-64">
        <motion.h1
          className="text-4xl font-bold mb-12 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Quantum-Inspired Projects
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className={`text-3xl font-bold mb-6 bg-gradient-to-r ${selectedIndustry.color} bg-clip-text text-transparent`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedIndustry.name}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedIndustry.projects.map((project, index) => (
                <ProjectCard key={index} project={project} color={selectedIndustry.color} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {particles.map((particle, index) => (
          <QuantumParticle key={index} x={particle.x} y={particle.y} />
        ))}
      </main>
    </div>
  )
}