"use client"

import { motion } from "framer-motion"
import { FlipPanelProps } from "./types"

export function FlipPanel({ digit, isTop, isFlipping }: FlipPanelProps) {
  const variants = {
    initial: isTop ? { rotateX: -90 } : { rotateX: 90 },
    animate: { rotateX: 0 },
    exit: isTop ? { rotateX: 90 } : { rotateX: -90 }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className={`absolute inset-x-0 ${
        isTop ? "top-0 h-1/2" : "bottom-0 h-1/2"
      } flex ${
        isTop ? "items-end" : "items-start"
      } justify-center bg-gradient-to-b ${
        isTop ? "from-gray-700 to-gray-800" : "from-gray-900 to-gray-800"
      } ${isTop ? "origin-bottom" : "origin-top"}`}
      style={{ backfaceVisibility: "hidden" }}
    >
      <span 
        className={`text-sm font-bold text-orange-500 ${
          isTop ? "mb-1" : "mt-1"
        }`}
      >
        {digit.toString().padStart(2, "0")}
      </span>
    </motion.div>
  )
}