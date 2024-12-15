"use client"

import { motion } from "framer-motion"
import { SingleDigitProps } from "./types"

export function SingleDigit({ value, isTop = true }: SingleDigitProps) {
  return (
    <motion.div
      initial={{ rotateX: isTop ? -90 : 90 }}
      animate={{ rotateX: 0 }}
      exit={{ rotateX: isTop ? 90 : -90 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      className={`absolute inset-0 flex items-center justify-center 
        ${isTop ? "origin-bottom" : "origin-top"}
        bg-white text-black text-[10px] font-bold leading-none
        ${isTop ? "rounded-t-lg" : "rounded-b-lg"}`}
      style={{ backfaceVisibility: "hidden" }}
    >
      {value}
    </motion.div>
  )
}