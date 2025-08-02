export async function fetchAllRankings(username: string) {
  const durations = ['7d', '30d', '3m', '6m', '12m']
  const topicId = 'NYT'
  const baseUrl = 'https://hub.kaito.ai/api/v1/gateway/ai/kol/mindshare/top-leaderboard'

  const cleanedUsername = username.trim().toLowerCase()

  const allData = await Promise.all(
    durations.map(async (duration) => {
      try {
        const url = `${baseUrl}?duration=${duration}&topic_id=${topicId}&top_n=100&customized_community=customized&community_yaps=true`
        const res = await fetch(url)

        if (!res.ok) {
          console.error(`❌ API error for ${duration}: ${res.status}`)
          return [duration, { rank: null, title: '' }]
        }

        const json = await res.json()

        // Güvenlik kontrolü
        if (!json?.data || !Array.isArray(json.data)) {
          console.error(`⚠️ Unexpected response for ${duration}:`, json)
          return [duration, { rank: null, title: '' }]
        }

        const index = json.data.findIndex((entry: any) =>
          entry.twitter_handle?.trim().toLowerCase() === cleanedUsername
        )

        if (index === -1) {
          console.log(`ℹ️ User not found in ${duration} rankings: @${cleanedUsername}`)
          return [duration, { rank: null, title: '' }]
        }

        const rank = index + 1
        const title =
          rank <= 20
            ? 'Tokenization Wizard'
            : rank <= 50
            ? 'Tokenization Grandmaster'
            : rank <= 100
            ? 'Tokenization Master'
            : 'Early Tokenizer'

        console.log(`✅ ${duration}: @${username} is #${rank} → ${title}`)

        return [duration, { rank, title }]
      } catch (error) {
        console.error(`🚨 Error fetching for ${duration}:`, error)
        return [duration, { rank: null, title: '' }]
      }
    })
  )

  return Object.fromEntries(allData)
}
