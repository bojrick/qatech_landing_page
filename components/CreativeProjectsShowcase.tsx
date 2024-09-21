"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Zap, Building2, Globe, Cpu } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const industries = [
  {
    name: "Automobile",
    icon: Car,
    color: "from-blue-500 to-blue-600",
    projects: [
      {
        name: "Electric Vehicle Ecosystem",
        description: "Developed an integrated EV charging infrastructure and battery swapping network across major Indian cities.",
        link: "/projects/ev-ecosystem"
      },
      {
        name: "AI-Powered Traffic Management",
        description: "Implemented an AI system that reduced traffic congestion by 30% in metropolitan areas.",
        link: "/projects/ai-traffic-management"
      }
    ]
  },
  {
    name: "Energy",
    icon: Zap,
    color: "from-yellow-500 to-yellow-600",
    projects: [
      {
        name: "Solar-Powered Smart Villages",
        description: "Transformed 1000+ rural villages with solar microgrids and IoT-based energy management systems.",
        link: "/projects/solar-smart-villages"
      },
      {
        name: "Offshore Wind Farm Optimization",
        description: "Utilized quantum-inspired algorithms to optimize wind turbine placement, increasing energy output by 25%.",
        link: "/projects/offshore-wind-optimization"
      }
    ]
  },
  {
    name: "Infrastructure",
    icon: Building2,
    color: "from-green-500 to-green-600",
    projects: [
      {
        name: "Smart Water Management",
        description: "Developed an AI-driven system that reduced water wastage by 40% in urban areas through predictive maintenance and usage optimization.",
        link: "/projects/smart-water-management"
      },
      {
        name: "Earthquake-Resistant Structures",
        description: "Engineered innovative building materials and designs that improved structural integrity in seismic zones by 50%.",
        link: "/projects/earthquake-resistant-structures"
      }
    ]
  },
  {
    name: "Exports",
    icon: Globe,
    color: "from-purple-500 to-purple-600",
    projects: [
      {
        name: "Blockchain-Powered Supply Chain",
        description: "Implemented a blockchain solution that increased traceability and reduced export documentation time by 60%.",
        link: "/projects/blockchain-supply-chain"
      },
      {
        name: "AI Market Trend Predictor",
        description: "Developed an AI model that forecasts international market trends with 85% accuracy, boosting export strategies.",
        link: "/projects/ai-market-predictor"
      }
    ]
  },
  {
    name: "Technology",
    icon: Cpu,
    color: "from-red-500 to-red-600",
    projects: [
      {
        name: "Quantum-Inspired Cybersecurity",
        description: "Created a next-gen encryption system using quantum-inspired algorithms, enhancing data protection for critical sectors.",
        link: "/projects/quantum-cybersecurity"
      },
      {
        name: "AI-Powered Language Translation",
        description: "Developed an AI model that accurately translates between 22 official Indian languages, bridging communication gaps.",
        link: "/projects/ai-language-translation"
      }
    ]
  }
]

const IndustryIcon: React.FC<{
  industry: typeof industries[0];
  isSelected: boolean;
  onClick: () => void;
}> = ({ industry, isSelected, onClick }) => (
  <motion.div
    className={`w-20 h-20 rounded-full bg-gradient-to-br ${industry.color} flex items-center justify-center cursor-pointer`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    initial={false}
    animate={{ scale: isSelected ? 1.1 : 1 }}
  >
    <industry.icon className="w-10 h-10 text-white" />
  </motion.div>
)

const ProjectCard: React.FC<{
  project: typeof industries[0]['projects'][0];
  industryColor: string;
  index: number;
}> = ({ project, industryColor, index }) => {
  const { theme } = useTheme()

  return (
    <motion.div
      className={`rounded-lg shadow-lg p-6 flex flex-col justify-between h-full ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div>
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
      </div>
      <Link href={project.link} className={`inline-flex items-center bg-gradient-to-r ${industryColor} text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity`}>
        Explore Project
      </Link>
    </motion.div>
  )
}

type RepeatType = "loop" | "reverse" | "mirror";

interface AnimationVariant {
  backgroundImage: string[];
  backgroundSize?: string[];
  transition: {
    duration: number;
    repeat: number;
    repeatType: RepeatType;
  };
}

interface AnimationVariants {
  [key: string]: AnimationVariant;
}

const BackgroundAnimation: React.FC<{
  industry: typeof industries[0];
}> = ({ industry }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const variants: AnimationVariants = {
    automobile: {
      backgroundImage: [
        `radial-gradient(circle at 20% 20%, ${isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)'} 0%, ${isDark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.05)'} 25%, rgba(0,0,0,0) 50%)`,
        `radial-gradient(circle at 80% 80%, ${isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)'} 0%, ${isDark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.05)'} 25%, rgba(0,0,0,0) 50%)`
      ],
      transition: { duration: 10, repeat: Infinity, repeatType: "reverse" }
    },
    energy: {
      backgroundImage: [
        `linear-gradient(45deg, ${isDark ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.1)'} 0%, ${isDark ? 'rgba(202,138,4,0.1)' : 'rgba(202,138,4,0.05)'} 50%, rgba(0,0,0,0) 100%)`,
        `linear-gradient(225deg, ${isDark ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.1)'} 0%, ${isDark ? 'rgba(202,138,4,0.1)' : 'rgba(202,138,4,0.05)'} 50%, rgba(0,0,0,0) 100%)`
      ],
      transition: { duration: 8, repeat: Infinity, repeatType: "reverse" }
    },
    infrastructure: {
      backgroundImage: [
        `linear-gradient(0deg, ${isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)'} 0%, ${isDark ? 'rgba(22,163,74,0.1)' : 'rgba(22,163,74,0.05)'} 50%, rgba(0,0,0,0) 100%)`,
        `linear-gradient(180deg, ${isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)'} 0%, ${isDark ? 'rgba(22,163,74,0.1)' : 'rgba(22,163,74,0.05)'} 50%, rgba(0,0,0,0) 100%)`
      ],
      transition: { duration: 6, repeat: Infinity, repeatType: "reverse" }
    },
    exports: {
      backgroundImage: [
        `radial-gradient(circle at 10% 10%, ${isDark ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.1)'} 0%, ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.05)'} 25%, rgba(0,0,0,0) 50%)`,
        `radial-gradient(circle at 90% 90%, ${isDark ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.1)'} 0%, ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.05)'} 25%, rgba(0,0,0,0) 50%)`
      ],
      transition: { duration: 12, repeat: Infinity, repeatType: "reverse" }
    },
    technology: {
      backgroundImage: [
        `repeating-linear-gradient(0deg, ${isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)'} 0px, ${isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)'} 1px, transparent 1px, transparent 20px)`,
        `repeating-linear-gradient(0deg, ${isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)'} 0px, ${isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)'} 1px, transparent 1px, transparent 20px)`
      ],
      backgroundSize: ['100% 20px', '100% 40px'],
      transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
    }
  }

  const currentVariant = variants[industry.name.toLowerCase()]

  return (
    <motion.div
      className="absolute inset-0 opacity-30 z-0"
      animate={{
        backgroundImage: currentVariant.backgroundImage,
        backgroundSize: currentVariant.backgroundSize,
        transition: currentVariant.transition
      }}
    />
  )
}

export default function CreativeProjectsShowcase() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0])
  const { theme } = useTheme()

  return (
    <section className={`py-16 relative overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
    }`}>
      <BackgroundAnimation industry={selectedIndustry} />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Quantum-Inspired Solutions Across Indian Industries</h2>
        
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {industries.map((industry) => (
            <IndustryIcon
              key={industry.name}
              industry={industry}
              isSelected={selectedIndustry === industry}
              onClick={() => setSelectedIndustry(industry)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${selectedIndustry.color} bg-clip-text text-transparent`}>
              {selectedIndustry.name}
            </h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Discover how our quantum-inspired solutions are revolutionizing the {selectedIndustry.name.toLowerCase()} sector in India.
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedIndustry.projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} industryColor={selectedIndustry.color} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { industries };