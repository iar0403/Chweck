"use client"

import {
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
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import type { ChecklistItem } from "@/app/page"

interface ItemCardProps {
  item: ChecklistItem
  onToggle: (id: string) => void
  onEdit: (id: string) => void
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

export function ItemCard({ item, onToggle, onEdit }: ItemCardProps) {
  const Icon = item.iconType === "preset" ? iconMap[item.icon as keyof typeof iconMap] || Lock : null

  return (
    <Card
      onClick={() => onEdit(item.id)}
      className="relative overflow-hidden transition-all duration-300 cursor-pointer active:scale-[0.98] dark:bg-[#303035] backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-md rounded-[2000px] bg-card"
    >
      <div className="flex items-center gap-4 px-3.5 py-3.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            item.isActive ? "bg-[#83ABC4]/15 dark:bg-[#83ABC4]/20" : "bg-neutral-200 dark:bg-neutral-700"
          }`}
        >
          {Icon ? (
            <Icon
              className={`w-5 h-5 ${item.isActive ? "text-[#83ABC4]" : "text-neutral-500 dark:text-neutral-400"}`}
            />
          ) : (
            <img src={item.icon || "/placeholder.svg"} alt={item.title} className="w-8 h-8 rounded-full object-cover" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-sm tracking-tight ${item.isActive ? "text-foreground" : "text-muted-foreground"}`}
          >
            {item.title}
          </h3>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="scale-90">
          <Switch checked={item.isActive} onCheckedChange={() => onToggle(item.id)} />
        </div>
      </div>
    </Card>
  )
}
