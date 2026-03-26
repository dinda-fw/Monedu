"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { FloatingElements } from "@/components/floating-elements"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles, BookOpen, Lightbulb, PiggyBank, TrendingUp, MessageCircle } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedTopics = [
  { icon: <PiggyBank className="w-5 h-5" />, text: "Bagaimana cara menabung yang efektif?" },
  { icon: <BookOpen className="w-5 h-5" />, text: "Apa itu anggaran harian?" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "Jelaskan tentang investasi dasar" },
  { icon: <Lightbulb className="w-5 h-5" />, text: "Tips mengatur uang saku" },
]

// Mock AI responses for demo
const mockResponses: Record<string, string> = {
  "menabung": `Menabung yang efektif memerlukan strategi yang tepat. Berikut tips-nya:

1. **Tetapkan Tujuan** - Tentukan untuk apa kamu menabung (gadget, liburan, dana darurat)

2. **Gunakan Metode 50/30/20**:
   - 50% untuk kebutuhan pokok
   - 30% untuk keinginan
   - 20% untuk tabungan

3. **Otomatisasi Tabungan** - Sisihkan uang di awal, bukan di akhir bulan

4. **Gunakan Celengan Terpisah** - Pisahkan tabungan berdasarkan tujuan

5. **Catat Pengeluaran** - Ketahui kemana uangmu pergi

Mulai dari nominal kecil dulu, yang penting konsisten! Ada pertanyaan lain tentang menabung?`,

  "anggaran": `Anggaran harian adalah rencana keuangan yang membantu kamu mengatur pengeluaran sehari-hari.

**Cara Membuat Anggaran Harian:**

1. **Hitung Total Uang** - Berapa uang saku atau penghasilan per bulan

2. **Bagi per Hari** - Misal Rp 900.000/bulan = Rp 30.000/hari

3. **Kategorikan Pengeluaran:**
   - Transportasi: Rp 10.000
   - Makan: Rp 15.000
   - Lain-lain: Rp 5.000

4. **Sisihkan untuk Tabungan** - Minimal 10-20% di awal

5. **Evaluasi Setiap Minggu** - Cek apakah sesuai rencana

**Tips:** Gunakan aplikasi pencatat keuangan atau buku catatan sederhana!`,

  "investasi": `Investasi dasar adalah cara mengembangkan uang agar nilainya bertambah seiring waktu.

**Jenis Investasi untuk Pemula:**

1. **Tabungan Berjangka/Deposito**
   - Risiko rendah
   - Cocok untuk pemula
   - Minimal Rp 1 juta

2. **Reksa Dana**
   - Dikelola profesional
   - Bisa mulai dari Rp 10.000
   - Ada berbagai jenis (pasar uang, obligasi, saham)

3. **Emas**
   - Nilai cenderung naik
   - Bisa beli dalam bentuk digital

**Prinsip Penting:**
- Pahami risiko sebelum investasi
- Diversifikasi (jangan taruh semua di satu tempat)
- Investasi jangka panjang lebih aman
- Hanya investasikan uang yang tidak kamu butuhkan dalam waktu dekat

Mau tahu lebih detail tentang salah satu jenis investasi?`,

  "uang saku": `Tips mengatur uang saku dengan bijak:

**1. Catat Semua Pengeluaran**
Tulis setiap pengeluaran, sekecil apapun. Ini membantu kamu tahu kemana uang pergi.

**2. Prioritaskan Kebutuhan**
- Kebutuhan: makan, transportasi, alat sekolah
- Keinginan: jajan, hiburan, gadget

**3. Terapkan Sistem Amplop**
Bagi uang saku ke amplop berbeda:
- Amplop kebutuhan
- Amplop tabungan
- Amplop jajan

**4. Tunggu 24 Jam**
Sebelum beli sesuatu yang mahal, tunggu 24 jam. Kalau masih mau, baru beli.

**5. Cari Penghasilan Tambahan**
- Jual barang tidak terpakai
- Freelance sesuai skill
- Part-time di waktu luang

**6. Reward Diri Sendiri**
Kalau berhasil menabung, boleh sesekali treat yourself!

Semangat mengatur keuanganmu!`,

  "default": `Terima kasih atas pertanyaannya! 

Saya adalah Tutor AI Monedu yang siap membantu kamu belajar tentang literasi keuangan. Saya bisa membantu menjelaskan tentang:

- **Pengelolaan Uang** - Cara mengatur keuangan harian
- **Menabung** - Strategi dan tips menabung efektif  
- **Investasi Dasar** - Pengenalan berbagai jenis investasi
- **Anggaran** - Cara membuat dan mengelola anggaran
- **Tips Keuangan** - Berbagai tips praktis untuk pelajar

Silakan tanyakan topik spesifik yang ingin kamu pelajari, dan saya akan memberikan penjelasan yang mudah dipahami!`
}

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes("nabung") || lowerMessage.includes("menabung") || lowerMessage.includes("saving")) {
    return mockResponses["menabung"]
  }
  if (lowerMessage.includes("anggaran") || lowerMessage.includes("budget") || lowerMessage.includes("harian")) {
    return mockResponses["anggaran"]
  }
  if (lowerMessage.includes("investasi") || lowerMessage.includes("invest") || lowerMessage.includes("saham") || lowerMessage.includes("reksa dana")) {
    return mockResponses["investasi"]
  }
  if (lowerMessage.includes("uang saku") || lowerMessage.includes("saku") || lowerMessage.includes("tips") || lowerMessage.includes("mengatur uang")) {
    return mockResponses["uang saku"]
  }
  
  return mockResponses["default"]
}

export default function TutorAIPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Halo${user?.name ? `, ${user.name}` : ""}! Saya Tutor AI Monedu, asisten virtual yang siap membantu kamu belajar tentang literasi keuangan.\n\nTanyakan apa saja tentang pengelolaan uang, menabung, atau investasi dasar. Saya akan menjelaskan dengan bahasa yang mudah dipahami!`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(input),
      timestamp: new Date()
    }

    setIsTyping(false)
    setMessages(prev => [...prev, aiResponse])
  }

  const handleSuggestedTopic = (topic: string) => {
    setInput(topic)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background pt-20 pb-4 relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 h-[calc(100vh-6rem)] flex flex-col relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-foreground">Tutor AI Monedu</h1>
              <p className="text-xs text-green-500">Online - Siap membantu</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden flex flex-col bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === "assistant" 
                      ? "bg-gradient-to-br from-primary to-accent" 
                      : "bg-gradient-to-br from-blue-500 to-cyan-500"
                  }`}>
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                    <div className={`inline-block p-4 rounded-2xl ${
                      message.role === "assistant"
                        ? "bg-muted/50 text-foreground rounded-tl-sm"
                        : "bg-gradient-to-r from-primary to-accent text-white rounded-tr-sm"
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {message.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-sm p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Topics */}
          {messages.length <= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 pb-2"
            >
              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Topik yang disarankan:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedTopic(topic.text)}
                    className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted text-sm text-foreground rounded-full border border-border/50 hover:border-primary/50 transition-all"
                  >
                    {topic.icon}
                    {topic.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan Anda di sini..."
                className="flex-1 bg-muted/50 border-border/50 focus:border-primary"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-6"
              >
                <Send className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Kirim</span>
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Tutor AI adalah Kecerdasan Buatan dan dapat melakukan kesalahan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
