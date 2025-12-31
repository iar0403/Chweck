export type Language = "system" | "ko" | "en" | "ja"

export type SupportedLanguage = "ko" | "en" | "ja"

export interface Translations {
  // Language Settings
  languageSettings: {
    title: string
    system: string
    korean: string
    english: string
    japanese: string
  }
  
  // Main Navigation
  navigation: {
    checklist: string
    items: string
    settings: string
  }
  
  // Checklist View
  checklist: {
    all: string
    unchecked: string
    viewOptions: string
    grid: string
    list: string
    noActiveItems: string
    allChecked: string
    activateItemsHint: string
    allCheckedMessage: string
    uncheckConfirmTitle: string
    uncheckConfirmMessage: string
    uncheckCancel: string
    uncheckConfirm: string
  }
  
  // Items Management
  items: {
    title: string
    noItems: string
    addItemHint: string
  }
  
  // Settings
  settings: {
    title: string
    theme: string
    light: string
    dark: string
    systemTheme: string
    appLanguage: string
    system: string
    version: string
  }
  
  // Item Detail
  itemDetail: {
    title: string
    icon: string
    itemTitle: string
    description: string
    resetHours: string
    deleteItem: string
    iconSelection: string
    add: string
    deleteConfirmTitle: string
    deleteConfirmMessage: string
    cancel: string
    delete: string
    titlePlaceholder: string
    descriptionPlaceholder: string
  }
  
  // Icons
  icons: {
    lock: string
    flame: string
    door: string
    power: string
    zap: string
    home: string
    lightbulb: string
    droplet: string
    wind: string
    thermometer: string
    wifi: string
    phone: string
    bell: string
    shield: string
    key: string
  }
  
  // Default Items
  defaultItems: {
    gasValve: {
      title: string
      description: string
    }
    frontDoor: {
      title: string
      description: string
    }
    windows: {
      title: string
      description: string
    }
    electricalPlug: {
      title: string
      description: string
    }
    lights: {
      title: string
      description: string
    }
    faucet: {
      title: string
      description: string
    }
    roomDoor: {
      title: string
      description: string
    }
    acHeater: {
      title: string
      description: string
    }
    microwave: {
      title: string
      description: string
    }
    balconyDoor: {
      title: string
      description: string
    }
  }
}

