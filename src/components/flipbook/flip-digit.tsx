"use client"

import * as React from "react"
import { AnimatePresence } from "framer-motion"
import { SingleDigit } from "./single-digit"
import { FlipDigitProps } from "./types"

export function FlipDigit({ digit, label }: FlipDigitProps) {
  const [prevDigit, setPrevDigit] = React.useState(digit)

  React.useEffect(() => {
    if (digit !== prevDigit) {
      const timer = setTimeout(() => {
        setPrevDigit(digit)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [digit, prevDigit])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-4 h-8 bg-black rounded-lg shadow-lg">
        {/* Top Half Static */}
        <div className="absolute top-0 left-0 right-0 h-[8px] flex items-center justify-center 
          bg-neutral-900 text-white text-[6px] font-bold leading-none rounded-t-lg 
          border-b border-neutral-800">
          {digit}
        </div>

        {/* Bottom Half Static */}
        <div className="absolute bottom-0 left-0 right-0 h-[8px] flex items-center justify-center 
          bg-neutral-900 text-white text-[6px] font-bold leading-none rounded-b-lg">
          {digit}
        </div>

        {/* Flipping Parts */}
        <div className="absolute inset-0">
          <AnimatePresence mode="popLayout">
            <SingleDigit key={`top-${digit}`} value={digit} isTop={true} />
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            <SingleDigit key={`bottom-${prevDigit}`} value={prevDigit} isTop={false} />
          </AnimatePresence>
        </div>

        {/* Center Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-200 z-10" />
      </div>
      <span className="text-[10px] font-medium text-neutral-800 uppercase tracking-wider">{label}</span>
    </div>
  )
}