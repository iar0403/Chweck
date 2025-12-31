"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { ChecklistView } from "@/components/checklist-view"
import { ItemsManagementView } from "@/components/items-management-view"
import { SettingsView } from "@/components/settings-view"
import { LanguageSettingsPage } from "@/components/language-settings-page"
import { Layers, Grid3X3, Settings } from "lucide-react"
import type { Language } from "@/lib/i18n/types"
import { useTranslation, getSystemLanguage } from "@/lib/i18n/useTranslation"
import { translations } from "@/lib/i18n/translations"

export interface ChecklistItem {
  id: string
  title: string
  description: string
  icon: string
  iconType: "preset" | "upload"
  isActive: boolean
  lastChecked: Date | null
  resetHours: number
}

type Theme = "light" | "dark" | "system"

interface AppSettings {
  theme: Theme
  language: Language
}

const AppSettingsContext = createContext<{
  settings: AppSettings
  setSettings: (settings: AppSettings) => void
}>({
  settings: { theme: "system", language: "system" },
  setSettings: () => {},
})

export const useAppSettings = () => useContext(AppSettingsContext)

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"checklist" | "items" | "settings">("checklist")
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [settings, setSettings] = useState<AppSettings>({ theme: "system", language: "system" })
  const [showLanguageSettings, setShowLanguageSettings] = useState(false)
  const t = useTranslation(settings.language)

  useEffect(() => {
    const storedSettings = localStorage.getItem("anxietyOffSettings")
    if (storedSettings) {
      const parsed = JSON.parse(storedSettings)
      // Migrate old language settings
      if (parsed.language && !["system", "ko", "en", "ja"].includes(parsed.language)) {
        parsed.language = "system"
      }
      setSettings(parsed)
    } else {
      // Default to system language
      setSettings({ theme: "system", language: "system" })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("anxietyOffSettings", JSON.stringify(settings))

    const applyTheme = () => {
      if (settings.theme === "dark") {
        document.documentElement.classList.add("dark")
      } else if (settings.theme === "light") {
        document.documentElement.classList.remove("dark")
      } else {
        // System theme
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }

    applyTheme()

    // Listen for system theme changes when using system theme
    if (settings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => applyTheme()
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [settings])

  useEffect(() => {
    const stored = localStorage.getItem("anxietyOffItems")
    if (stored) {
      const parsed = JSON.parse(stored)
      setItems(
        parsed.map((item: ChecklistItem) => ({
          ...item,
          lastChecked: item.lastChecked ? new Date(item.lastChecked) : null,
        })),
      )
    } else {
      // Create default items with current language
      const currentLang = settings.language === "system" ? getSystemLanguage() : settings.language
      const t = translations[currentLang]
      
      const defaultItems: ChecklistItem[] = [
        {
          id: "1",
          title: t.defaultItems.gasValve.title,
          description: t.defaultItems.gasValve.description,
          icon: "flame",
          iconType: "preset",
          isActive: true,
          lastChecked: null,
          resetHours: 8,
        },
        {
          id: "2",
          title: t.defaultItems.frontDoor.title,
          description: t.defaultItems.frontDoor.description,
          icon: "lock",
          iconType: "preset",
          isActive: true,
          lastChecked: null,
          resetHours: 8,
        },
        {
          id: "3",
          title: t.defaultItems.windows.title,
          description: t.defaultItems.windows.description,
          icon: "home",
          iconType: "preset",
          isActive: true,
          lastChecked: null,
          resetHours: 12,
        },
        {
          id: "4",
          title: t.defaultItems.electricalPlug.title,
          description: t.defaultItems.electricalPlug.description,
          icon: "zap",
          iconType: "preset",
          isActive: false,
          lastChecked: null,
          resetHours: 24,
        },
        {
          id: "5",
          title: t.defaultItems.lights.title,
          description: t.defaultItems.lights.description,
          icon: "lightbulb",
          iconType: "preset",
          isActive: false,
          lastChecked: null,
          resetHours: 8,
        },
        {
          id: "6",
          title: t.defaultItems.faucet.title,
          description: t.defaultItems.faucet.description,
          icon: "droplet",
          iconType: "preset",
          isActive: true,
          lastChecked: null,
          resetHours: 12,
        },
        {
          id: "7",
          title: t.defaultItems.roomDoor.title,
          description: t.defaultItems.roomDoor.description,
          icon: "door",
          iconType: "preset",
          isActive: false,
          lastChecked: null,
          resetHours: 8,
        },
        {
          id: "8",
          title: t.defaultItems.acHeater.title,
          description: t.defaultItems.acHeater.description,
          icon: "wind",
          iconType: "preset",
          isActive: false,
          lastChecked: null,
          resetHours: 12,
        },
        {
          id: "9",
          title: t.defaultItems.microwave.title,
          description: t.defaultItems.microwave.description,
          icon: "power",
          iconType: "preset",
          isActive: false,
          lastChecked: null,
          resetHours: 24,
        },
        {
          id: "10",
          title: t.defaultItems.balconyDoor.title,
          description: t.defaultItems.balconyDoor.description,
          icon: "lock",
          iconType: "preset",
          isActive: false,
          lastChecked: null,
          resetHours: 12,
        },
      ]
      setItems(defaultItems)
      localStorage.setItem("anxietyOffItems", JSON.stringify(defaultItems))
    }
  }, [settings.language])

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("anxietyOffItems", JSON.stringify(items))
    }
  }, [items])

  return (
    <AppSettingsContext.Provider value={{ settings, setSettings }}>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Content */}
        <div className="h-screen overflow-y-auto transition-opacity duration-200 pb-10">
          {showLanguageSettings ? (
            <LanguageSettingsPage onBack={() => setShowLanguageSettings(false)} />
          ) : activeTab === "checklist" ? (
            <ChecklistView items={items} setItems={setItems} />
          ) : activeTab === "items" ? (
            <ItemsManagementView items={items} setItems={setItems} />
          ) : (
            <SettingsView onOpenLanguageSettings={() => setShowLanguageSettings(true)} />
          )}
        </div>

        <div className="fixed bottom-8 left-6 pointer-events-none z-50">
          <div className="flex items-center gap-2 dark:bg-[#1c1c1e]/80 backdrop-blur-3xl rounded-full px-2 py-2 shadow-2xl border dark:border-white/10 pointer-events-auto transition-all duration-300 bg-background border-card">
            {activeTab === "checklist" ? (
              <div className="flex items-center gap-2 bg-[#83ABC4] dark:bg-[#2c2c2e] rounded-full pl-4 pr-5 py-3 shadow-[#83ABC4]/30 transition-all duration-300 animate-in fade-in zoom-in-95 bg-card shadow-none">
                <Layers className="w-5 h-5 dark:text-[#83ABC4] text-primary" strokeWidth={2.5} />
                <span className="text-sm font-semibold dark:text-[#83ABC4] text-primary">{t.navigation.checklist}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLanguageSettings(false)
                  setActiveTab("checklist")
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Layers className="w-5 h-5 text-neutral-600 dark:text-neutral-300" strokeWidth={2.5} />
              </button>
            )}

            {activeTab === "items" ? (
              <div className="flex items-center gap-2 bg-[#83ABC4] dark:bg-[#2c2c2e] rounded-full pl-4 pr-5 py-3 shadow-[#83ABC4]/30 transition-all duration-300 animate-in fade-in zoom-in-95 bg-card shadow-none">
                <Grid3X3 className="w-5 h-5 dark:text-[#83ABC4] text-primary" strokeWidth={2.5} />
                <span className="text-sm font-semibold dark:text-[#83ABC4] text-primary">{t.navigation.items}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLanguageSettings(false)
                  setActiveTab("items")
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Grid3X3 className="w-5 h-5 text-neutral-600 dark:text-neutral-300" strokeWidth={2.5} />
              </button>
            )}

            {activeTab === "settings" ? (
              <div className="flex items-center gap-2 bg-[#83ABC4] dark:bg-[#2c2c2e] rounded-full pl-4 pr-5 py-3 shadow-[#83ABC4]/30 transition-all duration-300 animate-in fade-in zoom-in-95 bg-card shadow-none">
                <Settings className="w-5 h-5 dark:text-[#83ABC4] text-primary" strokeWidth={2.5} />
                <span className="text-sm font-semibold dark:text-[#83ABC4] text-primary">{t.navigation.settings}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLanguageSettings(false)
                  setActiveTab("settings")
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Settings className="w-5 h-5 text-neutral-600 dark:text-neutral-300" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </AppSettingsContext.Provider>
  )
}
