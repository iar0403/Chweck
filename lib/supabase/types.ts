export interface Database {
  public: {
    Tables: {
      checklist_items: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          icon: string
          icon_type: "preset" | "upload"
          icon_url: string | null
          is_active: boolean
          last_checked: string | null
          reset_hours: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          icon: string
          icon_type: "preset" | "upload"
          icon_url?: string | null
          is_active?: boolean
          last_checked?: string | null
          reset_hours?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          icon?: string
          icon_type?: "preset" | "upload"
          icon_url?: string | null
          is_active?: boolean
          last_checked?: string | null
          reset_hours?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme: "light" | "dark" | "system"
          language: "system" | "ko" | "en" | "ja"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: "light" | "dark" | "system"
          language?: "system" | "ko" | "en" | "ja"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: "light" | "dark" | "system"
          language?: "system" | "ko" | "en" | "ja"
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}


