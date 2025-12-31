import { supabase } from "./client"

const BUCKET_NAME = "item-icons"

/**
 * Upload an icon image to Supabase Storage
 * @param file - File object to upload
 * @param userId - User ID
 * @param itemId - Item ID (optional, for updating existing item)
 * @returns URL of the uploaded image
 */
export async function uploadIconImage(
  file: File,
  userId: string,
  itemId?: string
): Promise<string> {
  if (!supabase) {
    throw new Error("Supabase is not configured")
  }

  const fileExt = file.name.split(".").pop()
  const fileName = itemId
    ? `${userId}/${itemId}.${fileExt}`
    : `${userId}/${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    })

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`)
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

  return publicUrl
}

/**
 * Delete an icon image from Supabase Storage
 * @param filePath - Path to the file in storage
 */
export async function deleteIconImage(filePath: string): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase is not configured")
  }

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath])

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`)
  }
}

/**
 * Get public URL for an icon image
 * @param filePath - Path to the file in storage
 * @returns Public URL
 */
export function getIconImageUrl(filePath: string): string {
  if (!supabase) {
    throw new Error("Supabase is not configured")
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
  return data.publicUrl
}


