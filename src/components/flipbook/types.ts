export interface TimeUnit {
  days: number
  hours: number
  minutes: number
  seconds: number
}


export interface FlipPanelProps {
  digit: number;
  isTop: boolean;
  isFlipping: boolean;
}


export interface FlipDigitProps {
  digit: number
  label: string
}

export interface SingleDigitProps {
  value: number
  isTop?: boolean
}

export interface FlipbookTimeProps {
  startDate?: Date
}

export interface TimeDigitsProps {
  value: number
  label: string
  showLeadingZero?: boolean
}