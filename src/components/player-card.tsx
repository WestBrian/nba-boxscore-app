import type { FC } from 'react'
import Image from 'next/image'
import { cn } from '@/src/lib/utils'

export interface PlayerCardProps {
  name: string
  image: string
  statDesc: string
  statValue: string
  color: string
}

export const PlayerCard: FC<PlayerCardProps> = ({
  name,
  image,
  statDesc,
  statValue,
  color,
}) => {
  return (
    <div
      className="relative h-[175px] w-[200px] rounded-md"
      style={{ backgroundColor: `#${color}` }}
    >
      <Image
        className="absolute bottom-[80px]"
        src={image}
        alt={name}
        width={200}
        height={200}
      />
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 overflow-x-hidden rounded-b-md bg-slate-800 p-4">
        <div>
          <span className="text-lg font-semibold">{statValue}</span>{' '}
          <span className="uppercase tracking-wider text-slate-400">
            {statDesc}
          </span>
        </div>
        <div
          className={cn('whitespace-nowrap', {
            'text-sm': name.length > 15,
          })}
        >
          {name}
        </div>
      </div>
    </div>
  )
}
