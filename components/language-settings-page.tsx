"use client"

import { useAppSettings } from "@/app/page"
import { ChevronLeft } from "lucide-react"
import { useTranslation } from "@/lib/i18n/useTranslation"
import type { Language } from "@/lib/i18n/types"

interface LanguageSettingsPageProps {
  onBack: () => void
}

export function LanguageSettingsPage({ onBack }: LanguageSettingsPageProps) {
  const { settings, setSettings } = useAppSettings()
  const t = useTranslation(settings.language)

  const languageOptions: { code: Language; label: string }[] = [
    { code: "system", label: t.languageSettings.system },
    { code: "ko", label: t.languageSettings.korean },
    { code: "en", label: t.languageSettings.english },
    { code: "ja", label: t.languageSettings.japanese },
  ]

  return (
    <div className="fixed inset-0 bg-[#F2F2F7] dark:bg-[#222222] z-50 overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-[#F2F2F7]/90 dark:bg-[#222222]/90 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex items-center z-10 bg-background">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center dark:bg-neutral-700 active:scale-90 transition-transform bg-card"
        >
          <ChevronLeft className="w-5 h-5 text-[#83ABC4] text-foreground" strokeWidth={2.5} />
        </button>
        <h2 className="font-semibold text-foreground text-center flex-1 mr-9">{t.languageSettings.title}</h2>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        <h2 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 mb-3 px-2">{t.languageSettings.title}</h2>
        <div className="liquid-glass rounded-3xl overflow-hidden">
          <div className="p-2 space-y-1">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() =>
                  setSettings({
                    ...settings,
                    language: lang.code,
                  })
                }
                className="w-full px-4 py-3 flex items-center justify-between rounded-2xl active:bg-black/5 dark:active:bg-white/5 transition-colors"
              >
                <span className="text-base text-foreground">{lang.label}</span>
                {settings.language === lang.code && (
                  <svg className="w-5 h-5 text-[#83ABC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
