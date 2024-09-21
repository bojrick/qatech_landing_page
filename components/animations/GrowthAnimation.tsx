'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDatabase, FaChartLine, FaLightbulb, FaRocket, FaArrowRight } from 'react-icons/fa';

interface Service {
  title: string;
  description: string;
}

interface ProcessStep {
  label: string;
  icon: React.ElementType;
}

interface GrowthAnimationProps {
  services: Service[];
}

const processSteps: ProcessStep[] = [
  { label: 'Data Collection', icon: FaDatabase },
  { label: 'Analysis', icon: FaChartLine },
  { label: 'Strategy', icon: FaLightbulb },
  { label: 'Implementation', icon: FaRocket },
];

export default function GrowthAnimation({ services }: GrowthAnimationProps) {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
        <div className="flex justify-between items-center mb-24 relative">
          {processSteps.map((step, index) => (
            <React.Fragment key={index}>
              <ProcessStep
                step={step}
                index={index}
                setActiveService={() => setActiveService(services[index]?.title)}
                setHoverIndex={() => setHoverIndex(index)}
                clearStates={() => {
                  setActiveService(null);
                  setHoverIndex(null);
                }}
                isActive={hoverIndex === index}
              />
              {index < processSteps.length - 1 && <ArrowIcon />}
            </React.Fragment>
          ))}
        </div>
        <motion.div
          className="absolute left-0 h-2 bg-primary/30 top-44"
          style={{
            width: hoverIndex !== null ? `${(hoverIndex + 1) * 25}%` : '0%',
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: hoverIndex !== null ? `${(hoverIndex + 1) * 25}%` : '0%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <AnimatePresence>
          {activeService && (
            <ServiceDescription service={services.find(s => s.title === activeService)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: ProcessStep;
  index: number;
  setActiveService: () => void;
  setHoverIndex: () => void;
  clearStates: () => void;
  isActive: boolean;
}

function ProcessStep({ step, index, setActiveService, setHoverIndex, clearStates, isActive }: ProcessStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center relative z-10"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => {
        setActiveService();
        setHoverIndex();
      }}
      onHoverEnd={clearStates}
    >
      <motion.div
        className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg ${
          isActive ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <step.icon />
      </motion.div>
      <motion.p 
        className="text-center font-semibold text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.2 }}
      >
        {step.label}
      </motion.p>
      {isActive && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rotate-45"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        />
      )}
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <motion.div
      className="text-3xl text-gray-400"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
    >
      <FaArrowRight />
    </motion.div>
  );
}

function ServiceDescription({ service }: { service: Service | undefined }) {
  if (!service) return null;

  return (
    <motion.div
      className="mt-8 p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto border border-primary/20"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <motion.h3 
        className="font-bold text-xl mb-3 text-primary"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        {service.title}
      </motion.h3>
      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
}