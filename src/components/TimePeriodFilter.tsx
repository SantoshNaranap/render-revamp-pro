import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type TimePeriod = 'day' | 'week' | 'month' | 'year'

interface TimePeriodFilterProps {
  value: TimePeriod
  onChange: (period: TimePeriod) => void
}

const periodLabels = {
  day: 'Daily',
  week: 'Weekly', 
  month: 'Monthly',
  year: 'Yearly'
}

const periodDescriptions = {
  day: 'Last 24 hours',
  week: 'Last 7 days',
  month: 'Last 30 days', 
  year: 'Last 12 months'
}

export function TimePeriodFilter({ value, onChange }: TimePeriodFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "gap-2 bg-background/60 hover:bg-background border-border/60",
            "min-w-[140px] justify-between"
          )}
        >
          <>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{periodDescriptions[value]}</span>
            </div>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </>
        </Button>
      </SelectTrigger>
      <SelectContent align="end" className="w-[180px]">
        {Object.entries(periodLabels).map(([period, label]) => (
          <SelectItem 
            key={period} 
            value={period}
            className="cursor-pointer"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">
                {periodDescriptions[period as TimePeriod]}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}