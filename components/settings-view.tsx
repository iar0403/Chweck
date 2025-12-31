"use client"
import { useAppSettings } from "@/app/page"
import { Switch } from "@/components/ui/switch"
import { ChevronRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { translations } from "@/lib/i18n/translations"

interface SettingsViewProps {
  onOpenLanguageSettings: () => void
}

export function SettingsView({ onOpenLanguageSettings }: SettingsViewProps) {
  const { settings, setSettings } = useAppSettings()
  const t = useTranslation(settings.language)

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setSettings({ ...settings, theme })
  }

  const getLanguageDisplayName = () => {
    if (settings.language === "system") {
      return t.languageSettings.system
    } else {
      const langT = translations[settings.language]
      if (settings.language === "ko") return langT.languageSettings.korean
      if (settings.language === "en") return langT.languageSettings.english
      if (settings.language === "ja") return langT.languageSettings.japanese
      return t.languageSettings.system
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pb-0">
      <div className="px-6 pt-16 pb-6 pl-3 pr-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-8">{t.settings.title}</h1>

        {/* Theme Section */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 mb-3 px-2">{t.settings.theme}</h2>
          <div className="bg-card rounded-3xl overflow-hidden shadow-lg backdrop-blur-xl border border-white/20 dark:border-white/5">
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Light Theme */}
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${
                    settings.theme === "light" ? "border-[#83ABC4]" : "border-border"
                  }`}
                >
                  <div className="w-full h-full bg-white p-3 flex flex-col">
                    <div className="flex-1 bg-[#F2F2F7] rounded-xl" />
                    <p className="text-xs font-medium text-black mt-2">{t.settings.light}</p>
                  </div>
                  {settings.theme === "light" && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#83ABC4] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Dark Theme */}
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${
                    settings.theme === "dark" ? "border-[#83ABC4]" : "border-border"
                  }`}
                >
                  <div className="w-full h-full bg-[#222222] p-3 flex flex-col">
                    <div className="flex-1 bg-[#404040] rounded-xl" />
                    <p className="text-xs font-medium text-white mt-2">{t.settings.dark}</p>
                  </div>
                  {settings.theme === "dark" && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#83ABC4] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              {/* System Theme Toggle */}
              <div className="flex items-center justify-between py-3 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-white to-black" />
                  <span className="text-base text-foreground">{t.settings.systemTheme}</span>
                </div>
                <Switch
                  checked={settings.theme === "system"}
                  onCheckedChange={(checked) => handleThemeChange(checked ? "system" : "light")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 mb-3 px-2">{t.settings.appLanguage}</h2>
          <div className="bg-card rounded-3xl overflow-hidden shadow-lg backdrop-blur-xl border border-white/20 dark:border-white/5">
            <button
              onClick={onOpenLanguageSettings}
              className="w-full px-6 py-4 flex items-center justify-between active:bg-black/5 dark:active:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                </div>
                <span className="text-base text-foreground">{getLanguageDisplayName()}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="text-center mt-8 mb-8">
          <p className="text-xs text-muted-foreground/40 dark:text-muted-foreground/30">{t.settings.version}</p>
        </div>
      </div>
    </div>
  )
}
