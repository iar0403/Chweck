"use client"

import { useState } from "react"
import type { ChecklistItem } from "@/app/page"
import { ChecklistCard } from "@/components/checklist-card"
import { ChecklistCardGrid } from "@/components/checklist-card-grid"
import { Check, Grid2X2, List, MoreVertical } from "lucide-react"
import { useAppSettings } from "@/app/page"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { playCheckFeedback, playUncheckFeedback } from "@/lib/haptics"

interface ChecklistViewProps {
  items: ChecklistItem[]
  setItems: (items: ChecklistItem[]) => void
}

export function ChecklistView({ items, setItems }: ChecklistViewProps) {
  const [filter, setFilter] = useState<"all" | "unchecked">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showDropdown, setShowDropdown] = useState(false)
  const { settings } = useAppSettings()
  const t = useTranslation(settings.language)

  const activeItems = items.filter((item) => item.isActive)

  const filteredItems =
    filter === "all"
      ? activeItems
      : activeItems.filter((item) => {
          if (!item.lastChecked) return true
          const now = new Date()
          const elapsed = now.getTime() - item.lastChecked.getTime()
          const resetTime = item.resetHours * 60 * 60 * 1000
          return elapsed >= resetTime
        })

  const handleCheck = async (id: string) => {
    // 햅틱 진동 및 사운드 재생
    await playCheckFeedback()

    setItems(
      items.map((item) => {
        if (item.id !== id) return item

        // Calculate if item needs check
        const needsCheck =
          !item.lastChecked ||
          (() => {
            const now = new Date()
            const elapsed = now.getTime() - item.lastChecked!.getTime()
            const resetTime = item.resetHours * 60 * 60 * 1000
            return elapsed >= resetTime
          })()

        // Only update lastChecked if item needs check
        if (needsCheck) {
          return { ...item, lastChecked: new Date() }
        }

        // If already checked and counting down, do nothing
        return item
      }),
    )
  }

  const handleUncheck = async (id: string) => {
    // 체크 취소 시 경고 햅틱 피드백
    await playUncheckFeedback()

    setItems(
      items.map((item) => {
        if (item.id !== id) return item
        return { ...item, lastChecked: null }
      }),
    )
  }

  return (
    <div className="min-h-full">
      <div className="px-6 pt-16 pb-0 pl-3 pr-3">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`text-[36px] font-bold transition-colors duration-200 ${
                filter === "all" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t.checklist.all}
            </button>
            <button
              onClick={() => setFilter("unchecked")}
              className={`text-[36px] font-bold transition-colors duration-200 ${
                filter === "unchecked" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t.checklist.unchecked}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full dark:bg-[#303035] backdrop-blur-md flex items-center justify-center hover:bg-white dark:hover:bg-[#404040] transition-all shadow-sm border border-black/5 dark:border-white/10 bg-card"
            >
              <MoreVertical className="w-5 h-5 text-foreground" />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <div className="absolute right-0 mt-2 w-48 dark:bg-[#2c2c2e]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 z-50 overflow-hidden bg-muted">
                  <div className="p-2 bg-card border-none">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">{t.checklist.viewOptions}</div>
                    <button
                      onClick={() => {
                        setViewMode("grid")
                        setShowDropdown(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        viewMode === "grid"
                          ? "bg-[#83ABC4]/10 text-[#83ABC4]"
                          : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <Grid2X2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.checklist.grid}</span>
                      {viewMode === "grid" && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                    <button
                      onClick={() => {
                        setViewMode("list")
                        setShowDropdown(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        viewMode === "list"
                          ? "bg-[#83ABC4]/10 text-[#83ABC4]"
                          : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <List className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.checklist.list}</span>
                      {viewMode === "list" && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pr-2.5 pl-2.5 pb-0 my-0">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/80 dark:bg-[#303035] backdrop-blur-sm flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">
              {filter === "all" ? t.checklist.noActiveItems : t.checklist.allChecked}
            </p>
            <p className="text-sm text-muted-foreground">
              {filter === "all" ? t.checklist.activateItemsHint : t.checklist.allCheckedMessage}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-1">
            {filteredItems.map((item) => (
              <ChecklistCardGrid key={item.id} item={item} onCheck={handleCheck} onUncheck={handleUncheck} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <ChecklistCard key={item.id} item={item} onCheck={handleCheck} onUncheck={handleUncheck} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
