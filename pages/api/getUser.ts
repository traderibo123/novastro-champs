
import type { NextApiRequest, NextApiResponse } from 'next'

const DURATIONS = ['7d', '30d', '3m', '6m', '12m']
const API_BASE = 'https://hub.kaito.ai/api/v1/gateway/ai/kol/mindshare/top-leaderboard'
const TOP_N = 100

const TITLES = [
  { max: 20, title: 'RWA Overlord' },
  { max: 50, title: 'Tokenization Grandmaster' },
  { max: 100, title: 'Property Architect' },
  { max: Infinity, title: 'Early Tokenizer' },
]

function getTitle(rank: number | null) {
  if (!rank) return ''
  for (const t of TITLES) {
    if (rank <= t.max) return t.title
  }
  return ''
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username required' })
  }

  const results: Record<string, { rank: number | null, title: string }> = {}

  await Promise.all(DURATIONS.map(async (duration) => {
    const url = `${API_BASE}?duration=${duration}&topic_id=NYT&top_n=${TOP_N}&customized_community=customized&community_yaps=true`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const index = data.findIndex((entry: any) => 
        entry.username.toLowerCase() === username.toLowerCase()
      )
      const rank = index >= 0 ? index + 1 : null
      results[duration] = {
        rank,
        title: getTitle(rank)
      }
    } catch (error) {
      results[duration] = { rank: null, title: '' }
    }
  }))

  res.status(200).json({ username, data: results })
}
