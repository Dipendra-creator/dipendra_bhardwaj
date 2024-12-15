"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface FlipDigitProps {
  digit: number
  label: string
}

const FlipDigit: React.FC<FlipDigitProps> = ({ digit, label }) => {
  const [prevDigit, setPrevDigit] = React.useState(digit)

  React.useEffect(() => {
    setPrevDigit(digit)
  }, [digit])

  return (
    <div className="relative w-24 h-32 mx-1">
      <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
        {/* Top Half */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={digit}
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            exit={{ rotateX: 90 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="absolute inset-x-0 top-0 h-1/2 flex items-end justify-center bg-gradient-to-b from-gray-700 to-gray-800 origin-bottom"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-sm font-bold text-orange-500 mb-1">
              {digit.toString().padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Half */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={prevDigit}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            exit={{ rotateX: -90 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 h-1/2 flex items-start justify-center bg-gradient-to-b from-gray-900 to-gray-800 origin-top"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-sm font-bold text-orange-500 mt-1">
              {prevDigit.toString().padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Divider Line */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black z-10"></div>
      </div>

      {/* Label */}
      <div className="absolute -bottom-6 left-0 w-full text-center">
        <span className="text-sm font-medium text-gray-400">{label}</span>
      </div>
    </div>
  )
}

export function FlipbookTime() {
  const [time, setTime] = React.useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="flex justify-center items-end space-x-4 mb-8">
        <FlipDigit digit={time.hours} label="HOURS" />
        <div className="text-sm font-bold text-orange-500 mb-4">:</div>
        <FlipDigit digit={time.minutes} label="MINUTES" />
        <div className="text-sm font-bold text-orange-500 mb-4">:</div>
        <FlipDigit digit={time.seconds} label="SECONDS" />
      </div>
    </Card>
  )
}