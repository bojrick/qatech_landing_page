"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react'
import AnimatedLogo from './AnimatedLogo'

const QuantumLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
  >
    <span className="relative z-10">{children}</span>
    <motion.span 
      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </Link>
)

const SocialIcon = ({ Icon, href }: { Icon: React.ElementType; href: string }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
    whileHover={{ scale: 1.2, rotate: 360 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={24} />
  </motion.a>
)

const QuantumParticle = () => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-500 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  />
)

export default function QuantumFooter() {
  return (
    <footer className="bg-background text-foreground py-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <AnimatedLogo />
            <div className="font-bold text-sm sm:text-base md:text-xl leading-tight">
              <span className="block">QuantumAnalytica</span>
              <span className="block">TechVentures</span>
            </div>
          </motion.div>
          <p className="text-sm text-muted-foreground">
            Empowering Indian SMEs with Precision Analytics and Quantum-Inspired Solutions
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><QuantumLink href="/#how-we-work">How We Work</QuantumLink></li>
            <li><QuantumLink href="/#services">Services</QuantumLink></li>
            <li><QuantumLink href="/projects">Projects</QuantumLink></li>
            <li><QuantumLink href="/#contact">Contact</QuantumLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Mail size={16} className="text-primary" />
              <span>info@quantumanalytica.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={16} className="text-primary" />
              <span>+91 123 456 7890</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <SocialIcon Icon={Linkedin} href="https://linkedin.com/company/quantumanalytica" />
            <SocialIcon Icon={Twitter} href="https://twitter.com/quantumanalytica" />
            <SocialIcon Icon={Facebook} href="https://facebook.com/quantumanalytica" />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-muted text-center text-sm text-muted-foreground relative z-10">
        <p>&copy; 2024 QuantumAnalytica TechVentures. All rights reserved.</p>
      </div>

      {[...Array(20)].map((_, i) => (
        <QuantumParticle key={i} />
      ))}

      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </footer>
  )
}