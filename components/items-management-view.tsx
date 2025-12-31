"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { ChecklistItem } from "@/app/page"
import { ItemCard } from "@/components/item-card"
import { ItemDetailPage } from "@/components/item-detail-page"
import { useAppSettings } from "@/app/page"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface ItemsManagementViewProps {
  items: ChecklistItem[]
  setItems: (items: ChecklistItem[]) => void
}

export function ItemsManagementView({ items, setItems }: ItemsManagementViewProps) {
  const [showAddPage, setShowAddPage] = useState(false)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const { settings } = useAppSettings()
  const t = useTranslation(settings.language)

  const handleToggle = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)))
  }

  const handleEdit = (id: string) => {
    setEditingItemId(id)
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  if (showAddPage || editingItemId) {
    const editingItem = editingItemId ? items.find((item) => item.id === editingItemId) : null

    return (
      <div className="fixed inset-0 bg-background z-[100]">
        <ItemDetailPage
          mode={showAddPage ? "add" : "edit"}
          initialItem={editingItem || undefined}
          onBack={() => {
            setShowAddPage(false)
            setEditingItemId(null)
          }}
          onSave={(data) => {
            if (showAddPage) {
              setItems([...items, { ...data, id: Date.now().toString(), isActive: false, lastChecked: null }])
            } else if (editingItemId) {
              setItems(items.map((item) => (item.id === editingItemId ? { ...item, ...data } : item)))
            }
            setShowAddPage(false)
            setEditingItemId(null)
          }}
          onDelete={
            editingItemId
              ? () => {
                  handleDelete(editingItemId)
                  setEditingItemId(null)
                }
              : undefined
          }
        />
      </div>
    )
  }

  return (
    <div className="min-h-full relative">
      <div className="px-6 pt-16 pb-4 flex items-center justify-between pl-3 pr-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{t.items.title}</h1>
        <button
          onClick={() => setShowAddPage(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 bg-[#83ABC4]/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <Plus className="w-6 h-6 text-[#83ABC4]" strokeWidth={3} />
        </button>
      </div>

      <div className="pl-3 pr-3 pb-6 grid grid-cols-1 gap-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-24 h-24 rounded-full liquid-glass flex items-center justify-center mb-6">
              <Plus className="w-12 h-12 text-neutral-400" />
            </div>
            <p className="text-xl font-bold text-foreground mb-2">{t.items.noItems}</p>
            <p className="text-neutral-500">{t.items.addItemHint}</p>
          </div>
        ) : (
          items.map((item) => (
            <ItemCard key={item.id} item={item} onToggle={handleToggle} onEdit={handleEdit} />
          ))
        )}
      </div>
    </div>
  )
}
