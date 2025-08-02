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
    <div id="card" className="card-wrapper w-full max-w-md text-center">
      <a
        href="https://x.com/traderibo123"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-cyan-300 font-bold text-lg"
      >
        @{username}
      </a>

      <h2 className="text-cyan-400 font-semibold text-md mt-1 mb-4">NOVASTRO CHAMPION</h2>

      <table className="table-auto text-sm text-left mx-auto mb-4">
        <thead>
          <tr className="text-gray-400">
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

      <div className="flex flex-col items-center gap-2 mt-4">
        <Image src="/novastro-logo.png" alt="Novastro Logo" width={60} height={60} />
        <p className="text-cyan-300 font-semibold text-sm">CHAMPION OF NOVASTRO</p>
      </div>

      <button
        className="download-btn"
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

      <p className="footer-text">Crafted by @traderibo123</p>
    </div>
  )
}
