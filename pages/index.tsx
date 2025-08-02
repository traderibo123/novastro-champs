import { useState } from 'react'
import ChampionCard from '../components/ChampionCard'

export default function Home() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/getUser?username=${username}`)
      const json = await res.json()
      setData(json.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-10">
      <h1 className="text-4xl font-bold mb-2 text-cyan-300 tracking-wide">
        🚀 Novastro Champion Card
      </h1>
      <p className="mb-6 text-gray-300 text-sm">Enter your username to generate your leaderboard card</p>

      <div className="flex items-center space-x-2 mb-8">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="text-sm w-60"
        />
        <button
          onClick={fetchData}
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded text-white font-semibold"
        >
          Generate
        </button>
      </div>

      {loading && <p className="text-cyan-400">Loading...</p>}

      {data && <ChampionCard username={username} data={data} />}
    </main>
  )
}
