import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wave } from "@/components/ui/wave"
import { getExperiences } from "@/services/portfolioService"
import type { Experience as ExperienceType } from "@/types/portfolio"

// Fallback data in case Firestore is unavailable
const fallbackExperiences: ExperienceType[] = [
  {
    title: "Software Engineer 3",
    company: "Walmart Global Tech",
    location: "Chennai, IND",
    period: "Feb 2025 – Present",
    achievements: [
      "Developed a full-stack web application Prudence to detect insurance claim frauds using AI Agents (Pydantic AI), improving detection speed by 60%",
      "Built a web-based report generation tool RAP to create insightful dashboards with AI chatbot support, used by 1000+ internal users",
      "Wrote Functional and E2E tests using Playwright, achieving 75% overall test coverage",
    ],
    order: 1,
  },
  {
    title: "Mid-level Software Engineer",
    company: "NielsenIQ",
    location: "Chennai, IND",
    period: "Jan 2021 – Jan 2025",
    achievements: [
      "Minerva Engine – Developed a multi-AI capable web framework (REST API) to integrate GenAI experiences with OGRDS search apps using Java and FastAPI (Python)",
      "OmniSearch – Built a full-stack internal search platform using Angular + Spring Boot, improving operations performance by 75%",
      "Led redesign of RD Cross Coding UI using Angular, MongoDB, and Java",
      "Authored JUnit tests to help achieve 75% coverage in legacy systems",
      "Resolved log4j vulnerabilities, ensuring 100% compliance with updated security standards",
      "Migrated internal DB from Couchbase → MongoDB, cutting cloud costs by 10%",
    ],
    order: 2,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
}

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>(fallbackExperiences)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExperiences()
        if (data && data.length > 0) {
          setExperiences(data)
        }
      } catch (error) {
        console.error('Failed to fetch experiences:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="experience" className="relative pt-0 pb-0 overflow-x-clip" style={{ isolation: 'isolate' }}>
      {/* Static gradient background matching Hero */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-l from-purple-950/30 via-purple-950/10 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-950"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Work Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {loading ? (
            <div className="text-center text-gray-400">Loading experiences...</div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div key={index} variants={item}>
                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-4 w-4 text-white" />
                          </div>
                          {exp.title}
                        </CardTitle>
                        <CardDescription className="text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold mt-2">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 text-gray-300">
                          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-1.5">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
      
      <Wave fill="rgb(0, 0, 0)" className="absolute -bottom-1 left-0 w-full z-20" flip />
    </section>
  )
}
