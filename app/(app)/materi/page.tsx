"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookOpen, Clock, Star, ArrowRight, CheckCircle2, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { materials } from "@/lib/game-data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function MateriPage() {
  const { user } = useAuth()

  const getProgress = (materialId: string) => {
    if (!user) return 0
    const material = materials.find(m => m.id === materialId)
    if (!material) return 0
    
    const completedLessons = material.lessons.filter(
      lesson => user.completedMaterials.includes(lesson.id)
    ).length
    
    return Math.round((completedLessons / material.lessons.length) * 100)
  }

  const isMaterialCompleted = (materialId: string) => {
    return getProgress(materialId) === 100
  }

  return (
    <div className="min-h-screen px-4 py-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Pustaka Materi Finansial
          </h1>
          <p className="text-muted-foreground text-lg">
            Jelajahi berbagai modul pembelajaran untuk meningkatkan literasi keuanganmu
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/materi.png"
            alt="Pustaka Materi Finansial"
            width={1400}
            height={500}
            className="w-full h-[200px] md:h-[500px] object-cover"
            priority
          />
        </motion.div>

        {/* Materials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {materials.map((material, index) => {
            const progress = getProgress(material.id)
            const isCompleted = isMaterialCompleted(material.id)
            
            return (
              <motion.div
                key={material.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link href={user ? `/materi/${material.id}` : "/login"}>
                  <Card className="relative overflow-hidden h-full bg-card/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    {/* Completed Badge */}
                    {isCompleted && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          Selesai
                        </div>
                      </div>
                    )}
                    
                    {/* Card Content */}
                    <div className="p-6">
                      {/* Image */}
                      <div className="aspect-video mb-4 rounded-2xl overflow-hidden relative bg-gradient-to-br from-primary/10 to-accent/10">
                        <Image
                          src={material.image}
                          alt={material.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white drop-shadow-lg">
                            {material.title}
                          </h3>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {material.lessons.length} Pelajaran
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {material.lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} menit
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {material.description}
                      </p>

                      {/* Progress */}
                      {user && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Kemajuan</span>
                            <span className="font-medium text-primary">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      {/* Rewards */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">+{material.xpReward} XP</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <div className="h-4 w-4 rounded-full bg-yellow-400" />
                            <span className="font-medium">+{material.coinReward} Koin</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-medium text-sm group-hover:underline flex items-center gap-1">
                            {user ? (
                              progress > 0 ? "Lanjutkan Belajar" : "Mulai Pelajaran"
                            ) : (
                              <>
                                <Lock className="h-4 w-4" />
                                Login untuk Akses
                              </>
                            )}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
