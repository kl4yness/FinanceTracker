export interface StatsCardProps {
  title: string
  value: any
  change: any
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}