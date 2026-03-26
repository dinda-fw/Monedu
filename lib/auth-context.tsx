"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  xp: number
  coins: number
  points: number
  streak: number
  completedMaterials: string[]
  completedQuizzes: string[]
  completedChallenges: string[]
  achievements: string[]
  joinedAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  addXP: (amount: number) => void
  addCoins: (amount: number) => void
  addPoints: (amount: number) => void
  completeMaterial: (materialId: string) => void
  completeQuiz: (quizId: string, score: number) => void
  completeChallenge: (challengeId: string, reward?: { points: number; coins: number; xp?: number }) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "demo@Monedu.com": {
    password: "demo123",
    user: {
      id: "demo-1",
      name: "Pengguna Demo",
      email: "demo@Monedu.com",
      level: 5,
      xp: 2500,
      coins: 250,
      points: 2500,
      streak: 7,
      completedMaterials: ["pengelolaan-uang-1", "menabung-1"],
      completedQuizzes: ["quiz-pengelolaan-1"],
      completedChallenges: ["challenge-1"],
      achievements: ["first-login", "first-quiz", "streak-7"],
      joinedAt: "2024-01-01"
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("Monedu_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("Monedu_user")
      }
    }
    setIsLoading(false)
  }, [])

  const saveUser = (userData: User) => {
    localStorage.setItem("Monedu_user", JSON.stringify(userData))
    setUser(userData)
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check demo users
    const demoUser = DEMO_USERS[email]
    if (demoUser && demoUser.password === password) {
      saveUser(demoUser.user)
      return true
    }

    // Check registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("Monedu_registered_users") || "{}")
    const registered = registeredUsers[email]
    if (registered && registered.password === password) {
      saveUser(registered.user)
      return true
    }

    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email already exists
    if (DEMO_USERS[email]) return false
    
    const registeredUsers = JSON.parse(localStorage.getItem("Monedu_registered_users") || "{}")
    if (registeredUsers[email]) return false

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      level: 1,
      xp: 0,
      coins: 0,
      points: 0,
      streak: 0,
      completedMaterials: [],
      completedQuizzes: [],
      completedChallenges: [],
      achievements: ["first-login"],
      joinedAt: new Date().toISOString().split("T")[0]
    }

    registeredUsers[email] = { password, user: newUser }
    localStorage.setItem("Monedu_registered_users", JSON.stringify(registeredUsers))
    saveUser(newUser)
    return true
  }

  const logout = () => {
    localStorage.removeItem("Monedu_user")
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null
      const updatedUser = { ...prevUser, ...updates }
      localStorage.setItem("Monedu_user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 500) + 1
  }

  const addXP = (amount: number) => {
    if (!user) return
    const newXP = user.xp + amount
    const newLevel = calculateLevel(newXP)
    updateUser({ xp: newXP, level: newLevel })
  }

  const addCoins = (amount: number) => {
    if (!user) return
    updateUser({ coins: user.coins + amount })
  }

  const addPoints = (amount: number) => {
    if (!user) return
    updateUser({ points: user.points + amount })
  }

  const completeMaterial = (materialId: string) => {
    setUser((prevUser) => {
      if (!prevUser || prevUser.completedMaterials.includes(materialId)) return prevUser
      const newUser = {
        ...prevUser,
        completedMaterials: [...prevUser.completedMaterials, materialId],
        xp: prevUser.xp + 100,
        coins: prevUser.coins + 10,
        points: prevUser.points + 50
      }
      localStorage.setItem("Monedu_user", JSON.stringify(newUser))
      return newUser
    })
  }

  const completeQuiz = (quizId: string, score: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser
      const isFirstTime = !prevUser.completedQuizzes.includes(quizId)
      let newUser = prevUser

      if (isFirstTime) {
        newUser = {
          ...newUser,
          completedQuizzes: [...newUser.completedQuizzes, quizId]
        }
      }

      const xpEarned = Math.floor(score * 2)
      const coinsEarned = Math.floor(score / 10)
      const pointsEarned = score

      newUser = {
        ...newUser,
        xp: newUser.xp + xpEarned,
        coins: newUser.coins + coinsEarned,
        points: newUser.points + pointsEarned
      }

      localStorage.setItem("Monedu_user", JSON.stringify(newUser))
      return newUser
    })
  }

  const completeChallenge = (challengeId: string, reward?: { points: number; coins: number; xp?: number }) => {
    setUser((prevUser) => {
      if (!prevUser || prevUser.completedChallenges.includes(challengeId)) return prevUser

      const xpEarned = reward?.xp ?? 200
      const coinsEarned = reward?.coins ?? 25
      const pointsEarned = reward?.points ?? 100

      const newUser = {
        ...prevUser,
        completedChallenges: [...prevUser.completedChallenges, challengeId],
        streak: prevUser.streak + 1,
        xp: prevUser.xp + xpEarned,
        coins: prevUser.coins + coinsEarned,
        points: prevUser.points + pointsEarned
      }

      localStorage.setItem("Monedu_user", JSON.stringify(newUser))
      return newUser
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        addXP,
        addCoins,
        addPoints,
        completeMaterial,
        completeQuiz,
        completeChallenge
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
