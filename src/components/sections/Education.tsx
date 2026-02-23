import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wave3 } from "@/components/ui/wave"
import { getEducation } from "@/services/portfolioService"
import type { Education as EducationType } from "@/types/portfolio"

const fallbackEducation: EducationType[] = [
  {
    degree: "Master of Technology",
    field: "Software Engineering",
    institution: "BITS Pilani, IND",
    period: "July 2022 – May 2024",
    cgpa: "8.40",
    order: 1,
  },
  {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Vellore Institute of Technology, IND",
    period: "July 2017 – May 2021",
    cgpa: "9.13",
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
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
}

export function Education() {
  const [education, setEducation] = useState<EducationType[]>(fallbackEducation)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEducation()
        if (data && data.length > 0) {
          setEducation(data)
        }
      } catch (error) {
        console.error('Failed to fetch education:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="education" className="relative pt-0 pb-0 bg-zinc-950 overflow-x-clip" style={{ isolation: 'isolate' }}>
      <Wave3 fill="rgb(0, 0, 0)" className="absolute -top-1 left-0 w-full z-20" flip />
      
      <div className="container mx-auto px-4 relative z-10 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {loading ? (
            <div className="text-center text-gray-400">Loading education...</div>
          ) : (
            education.map((edu, index) => (
              <motion.div key={index} variants={item}>
                <Card className="bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800 hover:border-pink-600 transition-all duration-300 hover:shadow-xl hover:shadow-pink-600/20">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-white">{edu.degree}</CardTitle>
                          <CardDescription className="text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold mt-1">
                            {edu.field}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 px-4 py-2 rounded-lg border border-pink-600/30">
                        <p className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-lg">CGPA: {edu.cgpa}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-gray-300">
                      <p className="font-semibold">{edu.institution}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
      
      <Wave3 fill="rgb(0, 0, 0)" className="absolute -bottom-1 left-0 w-full z-20" />
    </section>
  )
}
