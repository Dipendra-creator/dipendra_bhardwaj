"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { TimeDigits } from "./time-digits"

import { TimeUnit, FlipbookTimeProps } from "./types"
import {calculateTimeUnits} from "@/lib/utils";

export function FlipbookTime({ startDate }: FlipbookTimeProps) {
  const [time, setTime] = React.useState<TimeUnit>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  React.useEffect(() => {
    const updateTime = () => {
      if (startDate) {
        setTime(calculateTimeUnits(startDate))
      } else {
        const now = new Date()
        setTime({
          days: 0,
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds()
        })
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [startDate])

  const Separator = () => (
    <div className="text-sm font-bold text-black mb-4 ">:</div>
  )

  return (
    <Card className="w-full mt-4 border-neutral-100">
      <div className="flex flex-wrap justify-center items-end gap-2">
        {/* Days counter - only show if there are days to count */}
        {time.days > 0 && (
          <>
            <TimeDigits 
              value={time.days} 
              label="Days" 
              showLeadingZero={false} 
            />
            <Separator />
          </>
        )}
        
        {/* Hours */}
        <TimeDigits value={time.hours} label="Hrs" />
        <Separator />
        
        {/* Minutes */}
        <TimeDigits value={time.minutes} label="Mins" />
        <Separator />
        
        {/* Seconds */}
        <TimeDigits value={time.seconds} label="Secs" />
      </div>
    </Card>
  )
}