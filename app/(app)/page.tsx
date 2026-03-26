"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Trophy, Brain, Target, Coins, Star, Flame, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { materials } from "@/lib/game-data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-8 md:p-12 lg:p-16">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  <span className="text-yellow-300">Kuasai Keuanganmu,</span>
                  <br />
                  Bangun Masa Depanmu
                </h1>
                <p className="text-white/90 text-lg mb-8 max-w-xl">
                  Platform edukasi literasi keuangan interaktif ini untuk Generasi Cerdas. 
                  Belajar melalui materi menarik, kuis interaktif, tantangan seru, dan AI tutor personal.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={user ? "/materi" : "/register"}>
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-xl font-semibold">
                      Mulai Belajar <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/tentang">
                    <Button size="lg" variant="outline" className="border-white/50 text-black hover:bg-white/10 rounded-xl">
                      Pelajari Lebih lanjut
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1, 0, -1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <Image
                    src="/Moneytree.png"
                    alt="Monedu Hero"
                    width={600}
                    height={400}
                    className="rounded-2xl object-contain drop-shadow-2xl"
                    priority
                  />
                  {/* Floating particles effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/30 rounded-full blur-sm"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute -bottom-6 -left-6 w-12 h-12 bg-green-400/20 rounded-full blur-sm"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Stats for logged in users */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative z-10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Trophy className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{user.points}</div>
                  <div className="text-white/80 text-sm">Total Poin</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Coins className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{user.coins}</div>
                  <div className="text-white/80 text-sm">Total Koin</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <BookOpen className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{user.completedMaterials.length}</div>
                  <div className="text-white/80 text-sm">Materi Diselesaikan</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Flame className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{user.streak}</div>
                  <div className="text-white/80 text-sm">Hari Streak</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">Pustaka Materi Finansial</h2>
            <p className="text-muted-foreground">Jelajahi berbagai modul pembelajaran untuk meningkatkan literasi keuanganmu</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {materials.map((material, index) => (
              <motion.div
                key={material.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link href={`/materi/${material.id}`}>
                  <Card className="relative overflow-hidden h-full bg-card/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-6">
                      <div className="aspect-video mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Image
                          src={material.image}
                          alt={material.title}
                          width={400}
                          height={225}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {material.lessons.length} Pelajaran
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>+{material.xpReward} XP</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                        {material.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {material.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-medium text-sm">
                        Mulai Pelajaran <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Fitur Unggulan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Belajar keuangan jadi seru dengan berbagai fitur gamifikasi yang dirancang khusus untukmu
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: BookOpen, title: "Materi Interaktif", desc: "Konten pembelajaran yang mudah dipahami dengan ilustrasi menarik", color: "bg-purple-500" },
              { icon: Brain, title: "Kuis Seru", desc: "Uji pemahamanmu dengan kuis interaktif dan dapatkan reward", color: "bg-blue-500" },
              { icon: Target, title: "Tantangan Harian", desc: "Selesaikan tantangan untuk membangun kebiasaan keuangan baik", color: "bg-green-500" },
              { icon: Users, title: "Papan Peringkat", desc: "Kompetisi sehat dengan pelajar lainnya di seluruh Indonesia", color: "bg-orange-500" },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden bg-gradient-hero text-white p-8 md:p-12 rounded-3xl border-0">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
              </div>
              <div className="relative z-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Siap Memulai Perjalanan Finansialmu?
                </h2>
                <p className="text-white/90 mb-8 max-w-xl mx-auto">
                  Bergabung dengan ribuan pelajar Indonesia yang sudah belajar literasi keuangan bersama Monedu
                </p>
                <Link href={user ? "/materi" : "/register"}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-xl font-semibold px-8">
                    {user ? "Lanjutkan Belajar" : "Daftar Gratis Sekarang"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>2024 Monedu. Platform Edukasi Literasi Keuangan untuk Generasi Cerdas Indonesia.</p>
        </div>
      </footer>
    </div>
  )
}
