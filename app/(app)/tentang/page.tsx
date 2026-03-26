"use client"

import { motion } from "framer-motion"
import { FloatingElements } from "@/components/floating-elements"
import { Target, Users, Award, Heart, Sparkles, BookOpen, TrendingUp, Shield, Zap, Globe } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  { 
    name: "Dinda Fajarwati", 
    role: "Web Developer & Pemateri", 
    description: "Mahasiswa Universitas Negeri Surabaya",
    avatar: "/dinda.jpeg"
  },
  { 
    name: "Umi Listyaningsih", 
    role: "UI/UX Designer & Head Of Education", 
    description: "Mahasiswa Universitas Negeri Surabaya",
    avatar: "/UMI.jpeg"
  },
]

const stats = [
  { icon: <Users className="w-6 h-6" />, value: "10+", label: "Pengguna Aktif" },
  { icon: <BookOpen className="w-6 h-6" />, value: "3", label: "Materi Pembelajaran" },
  { icon: <Award className="w-6 h-6" />, value: "10+", label: "Kuis Interaktif" },
  { icon: <Globe className="w-6 h-6" />, value: "34", label: "Provinsi Terjangkau" },
]

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Misi Kami",
    description: "Meningkatkan literasi keuangan generasi muda Indonesia melalui pendidikan yang menyenangkan dan interaktif."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Visi Kami",
    description: "Menjadi platform edukasi keuangan terdepan yang membantu setiap pelajar Indonesia meraih kebebasan finansial."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Nilai Kami",
    description: "Inovasi, aksesibilitas, dan dampak positif dalam setiap langkah pengembangan platform."
  }
]

const features = [
  {
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    title: "Materi Terstruktur",
    description: "Konten pembelajaran yang disusun secara sistematis dari dasar hingga lanjutan"
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Gamifikasi",
    description: "Sistem poin, level, dan achievement yang membuat belajar semakin seru"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-green-500" />,
    title: "Tracking Progress",
    description: "Pantau perkembangan belajar dengan dashboard yang informatif"
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "AI Personal Tutor",
    description: "Asisten AI yang siap menjawab pertanyaan seputar keuangan 24/7"
  }
]

export default function TentangPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background pt-24 pb-16 relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Tentang Monedu
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Membangun Generasi
            </span>
            <br />
            <span className="text-foreground">Melek Finansial</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Monedu adalah platform edukasi literasi keuangan yang dirancang khusus untuk pelajar dan mahasiswa Indonesia. 
            Kami percaya bahwa pemahaman keuangan yang baik adalah fondasi untuk masa depan yang cerah.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission, Vision, Values */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Mengapa Memilih Monedu?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Platform kami dirancang dengan fitur-fitur unggulan untuk pengalaman belajar terbaik
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tim Taraweb</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Orang-orang hebat di balik Monedu yang berdedikasi untuk pendidikan keuangan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="w-full max-w-sm bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Siap Memulai Perjalanan Finansialmu?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelajar Indonesia yang sudah belajar literasi keuangan bersama Monedu
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-5 h-5" />
            Mulai Belajar Gratis
          </a>
        </motion.div>
      </div>
    </div>
  )
}
