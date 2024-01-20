'use client'

import { useState, type FC, useEffect } from 'react'
import { nbaTeams } from '@/src/lib/nba-data'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { gamePeriodToString } from '@/src/lib/gamePeriodToString'

interface TeamRowProps {
  teamName: string
  teamScore: string
}

const TeamRow: FC<TeamRowProps> = ({ teamName, teamScore }) => {
  const team = nbaTeams.find((team) => team.abbreviation === teamName)

  return (
    <div className="flex flex-row items-center justify-between font-mono font-semibold tracking-wide">
      <div className="flex flex-row gap-2">
        <div
          className="w-[4px] rounded-full"
          style={{ backgroundColor: team?.colors.at(0) || '#ffffff' }}
        />
        <span>{teamName}</span>
      </div>
      <span className="text-right">{teamScore}</span>
    </div>
  )
}

export interface SimpleGameCardProps {
  homeTeam: string
  awayTeam: string
  homeScore: string
  awayScore: string
  dateTime: Date
  isLive: boolean
  isComplete: boolean
  gameTime: string
  gamePeriod: number
}

export const SimpleGameCard: FC<SimpleGameCardProps> = ({
  gameTime,
  gamePeriod,
  homeTeam,
  homeScore,
  awayTeam,
  awayScore,
  isLive,
  isComplete,
  dateTime,
}) => {
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    setFormattedTime(format(dateTime, 'h:mm a'))
  }, [dateTime])

  return (
    <div className="flex w-[100px] cursor-pointer flex-col gap-1 rounded-sm bg-slate-700 p-1 text-xs text-white hover:bg-slate-800">
      <div className="flex flex-row items-center justify-between">
        <span className="min-h-[20px] min-w-[1px]">
          {isLive
            ? `${gameTime} ${gamePeriodToString(gamePeriod)}`
            : isComplete
              ? 'Final'
              : formattedTime}
        </span>
        {isLive ? (
          <motion.div
            className="h-2 w-2 rounded-full"
            initial={{ backgroundColor: '#EF4444' }}
            animate={{ backgroundColor: '#B91C1C' }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: 'reverse',
            }}
          />
        ) : (
          <div />
        )}
      </div>
      <TeamRow teamName={homeTeam} teamScore={homeScore} />
      <TeamRow teamName={awayTeam} teamScore={awayScore} />
    </div>
  )
}
