import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProjects } from "@/services/portfolioService"
import { getIcon } from "@/lib/iconMap"
import type { Project as ProjectType } from "@/types/portfolio"

const fallbackProjects: ProjectType[] = [
  {
    title: "RAP (Reporting Agentic Platform)",
    description: "Walmart Global Tech",
    tech: ["FastAPI", "FastMCP", "PydanticAI", "React.js", "AlloyDB", "Google BigQuery"],
    highlights: [
      "Built a micro-frontend report generation tool like Tableau/PowerBI, cutting license costs by 20%",
      "Added AI chatbot to query data conversationally, reducing manual reporting time by 40%",
    ],
    icon: "Zap",
    order: 1,
  },
  {
    title: "Prudence",
    description: "Walmart Global Tech",
    tech: ["Spring Boot", "React.js", "Azure SQL Server", "Google BigQuery"],
    highlights: [
      "AI-powered insurance claims management tool handling 2B+ cases annually",
      "Implemented multi-agent fraud detection pipeline, improving investigator efficiency by 72%",
    ],
    icon: "Database",
    order: 2,
  },
  {
    title: "OmniSearch",
    description: "NielsenIQ",
    tech: ["Java", "Spring Boot", "Angular", "MongoDB"],
    highlights: [
      "Developed a REST-based search engine for item description matching, boosting operational efficiency by 75%",
    ],
    icon: "Code2",
    order: 3,
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
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
}

export function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects()
        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="projects" className="relative py-20 bg-black overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {loading ? (
            <div className="col-span-full text-center text-gray-400">Loading projects...</div>
          ) : (
            projects.map((project, index) => {
              const Icon = getIcon(project.icon)
              return (
                <motion.div key={index} variants={item}>
                  <Card className="bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800 h-full hover:border-pink-600 transition-all duration-300 hover:shadow-xl hover:shadow-pink-600/20 group cursor-pointer">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 transition-colors">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                        <CardDescription className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                              <Badge key={i} variant="secondary" className="bg-zinc-900 text-gray-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, i) => (
                              <li key={i} className="flex gap-2 text-sm text-gray-300">
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-0.5">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </a>
                  </Card>
                </motion.div>
              )
            })
          )}
        </motion.div>
      </div>
    </section>
  )
}
