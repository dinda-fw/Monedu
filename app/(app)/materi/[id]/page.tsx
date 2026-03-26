"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, BookOpen, Clock, Star, CheckCircle2, ChevronRight, Award, Coins } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { materials, type Material, type Lesson } from "@/lib/game-data"

export default function MateriDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user, completeMaterial } = useAuth()
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [showReward, setShowReward] = useState(false)

  const material = materials.find(m => m.id === resolvedParams.id)

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Materi Tidak Ditemukan</h1>
          <Link href="/materi">
            <Button>Kembali ke Pustaka Materi</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const isLessonCompleted = (lessonId: string) => {
    return user?.completedMaterials.includes(lessonId) ?? false
  }

  const completedCount = material.lessons.filter(l => isLessonCompleted(l.id)).length
  const progress = Math.round((completedCount / material.lessons.length) * 100)

  const handleCompleteLesson = (lessonId: string) => {
    if (!user) {
      router.push("/login")
      return
    }
    
    if (!isLessonCompleted(lessonId)) {
      completeMaterial(lessonId)
      setShowReward(true)
      setTimeout(() => setShowReward(false), 3000)
    }
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/materi">
            <Button variant="ghost" className="rounded-xl gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Pustaka
            </Button>
          </Link>
        </motion.div>

        {/* Reward Popup */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
            >
              <Card className="p-6 bg-gradient-hero text-white shadow-2xl rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Pelajaran Selesai!</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-300" />
                        +100 XP
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Coins className="h-4 w-4 text-yellow-300" />
                        +10 Koin
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Lesson List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24 bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
              <div className="p-6 bg-gradient-hero text-white">
                <h2 className="text-xl font-bold mb-2">{material.title}</h2>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {material.lessons.length} Pelajaran
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Kemajuan</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-white/20" />
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {material.lessons.map((lesson, index) => {
                    const isCompleted = isLessonCompleted(lesson.id)
                    const isSelected = selectedLesson?.id === lesson.id
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isSelected
                                ? "bg-white/20"
                                : "bg-muted"
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <span className="text-sm font-medium">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium truncate ${
                              isSelected ? "text-primary-foreground" : ""
                            }`}>
                              {lesson.title}
                            </p>
                            <p className={`text-xs flex items-center gap-1 ${
                              isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                            }`}>
                              <Clock className="h-3 w-3" />
                              {lesson.duration}
                            </p>
                          </div>
                          <ChevronRight className={`h-4 w-4 ${
                            isSelected ? "text-primary-foreground" : "text-muted-foreground"
                          }`} />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {selectedLesson ? (
              <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {selectedLesson.title}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {selectedLesson.duration}
                        </span>
                        {isLessonCompleted(selectedLesson.id) && (
                          <span className="flex items-center gap-1 text-green-500">
                            <CheckCircle2 className="h-4 w-4" />
                            Selesai
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {selectedLesson.content.split('\n').map((line, index) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={index} className="text-2xl font-bold mt-6 mb-4 text-foreground">{line.slice(2)}</h1>
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-foreground">{line.slice(3)}</h2>
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>
                        }
                        if (line.startsWith('- **')) {
                          const parts = line.slice(2).split('**')
                          return (
                            <p key={index} className="ml-4 my-1">
                              <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2" />
                              <strong>{parts[1]}</strong>{parts[2]}
                            </p>
                          )
                        }
                        if (line.startsWith('- ')) {
                          return (
                            <p key={index} className="ml-4 my-1 flex items-start gap-2">
                              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {line.slice(2)}
                            </p>
                          )
                        }
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <p key={index} className="font-bold mt-4 mb-2">{line.slice(2, -2)}</p>
                        }
                        if (line.trim() === '') {
                          return <br key={index} />
                        }
                        return <p key={index} className="my-2 text-muted-foreground">{line}</p>
                      })}
                    </div>
                  </div>

                  {/* Complete Button */}
                  <div className="mt-8 pt-6 border-t border-border">
                    {!isLessonCompleted(selectedLesson.id) ? (
                      <Button
                        onClick={() => handleCompleteLesson(selectedLesson.id)}
                        className="w-full md:w-auto rounded-xl"
                        size="lg"
                      >
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Tandai Selesai & Dapatkan Reward
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Kamu sudah menyelesaikan pelajaran ini</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 md:p-12 text-center">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Pilih Pelajaran
                </h2>
                <p className="text-muted-foreground mb-6">
                  Pilih salah satu pelajaran di sebelah kiri untuk memulai belajar
                </p>
                <Button
                  onClick={() => setSelectedLesson(material.lessons[0])}
                  className="rounded-xl"
                >
                  Mulai dari Awal
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
