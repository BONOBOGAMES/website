import GameDetail from '@/components/GameDetail'
import { gameMetadata } from '@/lib/games'

export const metadata = gameMetadata('chirpy')

export default function ChirpyPage() {
  return <GameDetail slug="chirpy" />
}
