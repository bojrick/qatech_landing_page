"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Zap, Building2, Globe, Cpu, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { industries, projects } from '@/lib/projectData';

// Define types for project and industry
interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  industry_id: number;
}

interface Industry {
  id: number;
  name: string;
  icon: string;
  color: string;
}

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
        src="/placeholder.svg?height=400&width=600"
        alt={project.name}
        layout="fill"
        objectFit="cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-75`}></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <Link href={project.link}>
        <motion.button
          className={`flex items-center text-${color.split('-')[1]} font-semibold`}
          whileHover={{ x: 5 }}
        >
          Learn More <ArrowRight className="ml-1" size={18} />
        </motion.button>
      </Link>
    </div>
  </motion.div>
);

const Sidebar: React.FC<{
  industries: Industry[];
  selectedIndustry: Industry;
  setSelectedIndustry: (industry: Industry) => void;
}> = ({ industries, selectedIndustry, setSelectedIndustry }) => (
  <div className="w-64 bg-gray-900 text-white p-6 fixed h-full overflow-auto">
    <h2 className="text-2xl font-bold mb-6">Industries</h2>
    {industries.map((industry) => (
      <motion.button
        key={industry.id}
        className={`w-full text-left py-2 px-4 rounded-lg mb-2 flex items-center space-x-2 ${selectedIndustry.id === industry.id ? `bg-gradient-to-r ${industry.color}` : 'hover:bg-gray-800'}`}
        onClick={() => setSelectedIndustry(industry)}
        whileHover={{ x: 5 }}
      >
        {getIndustryIcon(industry.icon)}
        <span>{industry.name}</span>
      </motion.button>
    ))}
  </div>
);

const getIndustryIcon = (iconName: string): React.ReactNode => {
  switch (iconName) {
    case 'Car': return <Car size={18} />;
    case 'Zap': return <Zap size={18} />;
    case 'Building2': return <Building2 size={18} />;
    case 'Globe': return <Globe size={18} />;
    case 'Cpu': return <Cpu size={18} />;
    default: return null;
  }
};

export default function Projects() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(industries[0]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        industries={industries}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />
      <main className="flex-1 p-8 ml-64 pt-24"> {/* Added pt-24 for top padding */}
        <motion.h1
          className="text-4xl font-bold mb-12 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.id}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => project.industry_id === selectedIndustry.id)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} color={selectedIndustry.color} />
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}