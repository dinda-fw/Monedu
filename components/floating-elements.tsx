"use client"

import { motion } from "framer-motion"
import { Coins, BookOpen, TrendingUp, PiggyBank, Calculator, CreditCard, Target } from "lucide-react"

const floatingItems = [
  { Icon: Coins, delay: 0, x: "10%", y: "20%" },
  { Icon: BookOpen, delay: 0.5, x: "85%", y: "15%" },
  { Icon: TrendingUp, delay: 1, x: "75%", y: "70%" },
  { Icon: PiggyBank, delay: 1.5, x: "15%", y: "75%" },
  { Icon: Calculator, delay: 2, x: "90%", y: "45%" },
  { Icon: CreditCard, delay: 2.5, x: "5%", y: "50%" },
  { Icon: Target, delay: 3, x: "50%", y: "85%" },
]

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-3 rounded-2xl bg-primary/10 backdrop-blur-sm">
            <item.Icon className="h-6 w-6 text-primary/50" />
          </div>
        </motion.div>
      ))}
      
      {/* Decorative circles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ left: "10%", top: "30%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        style={{ right: "5%", bottom: "20%" }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  )
}

export function CloudsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cloud shapes using gradients */}
      <motion.div
        className="absolute w-48 h-24 rounded-full bg-white/40 blur-2xl"
        style={{ left: "5%", top: "10%" }}
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-64 h-32 rounded-full bg-white/30 blur-2xl"
        style={{ right: "10%", top: "5%" }}
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-56 h-28 rounded-full bg-white/35 blur-2xl"
        style={{ left: "40%", top: "15%" }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-40 h-20 rounded-full bg-white/25 blur-2xl"
        style={{ left: "70%", bottom: "30%" }}
        animate={{ x: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-52 h-26 rounded-full bg-white/30 blur-2xl"
        style={{ left: "20%", bottom: "15%" }}
        animate={{ x: [0, 35, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}
