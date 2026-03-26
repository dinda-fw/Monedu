"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { leaderboardData, achievements } from "@/lib/game-data"
import { FloatingElements } from "@/components/floating-elements"
import { Trophy, Medal, Crown, Star, Zap, Gift, Target, BookOpen, Award, TrendingUp, HelpCircle, Flame, Coins } from "lucide-react"
import Image from "next/image"

export default function PapanPeringkatPage() {
  const { user } = useAuth()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Medal className="w-6 h-6 text-amber-600" />
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 border-yellow-500/30"
      case 2: return "bg-gradient-to-r from-gray-400/20 via-gray-300/10 to-gray-400/20 border-gray-400/30"
      case 3: return "bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-amber-600/20 border-amber-600/30"
      default: return "bg-card/50 border-border/50"
    }
  }

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case "star": return <Star className="w-6 h-6" />
      case "book-open": return <BookOpen className="w-6 h-6" />
      case "help-circle": return <HelpCircle className="w-6 h-6" />
      case "flame": return <Flame className="w-6 h-6" />
      case "coins": return <Coins className="w-6 h-6" />
      case "trophy": return <Trophy className="w-6 h-6" />
      default: return <Award className="w-6 h-6" />
    }
  }

  // Find user's rank
  const userRank = leaderboardData.findIndex(l => l.name === user?.name) + 1 || leaderboardData.length + 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background pt-24 pb-16 relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Papan Peringkat
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat posisimu di antara pelajar lainnya!
          </p>
        </motion.div>

        {/* User Rank Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 p-6 md:p-8">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">#{userRank}</span>
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <p className="text-sm text-muted-foreground mb-1">Posisi Anda Saat Ini</p>
                <h2 className="text-3xl font-bold text-foreground mb-2">Peringkat #{userRank}</h2>
                <p className="text-lg text-foreground">{user?.name || "Pengguna"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{user?.points || 0}</p>
                  <p className="text-sm text-muted-foreground">Poin</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-500">{user?.coins || 0}</p>
                  <p className="text-sm text-muted-foreground">Koin</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard Table */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 border-b border-border/50 text-sm font-medium text-muted-foreground">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Nama</div>
                <div className="col-span-3 text-center flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4" /> Poin
                </div>
                <div className="col-span-3 text-center flex items-center justify-center gap-1">
                  <Gift className="w-4 h-4" /> Koin
                </div>
              </div>

              {/* Table Body */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
              >
                {leaderboardData.map((entry, index) => {
                  const isCurrentUser = entry.name === user?.name
                  return (
                    <motion.div
                      key={entry.id}
                      variants={item}
                      className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-border/30 transition-all hover:bg-muted/20 ${
                        isCurrentUser ? "bg-primary/10" : ""
                      } ${getRankBg(entry.rank)}`}
                    >
                      <div className="col-span-1 flex justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div className="col-span-5 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          entry.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
                          entry.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                          entry.rank === 3 ? "bg-gradient-to-br from-amber-400 to-amber-600" :
                          "bg-gradient-to-br from-primary to-accent"
                        }`}>
                          {entry.avatar}
                        </div>
                        <div>
                          <p className={`font-medium ${isCurrentUser ? "text-primary" : "text-foreground"}`}>
                            {entry.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                Anda
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className={`font-bold ${
                          entry.rank === 1 ? "text-yellow-500" :
                          entry.rank === 2 ? "text-gray-400" :
                          entry.rank === 3 ? "text-amber-600" : "text-foreground"
                        }`}>
                          {entry.points.toLocaleString()}
                        </span>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className="font-bold text-amber-500">{entry.coins.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            {/* Achievement Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-yellow-500/20">
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Pencapaian</h3>
              </div>
              
              <div className="space-y-4">
                {achievements.slice(0, 5).map((achievement, index) => {
                  const isUnlocked = user?.achievements.includes(achievement.id)
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isUnlocked 
                          ? "bg-yellow-500/10 border border-yellow-500/30" 
                          : "bg-muted/30 border border-border/30 opacity-60"
                      }`}
                    >
                      <div className={`text-2xl ${!isUnlocked && "grayscale"}`}>
                        {getAchievementIcon(achievement.icon)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {isUnlocked && (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/20">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Statistik Anda</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Materi Selesai</span>
                  </div>
                  <span className="font-bold text-foreground">{user?.completedMaterials.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-muted-foreground">Kuis Selesai</span>
                  </div>
                  <span className="font-bold text-foreground">{user?.completedQuizzes.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Tantangan Selesai</span>
                  </div>
                  <span className="font-bold text-foreground">{user?.completedChallenges.length || 0}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
