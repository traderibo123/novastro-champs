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
      className="w-[1152px] h-[1152px] relative bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/template.png')" }} // Görsel /public/template.png olmalı
    >
      {/* Kullanıcı adı */}
      <div className="absolute top-[100px] left-[460px] text-3xl font-bold text-white">
        @{username}
      </div>

      {/* Zaman dilimi verileri */}
      {[
        { time: '7d', top: 305 },
        { time: '30d', top: 390 },
        { time: '3m', top: 480 },
        { time: '6m', top: 570 },
        { time: '12m', top: 660 },
      ].map(({ time, top }) => (
        <div
          key={time}
          className="absolute flex gap-12 text-[20px] font-medium"
          style={{ top: `${top}px`, left: '645px' }}
        >
          <span className="w-12 text-right">{data[time]?.rank ?? '-'}</span>
          <span className="w-72">{data[time]?.title ?? '-'}</span>
        </div>
      ))}

      {/* PNG İndir Butonu */}
      <button
        className="absolute bottom-[80px] right-[80px] px-5 py-3 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold shadow text-lg"
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
      <div className="absolute bottom-[30px] w-full text-center text-sm text-gray-400 italic">
        Crafted by <a href="https://x.com/traderibo123" className="hover:underline">@traderibo123</a>
      </div>
    </div>
  )
}
