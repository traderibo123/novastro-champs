import { useState } from 'react'
import ChampionCard from '../components/ChampionCard'
import { fetchAllRankings } from '../utils/api'

export default function Home() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) return
    const rankings = await fetchAllRankings(username)
    setData(rankings)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      {!data ? (
        <>
          {/* Başlık */}
          <h1 className="text-4xl font-bold mb-4 text-center">
            👑 Novastro Champion Card 👑
          </h1>

          {/* Kullanıcı adı formu */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
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

          {/* Alt logo */}
          <div className="mt-10">
            <img
              src="/novastro-logo.png"
              alt="Novastro Logo"
              className="mx-auto w-32 opacity-80"
            />
          </div>
        </>
      ) : (
        <ChampionCard username={username} data={data} />
      )}
    </main>
  )
}
