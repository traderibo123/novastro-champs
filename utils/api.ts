export async function fetchAllRankings(username: string) {
  const durations = ['7d', '30d', '3m', '6m', '12m']
  const topicId = 'NYT'
  const baseUrl = 'https://hub.kaito.ai/api/v1/gateway/ai/kol/mindshare/top-leaderboard'

  const allData = await Promise.all(
    durations.map(async (duration) => {
      try {
        const url = `${baseUrl}?duration=${duration}&topic_id=${topicId}&top_n=100&customized_community=customized&community_yaps=true`
        console.log('Fetching from:', url)

        const res = await fetch(url)
        const json = await res.json()

        // Eğer json.data mevcut değilse hata mesajı verip atla
        if (!json || !json.data || !Array.isArray(json.data)) {
          console.error(`❌ [${duration}] No data array in response`, json)
          return [duration, { rank: null, title: '' }]
        }

        const index = json.data.findIndex(
          (entry: any) =>
            entry?.twitter_handle?.toLowerCase() === username.toLowerCase()
        )

        if (index === -1) {
          console.log(`ℹ️ [${duration}] ${username} not found in list`)
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

        return [duration, { rank, title }]
      } catch (error) {
        console.error(`🔥 Error fetching for ${duration}:`, error)
        return [duration, { rank: null, title: '' }]
      }
    })
  )

  return Object.fromEntries(allData)
}
