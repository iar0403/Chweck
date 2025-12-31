"use client"

import type * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-[#83ABC4] data-[state=unchecked]:bg-[#E5E5EA] dark:data-[state=unchecked]:bg-[#3A3A3C] inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full border-none shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={
          "bg-white pointer-events-none block size-[27px] rounded-full shadow-md ring-0 transition-transform data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px]"
        }
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
