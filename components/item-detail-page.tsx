"use client"

import type React from "react"

import { useState } from "react"
import {
  Plus,
  ChevronLeft,
  Check,
  Lock,
  Flame,
  DoorClosed,
  Power,
  Zap,
  Home,
  LightbulbIcon,
  Droplet,
  Wind,
  Thermometer,
  Wifi,
  Phone,
  Bell,
  Shield,
  Key,
  X,
} from "lucide-react"
import type { ChecklistItem } from "@/app/page"
import { useAppSettings } from "@/app/page"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface ItemDetailPageProps {
  mode: "add" | "edit"
  initialItem?: ChecklistItem
  onBack: () => void
  onSave: (item: Omit<ChecklistItem, "id" | "isActive" | "lastChecked">) => void
  onDelete?: () => void
}

const iconMap = {
  flame: Flame,
  door: DoorClosed,
  power: Power,
  lock: Lock,
  zap: Zap,
  home: Home,
  lightbulb: LightbulbIcon,
  droplet: Droplet,
  wind: Wind,
  thermometer: Thermometer,
  wifi: Wifi,
  phone: Phone,
  bell: Bell,
  shield: Shield,
  key: Key,
}

export function ItemDetailPage({ mode, initialItem, onBack, onSave, onDelete }: ItemDetailPageProps) {
  const [title, setTitle] = useState(initialItem?.title || "")
  const [description, setDescription] = useState(initialItem?.description || "")
  const [icon, setIcon] = useState(initialItem?.icon || "lock")
  const [iconType, setIconType] = useState<"preset" | "upload">(initialItem?.iconType || "preset")
  const [resetHours, setResetHours] = useState(initialItem?.resetHours || 8)
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { settings } = useAppSettings()
  const t = useTranslation(settings.language)

  const presetIcons = [
    { id: "lock", label: t.icons.lock, Icon: Lock },
    { id: "flame", label: t.icons.flame, Icon: Flame },
    { id: "door", label: t.icons.door, Icon: DoorClosed },
    { id: "power", label: t.icons.power, Icon: Power },
    { id: "zap", label: t.icons.zap, Icon: Zap },
    { id: "home", label: t.icons.home, Icon: Home },
    { id: "lightbulb", label: t.icons.lightbulb, Icon: LightbulbIcon },
    { id: "droplet", label: t.icons.droplet, Icon: Droplet },
    { id: "wind", label: t.icons.wind, Icon: Wind },
    { id: "thermometer", label: t.icons.thermometer, Icon: Thermometer },
    { id: "wifi", label: t.icons.wifi, Icon: Wifi },
    { id: "phone", label: t.icons.phone, Icon: Phone },
    { id: "bell", label: t.icons.bell, Icon: Bell },
    { id: "shield", label: t.icons.shield, Icon: Shield },
    { id: "key", label: t.icons.key, Icon: Key },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setIcon(reader.result as string)
        setIconType("upload")
        setShowIconPicker(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!title.trim()) return
    onSave({ title, description, icon, iconType, resetHours })
  }

  const handleResetIcon = () => {
    setIcon("lock")
    setIconType("preset")
  }

  const IconComponent = iconType === "preset" ? iconMap[icon as keyof typeof iconMap] : null

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/90 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex items-center justify-between z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 text-[#83ABC4] text-foreground" strokeWidth={2.5} />
        </button>

        <h2 className="font-semibold text-foreground text-center flex-1">{t.itemDetail.title}</h2>

        <button
          onClick={handleSubmit}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#83ABC4] active:scale-90 transition-transform"
        >
          <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>
      </div>

      <div className="p-6 px-3 py-3 space-y-4">
        {/* Icon Selector */}
        <div className="dark:bg-[#303035] backdrop-blur-xl py-5 border border-black/5 dark:border-white/10 bg-card px-3 rounded-3xl">
          <label className="block text-sm font-medium text-foreground mb-3">{t.itemDetail.icon}</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowIconPicker(true)}
              className="h-20 rounded-2xl bg-[#83ABC4]/10 flex items-center justify-center active:scale-95 transition-transform w-20"
            >
              {IconComponent ? (
                <IconComponent className="w-10 h-10 text-[#83ABC4]" />
              ) : (
                <img src={icon || "/placeholder.svg"} alt="icon" className="w-16 h-16 rounded-xl object-cover" />
              )}
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="dark:bg-[#303035] backdrop-blur-xl py-5 px-6 border border-black/5 dark:border-white/10 bg-card rounded-3xl">
          <label className="block text-sm font-medium text-foreground mb-3">{t.itemDetail.itemTitle}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.itemDetail.titlePlaceholder}
            className="w-full bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Description Input */}
        <div className="dark:bg-[#303035] backdrop-blur-xl py-5 px-6 border border-black/5 dark:border-white/10 bg-card rounded-3xl">
          <label className="block text-sm font-medium text-foreground mb-3">{t.itemDetail.description}</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.itemDetail.descriptionPlaceholder}
            className="w-full bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Reset Hours */}
        <div className="dark:bg-[#303035] backdrop-blur-xl py-5 px-6 border border-black/5 dark:border-white/10 bg-card rounded-3xl">
          <label className="block text-sm font-medium text-foreground mb-3">{t.itemDetail.resetHours}</label>
          <input
            type="number"
            value={resetHours}
            onChange={(e) => setResetHours(Number(e.target.value))}
            className="w-full bg-transparent border-none outline-none text-base text-foreground"
          />
        </div>

        {/* Delete Button (Edit mode only) */}
        {mode === "edit" && onDelete && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full h-14 bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] rounded-3xl font-semibold active:scale-[0.98] transition-all"
          >
            {t.itemDetail.deleteItem}
          </button>
        )}
      </div>

      {/* Icon Picker Bottom Sheet */}
      {showIconPicker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-t-3xl w-full max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-[#1C1C1E] border-b border-border px-6 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-[#83ABC4]">{t.itemDetail.iconSelection}</h3>
              <button
                onClick={() => setShowIconPicker(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center active:scale-90 transition-transform"
              >
                <X className="w-4 h-4 text-foreground" strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-3">
                <label className="aspect-square rounded-2xl bg-[#83ABC4] flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Plus className="w-8 h-8 text-white" />
                  <span className="text-xs text-white">{t.itemDetail.add}</span>
                </label>

                {presetIcons.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setIcon(preset.id)
                      setIconType("preset")
                      setShowIconPicker(false)
                    }}
                    className="aspect-square rounded-2xl bg-muted hover:bg-muted/80 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <preset.Icon className="w-8 h-8 text-[#83ABC4]" />
                    <span className="text-xs text-muted-foreground">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <h3 className="font-semibold text-lg text-foreground mb-2">{t.itemDetail.deleteConfirmTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.itemDetail.deleteConfirmMessage}</p>
            </div>
            <div className="grid grid-cols-2 border-t border-border">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="h-14 text-[#83ABC4] font-medium border-r border-border"
              >
                {t.itemDetail.cancel}
              </button>
              <button
                onClick={() => {
                  onDelete?.()
                  setShowDeleteConfirm(false)
                }}
                className="h-14 text-[#FF3B30] font-semibold"
              >
                {t.itemDetail.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
