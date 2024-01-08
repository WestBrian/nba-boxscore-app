import { useEffect, useState, type FC } from 'react'
import { gamePeriodToString } from '@/src/lib/gamePeriodToString'
import { format } from 'date-fns'
import Image from 'next/image'

export interface ComplexGameCardProps {
  dateTime: Date
  isLive: boolean
  isComplete: boolean
  gameTime: string
  gamePeriod: number
  homeTeamImage: string
  awayTeamImage: string
  homeTeamName: string
  awayTeamName: string
  homeTeamRecord: string
  awayTeamRecord: string
  homeTeamScore: string
  awayTeamScore: string
}

export const ComplexGameCard: FC<ComplexGameCardProps> = ({
  gameTime,
  gamePeriod,
  isLive,
  isComplete,
  dateTime,
  homeTeamImage,
  awayTeamImage,
  homeTeamName,
  awayTeamName,
  homeTeamRecord,
  awayTeamRecord,
  homeTeamScore,
  awayTeamScore,
}) => {
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    setFormattedTime(format(dateTime, 'h:mm a'))
  }, [dateTime])

  return (
    <div className="bg-slate-700 p-4 rounded-sm flex flex-col gap-4">
      <span className="min-h-[24px] min-w-[1px] text-sm">
        {isLive
          ? `${gameTime} ${gamePeriodToString(gamePeriod)}`
          : isComplete
            ? 'Final'
            : formattedTime}
      </span>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <Image
              src={homeTeamImage}
              width={50}
              height={50}
              alt={homeTeamName}
            />
            <div className="flex flex-col min-w-[104px]">
              <span>{homeTeamName}</span>
              <span className="text-xs text-slate-400">({homeTeamRecord})</span>
            </div>
          </div>
          <span className="text-2xl font-mono">{homeTeamScore}</span>
        </div>
        <div className="flex flex-row items-center gap-4 text-right">
          <span className="text-2xl font-mono">{awayTeamScore}</span>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col min-w-[104px]">
              <span>{awayTeamName}</span>
              <span className="text-xs text-slate-400">({awayTeamRecord})</span>
            </div>
            <Image
              src={awayTeamImage}
              width={50}
              height={50}
              alt={awayTeamName}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
