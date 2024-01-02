import { Meta, StoryObj } from '@storybook/react'

import { SimpleGameCard } from '../src/components/simple-game-card'

export default {
  component: SimpleGameCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SimpleGameCard>

type Story = StoryObj<typeof SimpleGameCard>

export const Default: Story = {
  args: {
    homeTeam: 'PHI',
    awayTeam: 'CEL',
    homeScore: '102',
    awayScore: '97',
    isLive: false,
    isComplete: false,
    dateTime: new Date(),
    gameTime: '4:02',
    gamePeriod: 4,
  },
}
