import GameDetail from '@/components/GameDetail'
import { gameMetadata } from '@/lib/games'

export const metadata = gameMetadata('arrows')

export default function ArrowsPage() {
  return <GameDetail slug="arrows" />
}
