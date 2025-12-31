"use client"

import { useState, useEffect } from "react"
import { Check, Lock, Flame, DoorClosed, Power, Zap, Home, LightbulbIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { ChecklistItem } from "@/app/page"
import { useAppSettings } from "@/app/page"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface ChecklistCardProps {
  item: ChecklistItem
  onCheck: (id: string) => void
  onUncheck: (id: string) => void
}

const iconMap = {
  flame: Flame,
  door: DoorClosed,
  power: Power,
  lock: Lock,
  zap: Zap,
  home: Home,
  lightbulb: LightbulbIcon,
}

export function ChecklistCard({ item, onCheck, onUncheck }: ChecklistCardProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [needsCheck, setNeedsCheck] = useState(false)
  const [showUncheckModal, setShowUncheckModal] = useState(false)
  const { settings } = useAppSettings()
  const t = useTranslation(settings.language)

  const Icon = item.iconType === "preset" ? iconMap[item.icon as keyof typeof iconMap] || Lock : null

  useEffect(() => {
    const updateTimer = () => {
      if (!item.lastChecked) {
        setNeedsCheck(true)
        setTimeRemaining("")
        return
      }

      const now = new Date()
      const elapsed = now.getTime() - item.lastChecked.getTime()
      const resetTime = item.resetHours * 60 * 60 * 1000
      const remaining = resetTime - elapsed

      if (remaining <= 0) {
        setNeedsCheck(true)
        setTimeRemaining("")
      } else {
        setNeedsCheck(false)
        const hours = Math.floor(remaining / (60 * 60 * 1000))
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000)
        setTimeRemaining(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        )
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [item.lastChecked, item.resetHours])

  const handleCardClick = () => {
    if (needsCheck) {
      onCheck(item.id)
    } else if (item.lastChecked) {
      // 카운트다운 중인 경우 모달 표시
      setShowUncheckModal(true)
    }
  }

  const handleUncheck = () => {
    onUncheck(item.id)
    setShowUncheckModal(false)
  }

  return (
    <>
      <Card
        className={`relative overflow-hidden border-none transition-all duration-300 liquid-glass ${
          needsCheck
            ? "opacity-100 bg-white/80 dark:bg-[#303035]"
            : "opacity-70 dark:opacity-50 grayscale-[0.3] bg-white/80 dark:bg-[#303035]/70"
        }`}
      >
      {!needsCheck && timeRemaining && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-5xl font-extrabold font-mono tabular-nums text-[#83ABC4] drop-shadow-[0_4px_12px_rgba(131,171,196,0.4)]">
            {timeRemaining}
          </div>
        </div>
      )}

      <div
        className={`py-2 px-3.5 flex items-center gap-4 transition-opacity duration-300 ${!needsCheck && timeRemaining ? "opacity-30" : ""}`}
      >
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            needsCheck ? "bg-red-500/10 dark:bg-red-500/20" : "bg-[#83ABC4]/10 dark:bg-[#83ABC4]/20"
          }`}
        >
          {Icon ? (
            <Icon className={`w-6 h-6 ${needsCheck ? "text-[#FF3B30] dark:text-[#ff453a]" : "text-[#83ABC4]"}`} />
          ) : (
            <img src={item.icon || "/placeholder.svg"} alt={item.title} className="w-8 h-8 rounded-lg object-cover" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-base mb-0.5">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
        </div>

        {/* Check Button */}
        <button
          onClick={handleCardClick}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            needsCheck
              ? "bg-white dark:bg-[#1c1c1e] border-2 border-[#FF3B30] dark:border-[#ff453a] shadow-sm cursor-pointer"
              : "bg-[#83ABC4] border-2 border-[#83ABC4] shadow-md cursor-pointer"
          }`}
        >
          {!needsCheck && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
        </button>
      </div>
    </Card>

    {/* Uncheck Confirmation Modal */}
    {showUncheckModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl w-full max-w-sm overflow-hidden">
          <div className="p-6 text-center">
            <h3 className="font-semibold text-lg text-foreground mb-2">{t.checklist.uncheckConfirmTitle}</h3>
            <p className="text-sm text-muted-foreground">{t.checklist.uncheckConfirmMessage}</p>
          </div>
          <div className="grid grid-cols-2 border-t border-border">
            <button
              onClick={() => setShowUncheckModal(false)}
              className="h-14 text-[#83ABC4] font-medium border-r border-border"
            >
              {t.checklist.uncheckCancel}
            </button>
            <button
              onClick={handleUncheck}
              className="h-14 text-[#FF3B30] font-semibold"
            >
              {t.checklist.uncheckConfirm}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
