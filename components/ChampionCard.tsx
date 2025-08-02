import Image from 'next/image'

interface RankingData {
  [duration: string]: {
    rank: number | null
    title: string
  }
}

export default function ChampionCard({ username, data }: { username: string, data: RankingData }) {
  return (
    <div
      id="card"
      className="w-[768px] h-[768px] relative bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/template.png')" }}
    >
      {/* Kullanıcı adı */}
      <div className="absolute top-[66px] left-[310px] text-xl font-bold">
        @{username}
      </div>

      {/* Rank ve Title Verileri */}
      {[
        { time: '7d', top: 220 },
        { time: '30d', top: 285 },
        { time: '3m', top: 350 },
        { time: '6m', top: 415 },
        { time: '12m', top: 480 },
      ].map(({ time, top }) => (
        <div
          key={time}
          className="absolute flex gap-8 text-[18px] font-medium"
          style={{ top: `${top}px`, left: '435px' }}
        >
          <span className="w-10 text-right">{data[time]?.rank ?? '-'}</span>
          <span className="w-52">{data[time]?.title ?? '-'}</span>
        </div>
      ))}

      {/* Download PNG Butonu */}
      <button
        className="absolute bottom-[60px] right-[60px] px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold shadow text-sm"
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
        Download PNG
      </button>

      {/* Footer */}
      <div className="absolute bottom-[25px] w-full text-center text-xs text-gray-400 italic">
        Crafted by <a href="https://x.com/traderibo123" className="hover:underline">@traderibo123</a>
      </div>
    </div>
  )
}
