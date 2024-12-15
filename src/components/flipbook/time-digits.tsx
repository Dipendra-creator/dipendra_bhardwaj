"use client"

import { FlipDigit } from "./flip-digit"
import { TimeDigitsProps } from "./types"

export function TimeDigits({ value, label, showLeadingZero = true }: TimeDigitsProps) {
  const firstDigit = Math.floor(value / 10)
  const secondDigit = value % 10

  // Only show first digit if it's non-zero or showLeadingZero is true
  const shouldShowFirstDigit = showLeadingZero || firstDigit > 0

  return (
    <>
      {shouldShowFirstDigit && <FlipDigit digit={firstDigit} label="" />}
      <FlipDigit digit={secondDigit} label={label} />
    </>
  )
}