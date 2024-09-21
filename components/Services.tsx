"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Lightbulb, LineChart, Target } from 'lucide-react'
import { useTheme } from 'next-themes'

const services = [
  {
    title: "Market Analysis",
    description: "Navigate the market like a seasoned captain with our comprehensive market analysis. We dive deep into industry trends, consumer behavior, and competitive landscapes to provide you with actionable insights. Our detailed reports uncover hidden opportunities and potential threats, enabling you to make informed decisions and stay ahead of the curve.",
    icon: BarChart3,
    color: { light: "#FF6B6B", dark: "#8B3A3A" },
  },
  {
    title: "Competitive Strategy",
    description: "Outmaneuver competition with strategies built on solid ground. Our team of experts crafts tailored competitive strategies that leverage your unique strengths and market position. We analyze your competitors, identify gaps in the market, and develop innovative approaches to help you gain a sustainable competitive advantage. Our strategies are designed to be both bold and pragmatic, ensuring you stand out in crowded markets.",
    icon: Target,
    color: { light: "#4ECDC4", dark: "#2A6A62" },
  },
  {
    title: "Growth Optimization",
    description: "Scale smartly and efficiently with our growth optimization services. Our data-driven approach pinpoints areas where your efforts will yield the highest returns, optimizing every rupee invested. We analyze your current operations, identify bottlenecks, and implement strategies to streamline processes and accelerate growth. From customer acquisition to retention, we help you build a robust framework for sustainable expansion.",
    icon: LineChart,
    color: { light: "#45B7D1", dark: "#265E6D" },
  },
  {
    title: "Innovation Consulting",
    description: "Innovation isn't just about new ideas; it's about the right ideas at the right time. Our innovation consulting services help you cultivate a culture of creativity grounded in market realities. We guide you through ideation processes, validate concepts against market data, and assist in implementing innovative solutions. Our approach ensures that your innovation efforts are not just creative, but also commercially viable and aligned with your strategic goals.",
    icon: Lightbulb,
    color: { light: "#FFA07A", dark: "#8B5742" },
  },
]

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}

interface ServicesGridProps {
  id?: string;
}

export default function ServicesGrid({ id }: ServicesGridProps) {
  const [bgColor, setBgColor] = useState(services[0].color.light)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (hoveredIndex !== null) {
      setBgColor(services[hoveredIndex].color[theme as keyof typeof services[0]['color']] || services[hoveredIndex].color.light)
    }
  }, [hoveredIndex, theme])

  return (
    <section id={id} className="relative overflow-hidden transition-colors duration-1000 flex items-center justify-center py-16" style={{ backgroundColor: bgColor }}>
      <Particles />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <service.icon className="w-8 h-8 mr-3" style={{ color: service.color[theme as keyof typeof service.color] || service.color.light }} />
                  <h3 className="text-xl font-semibold dark:text-white">{service.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}