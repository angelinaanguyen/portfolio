'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'
import { Moon, Sun, Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TypeAnimation } from 'react-type-animation'


function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  return [darkMode, setDarkMode] as const
}

const Section = ({ children, id }: { children: React.ReactNode, id: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="min-h-screen flex flex-col justify-center items-center p-8"
    >
      {children}
    </motion.section>
  )
}

export default function SleekPortfolio() {
  const [darkMode, setDarkMode] = useDarkMode()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const projects = [
    { title: "Pixel Perfect", desc: "A responsive web app showcasing advanced CSS techniques and animations." },
    { title: "Data Visualizer", desc: "An interactive dashboard built with D3.js for data visualization." },
    { title: "AI Chatbot", desc: "A machine learning-powered chatbot using natural language processing." },
    { title: "E-commerce Platform", desc: "A full-stack e-commerce solution with secure payment integration." }
  ]

  const skills = [
    "JavaScript", "React", "Node.js", "Python",
    "GraphQL", "TypeScript", "Next.js", "TailwindCSS"
  ]

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            <motion.div 
                className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TypeAnimation
                  sequence={[
                    'A',
                    100,
                    'AN',
                    100,
                    'ANG',
                    100,
                    'ANGE',
                    100,
                    'ANGEL',
                    100,
                    'ANGELI',
                    100,
                    'ANGELIN',
                    100,
                    'ANGELINA',
                    100,
                    'ANGELINA ',
                    100,
                    'ANGELINA N',
                    100,
                    'ANGELINA NG',
                    100,
                    'ANGELINA NGU',
                    100,
                    'ANGELINA NGUY',
                    100,
                    'ANGELINA NGUYE',
                    100,
                    'ANGELINA NGUYEN',
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ display: 'inline-block' }}
                  repeat={0}
                />
              </motion.div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <Button key={item} variant="ghost" size="sm" asChild>
                    <a href={`#${item.toLowerCase()}`}>{item}</a>
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        </header>

        <main>
          <Section id="home">
            <motion.h1 
              className="text-6xl font-bold mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Angelina Nguyen
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-center text-muted-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Web Developer & Digital Innovator
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild>
                <a href="#about">Learn More <ChevronDown className="ml-2 h-4 w-4" /></a>
              </Button>
            </motion.div>
          </Section>

          <Section id="about">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="max-w-2xl text-center mb-8">
              I&aposm a passionate web developer with a keen eye for design and a love for creating intuitive user experiences. 
              With expertise in modern web technologies, I transform ideas into sleek, efficient, and user-friendly applications.
            </p>
            <Button asChild>
              <a href="#projects">View My Work</a>
            </Button>
          </Section>

          <Section id="projects">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden transition-transform duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="skills">
            <h2 className="text-3xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-primary/10 text-primary rounded-full px-4 py-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="contact">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="flex flex-col items-center space-y-4">
              <Button variant="outline" className="w-48" asChild>
                <a href="https://github.com/angelinaanguyen" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button variant="outline" className="w-48" asChild>
                <a href="https://www.linkedin.com/in/angiienguyen/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" className="w-48" asChild>
                <a href="mailto:angelinakimnguyen@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
              </Button>
            </div>
          </Section>
        </main>

        <footer className="text-center py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Angelina Nguyen. All rights reserved.
        </footer>
      </div>
    </div>
  )
}