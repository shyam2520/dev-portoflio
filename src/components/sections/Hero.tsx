import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Code2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SoapBubble, SoapBubbleHandle } from "@/components/ui/soap-bubble"
import { useRef } from "react"

export function Hero() {
  const bubbleRef = useRef<SoapBubbleHandle>(null)

  const handleClick = () => {
    bubbleRef.current?.spawnBubbles()
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-l from-purple-950/30 via-purple-950/10 to-black"></div>

      {/* Three.js Soap Bubble Background - positioned on the right */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SoapBubble ref={bubbleRef} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Code2 className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-float" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-signature font-normal mb-4 bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-flow"
            style={{ 
              lineHeight: '2',
              filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(0, 0, 0, 0.6))',
              WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.3)'
            }}
          >
            Shyam Sundar Mylai
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-4"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)' }}
          >
            Full Stack Engineer | DevOps | MLOps
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)' }}
          >
            Building scalable, distributed cloud-native systems and AI-powered applications
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 mb-12 pointer-events-auto"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex gap-6 text-gray-400 pointer-events-auto"
          >
            <a
              href="https://www.linkedin.com/in/shyam-mylai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/shyam2520"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:shyam.mylai@gmail.com"
              className="hover:text-pink-600 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://drive.google.com/file/d/1mDsyUAP3jzhwoO-UNlyn4nzStvd-mApP/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              <FileText className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-pink-600 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
