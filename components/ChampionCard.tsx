
import Image from 'next/image'

interface RankingData {
  [duration: string]: {
    rank: number | null
    title: string
  }
}

export default function ChampionCard({ username, data }: { username: string, data: RankingData }) {
  const timeframes = ['7d', '30d', '3m', '6m', '12m']

  return (
    <div id="card" className="flex flex-col items-center p-6 text-white bg-[#0c1b2a] rounded-xl shadow-lg max-w-md mx-auto">
      <a href="https://x.com/traderibo123" target="_blank" rel="noopener noreferrer">
        <h1 className="text-xl font-bold mb-2 hover:underline text-cyan-300">@{username}</h1>
      </a>
      <h2 className="text-lg font-semibold text-cyan-400 mb-4">NOVASTRO CHAMPION</h2>

      <table className="table-auto text-sm text-left border-separate border-spacing-y-2 mb-4">
        <thead>
          <tr>
            <th className="pr-4">Time</th>
            <th className="pr-4">Rank</th>
            <th className="pr-4">Title</th>
          </tr>
        </thead>
        <tbody>
          {timeframes.map((tf) => (
            <tr key={tf}>
              <td className="pr-4">{tf}</td>
              <td className="pr-4">{data[tf]?.rank ?? '-'}</td>
              <td className="pr-4">{data[tf]?.title ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-2">
        <Image src="/novastro-logo.png" alt="Novastro Logo" width={60} height={60} />
        <p className="text-cyan-300 font-semibold mt-2">CHAMPION OF NOVASTRO</p>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded"
        onClick={() => {
          const element = document.getElementById('card')
          if (!element) return
          import('html2canvas').then((html2canvas) => {
            html2canvas.default(element).then((canvas) => {
              const link = document.createElement('a')
              link.download = 'novastro_champion_card.png'
              link.href = canvas.toDataURL()
              link.click()
            })
          })
        }}
      >
        Download Card as PNG
      </button>

      <p className="text-xs text-gray-400 mt-4">Crafted by @traderibo123</p>
    </div>
  )
}
