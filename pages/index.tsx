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
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white flex flex-col items-center justify-center p-6 font-sans">

      {!data ? (
        <>
          {/* Başlık */}
          <h1 className="text-5xl font-extrabold mb-6 text-center tracking-wide">
            👑 <span className="text-cyan-400">Novastro Champion Card</span> 👑
          </h1>

          {/* Kullanıcı adı formu */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-full max-w-md">
            <input
              type="text"
              placeholder="enter X username (e.g. traderibo123)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-5 py-3 rounded text-black w-full text-center text-lg shadow focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold text-lg transition-all shadow-md"
            >
              Generate Card
            </button>
          </form>

          {/* Alt logo */}
          <div className="mt-14 opacity-80 hover:opacity-100 transition">
            <img
              src="/novastro-logo.png"
              alt="Novastro Logo"
              className="mx-auto w-32"
            />
          </div>
        </>
      ) : (
        <ChampionCard username={username} data={data} />
      )}
    </main>
  )
}
