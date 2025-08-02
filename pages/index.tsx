import { useState, useEffect } from 'react'
import ChampionCard from '../components/ChampionCard'
import { fetchAllRankings } from '../utils/api'

export default function Home() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('novastro_username')
    if (saved) setUsername(saved)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) return
    localStorage.setItem('novastro_username', username)
    setLoading(true)
    const rankings = await fetchAllRankings(username)
    setData(rankings)
    setLoading(false)
  }

  return (
    <main
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('/galaxy_bg.jpg')" }}
    >
      {!data ? (
        <>
          <h1 className="text-5xl font-extrabold mb-6 text-center tracking-wide text-cyan-300">
            👑 Novastro Champion Card 👑
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-full max-w-md">
            <input
              type="text"
              placeholder="enter X username (e.g. traderibo123)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded text-black w-72 text-center"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold"
            >
              Generate Card
            </button>
          </form>

          <div className="mt-10">
            <img
              src="/novastro-logo.png"
              alt="Novastro Logo"
              className="mx-auto w-32 opacity-90"
            />
          </div>
        </>
      ) : (
        <ChampionCard username={username} data={data} />
      )}
    </main>
  )
}
