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
      <div className="absolute top-[30px] left-[255px] text-2xl font-bold text-white">
        @{username}
      </div>

      {/* Zaman dilimlerine göre Rank + Title */}
      {[
        { time: '7d', top: 138 },
        { time: '30d', top: 192 },
        { time: '3m', top: 247 },
        { time: '6m', top: 302 },
        { time: '12m', top: 357 },
      ].map(({ time, top }) => (
        <div key={time} className="absolute flex gap-8 text-[16px]" style={{ top: `${top}px`, left: '430px' }}>
          <span className="w-10 font-semibold">{data[time]?.rank ?? '-'}</span>
          <span className="w-56">{data[time]?.title ?? '-'}</span>
        </div>
      ))}

      {/* PNG İndir Butonu */}
      <button
        className="absolute bottom-[60px] right-[60px] px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold shadow"
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
      <div className="absolute bottom-[20px] w-full text-center text-xs text-gray-400 italic">
        Crafted by <a href="https://x.com/traderibo123" className="hover:underline">@traderibo123</a>
      </div>
    </div>
  )
}
