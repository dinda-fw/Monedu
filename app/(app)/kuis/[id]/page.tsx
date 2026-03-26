"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, CheckCircle2, XCircle, Trophy, Star, Coins, ArrowRight, RotateCcw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizzes } from "@/lib/game-data"

export default function KuisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user, completeQuiz } = useAuth()
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const quiz = quizzes.find(q => q.id === resolvedParams.id)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    if (quiz && quizStarted && !showResult) {
      setTimeLeft(quiz.timeLimit)
    }
  }, [quiz, quizStarted, showResult])

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizStarted, timeLeft, showResult])

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Kuis Tidak Ditemukan</h1>
          <Link href="/kuis">
            <Button>Kembali ke Daftar Kuis</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)
    
    setShowExplanation(false)
    setSelectedAnswer(null)

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleFinishQuiz(newAnswers)
    }
  }

  const handleCheckAnswer = () => {
    setShowExplanation(true)
  }

  const handleFinishQuiz = (finalAnswers?: (number | null)[]) => {
    const answersToCheck = finalAnswers || answers
    const correctCount = answersToCheck.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index]?.correctAnswer ? 1 : 0)
    }, 0)
    
    const score = Math.round((correctCount / quiz.questions.length) * 100)
    completeQuiz(quiz.id, score)
    setShowResult(true)
  }

  const calculateScore = () => {
    const correctCount = answers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index]?.correctAnswer ? 1 : 0)
    }, 0)
    return {
      correct: correctCount,
      total: quiz.questions.length,
      percentage: Math.round((correctCount / quiz.questions.length) * 100)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResult(false)
    setShowExplanation(false)
    setQuizStarted(false)
  }

  // Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/kuis">
              <Button variant="ghost" className="mb-6 rounded-xl gap-2">
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
            </Link>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
              <div className="p-6 md:p-8 bg-gradient-hero text-white text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{quiz.title}</h1>
                <p className="text-white/90">{quiz.description}</p>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-secondary rounded-xl text-center">
                    <p className="text-2xl font-bold text-foreground">{quiz.questions.length}</p>
                    <p className="text-sm text-muted-foreground">Pertanyaan</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-xl text-center">
                    <p className="text-2xl font-bold text-foreground">{Math.floor(quiz.timeLimit / 60)}</p>
                    <p className="text-sm text-muted-foreground">Menit</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8 p-4 bg-primary/10 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">+{quiz.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">+{quiz.coinReward} Koin</span>
                  </div>
                </div>

                <Button
                  onClick={() => setQuizStarted(true)}
                  className="w-full h-14 rounded-xl text-lg font-semibold"
                  size="lg"
                >
                  Mulai Kuis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Result Screen
  if (showResult) {
    const score = calculateScore()
    const isPerfect = score.percentage === 100
    const isPassed = score.percentage >= 60

    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
              <div className={`p-8 text-white text-center ${isPassed ? 'bg-gradient-hero' : 'bg-gradient-to-br from-orange-500 to-red-500'}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {isPerfect ? (
                    <Trophy className="h-20 w-20 mx-auto mb-4 text-yellow-300" />
                  ) : isPassed ? (
                    <CheckCircle2 className="h-20 w-20 mx-auto mb-4" />
                  ) : (
                    <XCircle className="h-20 w-20 mx-auto mb-4" />
                  )}
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">
                  {isPerfect ? "Sempurna!" : isPassed ? "Selamat!" : "Coba Lagi!"}
                </h1>
                <p className="text-white/90">
                  {isPerfect 
                    ? "Kamu menjawab semua pertanyaan dengan benar!" 
                    : isPassed 
                      ? "Kamu telah menyelesaikan kuis ini" 
                      : "Jangan menyerah, terus belajar!"}
                </p>
              </div>

              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-primary mb-2">{score.percentage}%</div>
                  <p className="text-muted-foreground">
                    {score.correct} dari {score.total} jawaban benar
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-secondary rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-xl font-bold">+{Math.floor(score.percentage * 2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">XP Earned</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Coins className="h-5 w-5 text-yellow-500" />
                      <span className="text-xl font-bold">+{Math.floor(score.percentage / 10)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Koin Earned</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={handleRestart} variant="outline" className="rounded-xl" size="lg">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Ulangi Kuis
                  </Button>
                  <Link href="/kuis" className="w-full">
                    <Button className="w-full rounded-xl" size="lg">
                      Kembali ke Daftar Kuis
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Quiz Screen
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Pertanyaan {currentQuestion + 1}/{quiz.questions.length}
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            timeLeft <= 30 ? 'bg-red-100 text-red-600' : 'bg-secondary'
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-2 mb-8" />

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === question.correctAnswer
                  const showCorrectness = showExplanation

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                        showCorrectness
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : isSelected
                              ? 'border-red-500 bg-red-50'
                              : 'border-transparent bg-secondary'
                          : isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-transparent bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          showCorrectness
                            ? isCorrect
                              ? 'bg-green-500 text-white'
                              : isSelected
                                ? 'bg-red-500 text-white'
                                : 'bg-muted text-muted-foreground'
                            : isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {showCorrectness && isCorrect ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : showCorrectness && isSelected && !isCorrect ? (
                            <XCircle className="h-5 w-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className={`flex-1 ${
                          showCorrectness && isCorrect ? 'font-medium text-green-700' : ''
                        }`}>
                          {option}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <p className="font-medium text-blue-800 mb-1">Penjelasan:</p>
                  <p className="text-blue-700">{question.explanation}</p>
                </motion.div>
              )}

              {/* Actions */}
              <div className="mt-8 flex gap-4">
                {!showExplanation ? (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                    className="flex-1 rounded-xl"
                    size="lg"
                  >
                    Cek Jawaban
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="flex-1 rounded-xl"
                    size="lg"
                  >
                    {currentQuestion < quiz.questions.length - 1 ? (
                      <>
                        Pertanyaan Selanjutnya
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      "Lihat Hasil"
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
