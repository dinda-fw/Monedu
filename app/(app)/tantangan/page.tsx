"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { challenges } from "@/lib/game-data"
import { FloatingElements } from "@/components/floating-elements"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Clock, Star, CheckCircle, Lock, Flame, Gift, Zap } from "lucide-react"
import Link from "next/link"

export default function TantanganPage() {
  const { user, completeChallenge } = useAuth()

  const handleCompleteChallenge = (challengeId: string, reward: { points: number; coins: number }) => {
    completeChallenge(challengeId, reward)
  }

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

  const dailyChallenges = challenges.filter(c => c.type === "daily")
  const weeklyChallenges = challenges.filter(c => c.type === "weekly")
  const specialChallenges = challenges.filter(c => c.type === "special")

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case "daily": return <Flame className="w-5 h-5 text-orange-500" />
      case "weekly": return <Target className="w-5 h-5 text-blue-500" />
      case "special": return <Star className="w-5 h-5 text-yellow-500" />
      default: return <Trophy className="w-5 h-5" />
    }
  }

  const ChallengeCard = ({ challenge }: { challenge: typeof challenges[0] }) => {
    const isCompleted = user?.completedChallenges?.includes(challenge.id) ?? false
    const userPoints = user?.points ?? 0
    const baseProgress = Math.min((userPoints / (challenge.requirement || 1)) * 100, 100)

    const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>(() =>
      Object.fromEntries(challenge.tasks.map((task) => [task.id, false]))
    )

    const completedTaskCount = challenge.tasks.filter((task) => taskStatus[task.id]).length
    const taskProgress = Math.round((completedTaskCount / challenge.tasks.length) * 100)
    const progress = isCompleted ? 100 : Math.max(baseProgress, taskProgress)
    const canClaim = !isCompleted && taskProgress === 100

    const toggleTask = (taskId: string) => {
      setTaskStatus((prev) => ({ ...prev, [taskId]: !prev[taskId] }))
    }

    return (
      <motion.div
        variants={item}
        whileHover={{ scale: 1.02, y: -5 }}
        className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all min-w-[1200px] w-[600px] flex-none ${
          isCompleted
            ? "bg-green-500/10 border-green-500/30"
            : "bg-card/50 border-border/50 hover:border-primary/50"
        }`}>
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        )}

        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl ${
              challenge.type === "daily"
                ? "bg-orange-500/20"
                : challenge.type === "weekly"
                ? "bg-blue-500/20"
                : "bg-yellow-500/20"
            }`}>
            {getChallengeIcon(challenge.type)}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  challenge.type === "daily"
                    ? "bg-orange-500/20 text-orange-400"
                    : challenge.type === "weekly"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                {challenge.type === "daily" ? "Harian" : challenge.type === "weekly" ? "Mingguan" : "Spesial"}
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{challenge.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

            <div className="mb-3">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">Tugas</div>
              <div className="space-y-2">
                {challenge.tasks.map((task) => (
                  <label key={task.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={taskStatus[task.id] || false}
                      onChange={() => toggleTask(task.id)}
                      className="h-4 w-4 rounded border-border/50"
                    />
                    <span className={taskStatus[task.id] ? "line-through text-green-700" : ""}>{task.title}</span>
                  </label>
                ))}
              </div>
            </div>

            {!isCompleted && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Kemajuan</span>
                  <span className="text-primary">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-yellow-500 font-medium">+{challenge.xpReward}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Gift className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-500 font-medium">+{challenge.coinReward}</span>
                </div>
              </div>

              {!isCompleted && (
                <Button
                  size="sm"
                  onClick={() => {
                    if (canClaim) {
                      handleCompleteChallenge(challenge.id, { points: challenge.xpReward, coins: challenge.coinReward, xp: challenge.xpReward })
                    }
                  }}
                  disabled={!canClaim}
                  className={`bg-gradient-to-r from-primary to-accent hover:opacity-90 ${!canClaim ? "opacity-50 cursor-not-allowed" : ""}`}>
                  {isCompleted ? "Selesai" : canClaim ? "Klaim Hadiah" : "Selesaikan tugas"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Tantangan Seru
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selesaikan tantangan untuk mendapatkan poin dan koin ekstra!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{user?.streak || 0}</p>
            <p className="text-sm text-muted-foreground">Hari Streak</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{user?.completedChallenges.length || 0}</p>
            <p className="text-sm text-muted-foreground">Tantangan Selesai</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{user?.points || 0}</p>
            <p className="text-sm text-muted-foreground">Total Poin</p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 text-center">
            <Gift className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{user?.coins || 0}</p>
            <p className="text-sm text-muted-foreground">Total Koin</p>
          </div>
        </motion.div>

        {/* Daily Challenges */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-orange-500/20">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Tantangan Harian</h2>
              <p className="text-sm text-muted-foreground">Reset setiap hari jam 00:00</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {dailyChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </motion.section>

        {/* Weekly Challenges */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-500/20">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Tantangan Mingguan</h2>
              <p className="text-sm text-muted-foreground">Reset setiap hari Senin</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {weeklyChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </motion.section>

        {/* Special Challenges */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-yellow-500/20">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Tantangan Spesial</h2>
              <p className="text-sm text-muted-foreground">Tantangan eksklusif dengan hadiah besar</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {specialChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
