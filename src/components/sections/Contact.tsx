import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getContact } from "@/services/portfolioService"
import { getIcon } from "@/lib/iconMap"
import type { ContactInfo as ContactInfoType, SocialLink as SocialLinkType } from "@/types/portfolio"

const fallbackContactInfo: ContactInfoType[] = [
  {
    icon: "Mail",
    label: "Email",
    value: "shyam.mylai@gmail.com",
    href: "mailto:shyam.mylai@gmail.com",
  },
  {
    icon: "Phone",
    label: "Phone",
    value: "+91 9840476167",
    href: "tel:+919840476167",
  },
  {
    icon: "MapPin",
    label: "Location",
    value: "Chennai, India",
    href: null,
  },
]

const fallbackSocialLinks: SocialLinkType[] = [
  {
    icon: "Github",
    label: "GitHub",
    href: "https://github.com/shyam2520",
  },
  {
    icon: "Linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shyam-mylai",
  },
]

export function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactInfoType[]>(fallbackContactInfo)
  const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>(fallbackSocialLinks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getContact()
        if (data) {
          if (data.contactInfo && data.contactInfo.length > 0) {
            setContactInfo(data.contactInfo)
          }
          if (data.socialLinks && data.socialLinks.length > 0) {
            setSocialLinks(data.socialLinks)
          }
        }
      } catch (error) {
        console.error('Failed to fetch contact:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-zinc-900 to-black overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-400">Loading contact information...</div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                {contactInfo.map((info, index) => {
                  const Icon = getIcon(info.icon)
                  return (
                    <Card
                      key={index}
                      className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-sm text-gray-400 mb-2">{info.label}</h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-pink-600 transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <Card className="bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                    <p className="text-gray-400 mb-6">
                      Feel free to reach out through any of the platforms below
                    </p>
                    <div className="flex gap-4 justify-center mb-6">
                      {socialLinks.map((link, index) => {
                        const Icon = getIcon(link.icon)
                        return (
                          <div key={index} className="relative p-[2px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all group">
                            <Button
                              size="lg"
                              variant="ghost"
                              className="bg-zinc-950 hover:bg-zinc-900 text-white hover:text-white"
                              onClick={() => window.open(link.href, '_blank')}
                            >
                              <Icon className="mr-2 h-5 w-5" />
                              {link.label}
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0"
                      onClick={() => window.location.href = 'mailto:shyam.mylai@gmail.com'}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-16 text-gray-500 text-sm"
      >
        <p>© 2025</p>
      </motion.footer>
    </section>
  )
}
