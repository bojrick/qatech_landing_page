"use client"

import React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import AnimatedLogo from './AnimatedLogo'
import Sidebar from './Sidebar'

const navItems = [
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
]

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 md:py-4">
          <Link href="/" className="flex items-center space-x-2">
            <AnimatedLogo />
            <div className="font-bold text-sm sm:text-base md:text-xl leading-tight">
              <span className="block">QuantumAnalytica</span>
              <span className="block">TechVentures</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Menu */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link 
                        href={item.href}
                        className="px-2 md:px-3 py-2 text-xs md:text-sm hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="h-8 w-8 md:h-10 md:w-10"
            >
              <Sun className="h-4 w-4 md:h-5 md:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 md:h-5 md:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu */}
            <Sidebar />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar