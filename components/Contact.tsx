"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Zap, Building2, Globe, Cpu, Send, Sparkles, AtomIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const industries = [
  { name: "Automobile", icon: Car, color: "from-blue-500 to-blue-600" },
  { name: "Energy", icon: Zap, color: "from-yellow-500 to-yellow-600" },
  { name: "Infrastructure", icon: Building2, color: "from-green-500 to-green-600" },
  { name: "Exports", icon: Globe, color: "from-purple-500 to-purple-600" },
  { name: "Technology", icon: Cpu, color: "from-red-500 to-red-600" },
]

const QuantumField = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme()
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
      } p-1`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-md p-3`}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)",
            "radial-gradient(circle, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  )
}

const QuantumOrbit = ({ isActive }: { isActive: boolean }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={false}
    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
  >
    {[...Array(3)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute inset-0 border-2 border-indigo-500 rounded-full"
        style={{ borderRadius: "100%" }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10 + index * 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </motion.div>
)

interface QuantumContactProps {
  id?: string;
}

export default function QuantumContact({ id }: QuantumContactProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    toast({
      title: "Success",
      description: "Your message has been sent successfully!",
    })
  }

  return (
    <div id={id} className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-primary mix-blend-screen"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", damping: 3, stiffness: 50 }}
      />
      <div className={`max-w-4xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden relative z-10`}>
        <QuantumOrbit isActive={!isSubmitted} />
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AtomIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className={`text-3xl font-extrabold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Quantum Contact</h2>
            <p className={`mt-2 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>Ready to elevate your business to quantum levels? Let&apos;s connect!</p>
          </motion.div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="industry">
                  Select Your Industry
                </label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {industries.map((industry) => (
                    <motion.button
                      key={industry.name}
                      type="button"
                      className={`flex items-center justify-center p-3 rounded-full bg-gradient-to-br ${industry.color} text-white`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedIndustry(industry.name)}
                    >
                      <industry.icon size={24} />
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {selectedIndustry && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 text-sm text-center text-primary"
                    >
                      You selected: {selectedIndustry}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <QuantumField>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </QuantumField>
              <div className="mt-4">
                <QuantumField>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                </QuantumField>
              </div>
              <div className="mt-4">
                <QuantumField>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </QuantumField>
              </div>
              <div className="mt-4">
                <QuantumField>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                  />
                </QuantumField>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Sparkles className="animate-spin mr-2" />
                  ) : (
                    <Send className="mr-2" size={16} />
                  )}
                  {isSubmitting ? 'Quantum Transmission...' : 'Send Quantum Message'}
                </Button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-center"
            >
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>Quantum Transmission Successful!</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Your message has been received across the quantum realm. We&apos;ll respond faster than entangled particles!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}