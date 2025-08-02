
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
    <main className="min-h-screen bg-[#0c1b2a] text-white p-6 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-6">Novastro Champion Card</h1>

      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="p-2 rounded text-black"
        />
        <button
          onClick={fetchData}
          className="ml-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded"
        >
          Generate
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {data && <ChampionCard username={username} data={data} />}
    </main>
  )
}
