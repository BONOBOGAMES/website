import GameDetail from '@/components/GameDetail'
import { gameMetadata } from '@/lib/games'

export const metadata = gameMetadata('pieceful')

export default function PiecefulPage() {
  return <GameDetail slug="pieceful" />
}
