import React from 'react';
import { motion } from 'framer-motion';
// import { useTheme } from 'next-themes';

const AnimatedLogo: React.FC = () => {
  // const { resolvedTheme } = useTheme();

  // Use resolvedTheme instead of theme
  // const fillColor = resolvedTheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <motion.div
      className="w-8 h-8 flex items-center justify-center bg-primary rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-primary-foreground"
      >
        <motion.path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;