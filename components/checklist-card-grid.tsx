"use client"

import { useState, useEffect } from "react"
import { Lock, Flame, DoorClosed, Power, Zap, Home, LightbulbIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { ChecklistItem } from "@/app/page"
import { useAppSettings } from "@/app/page"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface ChecklistCardGridProps {
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

export function ChecklistCardGrid({ item, onCheck, onUncheck }: ChecklistCardGridProps) {
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
        className={`relative overflow-hidden backdrop-blur-xl aspect-square cursor-pointer active:scale-95 transition-all border-none shadow-lg bg-card ${
          needsCheck ? "bg-white dark:bg-[#303035]" : "bg-white/70 dark:bg-[#303035]/70 opacity-70"
        }`}
        onClick={handleCardClick}
      >
      {needsCheck && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
      )}

      {!needsCheck && timeRemaining && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-3xl font-extrabold font-mono tabular-nums text-[#83ABC4] drop-shadow-[0_4px_12px_rgba(131,171,196,0.4)]">
            {timeRemaining}
          </div>
        </div>
      )}

      <div
        className={`p-5 flex flex-col gap-4 h-full transition-opacity duration-300 justify-center ${!needsCheck && timeRemaining ? "opacity-30" : ""}`}
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            needsCheck ? "bg-red-500/10" : "bg-[#83ABC4]/10"
          }`}
        >
          {Icon ? (
            <Icon
              className={`w-8 h-8 stroke-[1.5] ${needsCheck ? "text-red-500 dark:text-red-400" : "text-[#83ABC4]"}`}
              strokeWidth={1.5}
            />
          ) : (
            <img src={item.icon || "/placeholder.svg"} alt={item.title} className="w-10 h-10 rounded-xl object-cover" />
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-bold leading-tight text-base text-foreground">{item.title}</h3>
          {item.description && (
            <p className="text-muted-foreground line-clamp-2 leading-relaxed text-sm">{item.description}</p>
          )}
        </div>
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
