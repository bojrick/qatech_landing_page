'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function AnimatedDataFlow() {
  const controls = useAnimation();
  const ref = useRef(null);
  const [activeStage, setActiveStage] = useState<number | null>(null);

  useEffect(() => {
    const observerTarget = ref.current; // Store ref.current in a variable
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget) {
      observer.observe(observerTarget);
    }

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
    };
  }, [controls]);

  const stages = ['Collection', 'Analysis', 'Strategy', 'Results'];
  const stageColors = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'];

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 2, ease: 'easeInOut' } },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    active: { scale: 1.2, boxShadow: '0 0 0 2px rgba(255,255,255,0.8)' },
  };

  return (
    <div className="relative w-full h-80">
      <motion.svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        initial="hidden"
        animate={controls}
      >
        <motion.path
          d="M 50 100 Q 125 50, 200 100 T 350 100"
          fill="none"
          stroke="#ccc"
          strokeWidth="4"
          variants={lineVariants}
        />
        {stages.map((stage, index) => (
          <g key={index}>
            <motion.circle
              cx={50 + index * 100}
              cy={100}
              r="20"
              fill={stageColors[index]}
              variants={dotVariants}
              transition={{ delay: index * 0.5 }}
              whileHover="active"
              onHoverStart={() => setActiveStage(index)}
              onHoverEnd={() => setActiveStage(null)}
            />
            <motion.text
              x={50 + index * 100}
              y={140}
              textAnchor="middle"
              fill="#333"
              fontSize="14"
              variants={dotVariants}
              transition={{ delay: index * 0.5 + 0.25 }}
            >
              {stage}
            </motion.text>
          </g>
        ))}
      </motion.svg>
      {activeStage !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 mt-4 text-center"
        >
          <p className="text-lg font-semibold">{stages[activeStage]}</p>
          <p className="text-sm">Description of {stages[activeStage]} stage...</p>
        </motion.div>
      )}
    </div>
  );
}