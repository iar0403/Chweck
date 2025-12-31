"use client"

import { useMemo } from "react"
import { translations } from "./translations"
import type { Translations, SupportedLanguage, Language } from "./types"

export function useTranslation(language: Language): Translations {
  return useMemo(() => {
    let actualLanguage: SupportedLanguage = "ko"

    if (language === "system") {
      // Detect system language
      if (typeof window !== "undefined") {
        const systemLang = navigator.language || navigator.languages?.[0] || "ko"
        
        if (systemLang.startsWith("ja")) {
          actualLanguage = "ja"
        } else if (systemLang.startsWith("en")) {
          actualLanguage = "en"
        } else if (systemLang.startsWith("ko")) {
          actualLanguage = "ko"
        } else {
          // Default to English for other languages
          actualLanguage = "en"
        }
      }
    } else {
      actualLanguage = language
    }

    return translations[actualLanguage]
  }, [language])
}

export function getSystemLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "ko"
  
  const systemLang = navigator.language || navigator.languages?.[0] || "ko"
  
  if (systemLang.startsWith("ja")) {
    return "ja"
  } else if (systemLang.startsWith("en")) {
    return "en"
  } else if (systemLang.startsWith("ko")) {
    return "ko"
  }
  
  return "en"
}


