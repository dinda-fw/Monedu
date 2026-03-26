"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FloatingElements } from "@/components/floating-elements"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: "hello@Monedu.id",
    description: "Kirim email kapan saja"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Telepon",
    value: "+62 8563252606",
    description: "Senin - Jumat, 09:00 - 17:00"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Alamat",
    value: "Surabaya, Indonesia",
    description: "Jl. Unesa ketintang no.a10"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Jam Operasional",
    value: "09:00 - 17:00 WIB",
    description: "Senin - Jumat"
  }
]

const socialLinks = [
  { icon: <Instagram className="w-5 h-5" />, name: "Instagram", handle: "@Monedu.id" },
  { icon: <Twitter className="w-5 h-5" />, name: "Twitter", handle: "@Monedu_id" },
  { icon: <Youtube className="w-5 h-5" />, name: "YouTube", handle: "Monedu ID" },
  { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", handle: "Monedu Indonesia" },
]

const faqs = [
  {
    question: "Apakah Monedu gratis?",
    answer: "Ya! Monedu menyediakan akses gratis ke semua materi pembelajaran dasar. Kami percaya pendidikan keuangan harus dapat diakses oleh semua orang."
  },
  {
    question: "Bagaimana cara mendapatkan poin dan koin?",
    answer: "Anda bisa mendapatkan poin dengan menyelesaikan materi dan kuis. Koin didapat dari tantangan harian, mingguan, dan pencapaian khusus."
  },
  {
    question: "Apakah materi cocok untuk pemula?",
    answer: "Tentu! Materi kami dirancang dari level dasar hingga lanjutan, cocok untuk pelajar SMP, SMA, dan mahasiswa yang baru memulai belajar keuangan."
  }
]

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.")
    
    setFormData({ name: "", email: "", subject: "", message: "" })
    
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background pt-24 pb-16 relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Hubungi Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Ada Pertanyaan?
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tim kami siap membantu Anda. Kirim pesan atau hubungi kami melalui kontak di bawah ini.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/20">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Kirim Pesan</h2>
                  <p className="text-sm text-muted-foreground">Isi formulir di bawah ini</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      required
                      className="bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      required
                      className="bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tentang apa pesan Anda?"
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pesan Anda di sini..."
                    required
                    rows={5}
                    className="bg-muted/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mengirim...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Terkirim!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Kirim Pesan
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{info.title}</h3>
                  <p className="text-primary font-medium text-sm">{info.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
            >
              <h3 className="font-bold text-foreground mb-4">Ikuti Kami</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                      {social.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{social.name}</p>
                      <p className="text-xs text-muted-foreground">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-muted-foreground">Temukan jawaban untuk pertanyaan umum</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
