"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Database, BarChart3, ClipboardList, Rocket } from 'lucide-react'
import { useTheme } from 'next-themes'

const processSteps = [
  {
    icon: Brain,
    title: "First Principles",
    description: "Break down complex problems into fundamental truths and build up from there.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Database,
    title: "Data Collection",
    description: "Gather comprehensive and relevant data from various sources to inform decision-making.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: BarChart3,
    title: "Analysis",
    description: "Process and interpret collected data to extract meaningful insights and patterns.",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: ClipboardList,
    title: "Planning",
    description: "Develop strategic plans based on analyzed data and identified opportunities.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: Rocket,
    title: "Execution",
    description: "Implement plans with precision, monitor progress, and adapt based on real-time data feedback.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  }
]

const ProcessStep: React.FC<{
  step: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
    bgColor: string;
  };
  index: number;
  isHovered: boolean;
  setHoveredStep: (index: number | null) => void;
}> = ({ step, index, isHovered, setHoveredStep }) => {
  const isEven = index % 2 === 0;
  const textAlign = isEven ? 'text-right' : 'text-left';
  const iconPosition = isEven ? '-right-8' : '-left-8';
  const contentPadding = isEven ? 'pr-10' : 'pl-10';

  return (
    <motion.div 
      className={`flex ${isEven ? 'flex-row-reverse' : 'flex-row'} items-center gap-8 mb-16`}
      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHoveredStep(index)}
      onHoverEnd={() => setHoveredStep(null)}
    >
      <motion.div 
        className={`flex-grow ${step.bgColor} dark:bg-gray-800 rounded-lg shadow-lg p-6 relative ${textAlign}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <div className={`absolute ${iconPosition} top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
          <step.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-2xl font-semibold mb-2 ${contentPadding} text-foreground`}>
          <span className={`${isEven ? 'ml-2' : 'mr-2'} text-gray-500`}>Step {index + 1}:</span>
          {step.title}
        </h3>
        <p className={`text-muted-foreground ${contentPadding}`}>{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

const BackgroundAnimation: React.FC<{ color: string; isDark: boolean }> = ({ color, isDark }) => {
  const [connections, setConnections] = useState<Array<{x1: number; y1: number; x2: number; y2: number; progress: number}>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setConnections(prev => {
        const newConnections = [...prev, {
          x1: Math.random() * 100,
          y1: Math.random() * 100,
          x2: Math.random() * 100,
          y2: Math.random() * 100,
          progress: 0
        }]
        if (newConnections.length > 10) newConnections.shift()
        return newConnections
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      animate={{ backgroundColor: color }}
      transition={{ duration: 0.5 }}
    >
      <svg className="w-full h-full">
        {connections.map((connection, index) => (
          <motion.line
            key={index}
            x1={`${connection.x1}%`}
            y1={`${connection.y1}%`}
            x2={`${connection.x2}%`}
            y2={`${connection.y2}%`}
            stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        ))}
      </svg>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [1, 0.5, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </motion.div>
  )
}

export default function QuantumProcess() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const { theme, resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const getBackgroundColor = () => {
    if (hoveredStep === null) return isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"
    const [start] = processSteps[hoveredStep].color.split(' ')
    return start.replace('from-', 'rgba(') + ', 0.2)'
  }

  return (
    <section id="how-we-work" className="py-16 relative overflow-hidden w-full">
      <div className="absolute inset-0 w-full h-full">
        <BackgroundAnimation color={getBackgroundColor()} isDark={isDark} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
          Our Problem-Solving Process
        </h2>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-foreground/20 transform -translate-x-1/2" />
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              step={step}
              index={index}
              isHovered={hoveredStep === index}
              setHoveredStep={setHoveredStep}
            />
          ))}
        </div>
      </div>
    </section>
  )
}