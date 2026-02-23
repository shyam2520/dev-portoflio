import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { getAchievements } from "@/services/portfolioService"
import { getIcon } from "@/lib/iconMap"
import type { Achievement as AchievementType } from "@/types/portfolio"

const fallbackAchievements: AchievementType[] = [
  {
    icon: "Trophy",
    title: "Bravo Award",
    description: "Org-wide recognition for outstanding work",
    organization: "Walmart Global Tech",
    date: "Aug '25",
    color: "from-blue-600 to-pink-600",
    order: 1,
  },
  {
    icon: "Rocket",
    title: "Disruptor Award",
    description: "Recognition for exemplary innovation",
    organization: "Walmart Global Tech",
    date: "Mar '25",
    color: "from-blue-600 to-pink-600",
    order: 2,
  },
  {
    icon: "Award",
    title: "HackFest 2024 Winner",
    description: "Organization-wide hackathon",
    organization: "NielsenIQ",
    date: "Apr '24",
    color: "from-blue-600 to-pink-600",
    order: 3,
  },
  {
    icon: "Zap",
    title: "HackFest 2023 Winner",
    description: "Organization-wide hackathon",
    organization: "NielsenIQ",
    date: "Oct '23",
    color: "from-blue-600 to-pink-600",
    order: 4,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export function Achievements() {
  const [achievements, setAchievements] = useState<AchievementType[]>(fallbackAchievements)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAchievements()
        if (data && data.length > 0) {
          setAchievements(data)
        }
      } catch (error) {
        console.error('Failed to fetch achievements:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="achievements" className="relative pt-20 pb-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 overflow-x-hidden" style={{ isolation: 'isolate' }}>
      
      <div className="container mx-auto px-4 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Achievements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {loading ? (
            <div className="col-span-full text-center text-gray-400">Loading achievements...</div>
          ) : (
            achievements.map((achievement, index) => {
              const Icon = getIcon(achievement.icon)
              return (
                <motion.div key={index} variants={item}>
                  <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm h-full hover:bg-zinc-900/70 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-400">{achievement.organization}</p>
                            <p className="text-xs text-gray-500 bg-zinc-950/50 px-3 py-1 rounded-full">
                              {achievement.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
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
