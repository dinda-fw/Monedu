"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { HelpCircle, Clock, Star, ArrowRight, Trophy, Lock, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { quizzes } from "@/lib/game-data"

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

export default function KuisPage() {
  const { user } = useAuth()

  const isQuizCompleted = (quizId: string) => {
    return user?.completedQuizzes.includes(quizId) ?? false
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
            Kuis Literasi Keuangan
          </h1>
          <p className="text-muted-foreground text-lg">
            Uji pemahamanmu dengan kuis interaktif dan dapatkan koin reward
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
            src="/kuis.png"
            alt="Kuis Literasi Keuangan"
            width={1400}
            height={1500}
            className="w-full h-[150px] md:h-[450px] object-cover"
            priority
          />
        </motion.div>

        {/* Quiz Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {quizzes.map((quiz) => {
            const completed = isQuizCompleted(quiz.id)
            
            return (
              <motion.div
                key={quiz.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link href={user ? `/kuis/${quiz.id}` : "/login"}>
                  <Card className="relative overflow-hidden h-full bg-card/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    {/* Completed Badge */}
                    {completed && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          <CheckCircle2 className="h-3 w-3" />
                          Selesai
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Quiz Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mb-4">
                        <HelpCircle className="h-8 w-8 text-white" />
                      </div>

                      {/* Quiz Info */}
                      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <HelpCircle className="h-4 w-4" />
                          {quiz.questions.length} Soal
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {Math.floor(quiz.timeLimit / 60)} menit
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {quiz.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {quiz.description}
                      </p>

                      {/* Rewards */}
                      <div className="flex items-center gap-4 mb-4 p-3 bg-secondary/50 rounded-xl">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium text-sm">+{quiz.xpReward} XP</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-yellow-800">$</span>
                          </div>
                          <span className="font-medium text-sm">+{quiz.coinReward} Koin</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:underline">
                          {user ? (
                            completed ? "Ulangi Kuis" : "Mulai Kuis"
                          ) : (
                            <>
                              <Lock className="h-4 w-4" />
                              Login untuk Akses
                            </>
                          )}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {completed && (
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-hero text-white p-6 md:p-8 rounded-2xl border-0">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Trophy className="h-10 w-10" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Tips Mengerjakan Kuis</h3>
                <p className="text-white/90 text-sm max-w-xl">
                  Baca setiap pertanyaan dengan teliti. Jawaban yang benar akan memberikan poin lebih tinggi. 
                  Selesaikan kuis sebelum waktu habis untuk mendapatkan bonus tambahan!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
