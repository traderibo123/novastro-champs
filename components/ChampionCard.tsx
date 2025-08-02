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
      {/* Kullanıcı Adı */}
      <div className="absolute top-[40px] left-[280px] text-xl font-bold text-white">
        @{username}
      </div>

      {/* Sıralamalar ve Unvanlar */}
      {[
        { time: '7d', top: 125 },
        { time: '30d', top: 180 },
        { time: '3m', top: 235 },
        { time: '6m', top: 290 },
        { time: '12m', top: 345 }
      ].map(({ time, top }) => (
        <div key={time} className="absolute flex gap-6" style={{ top: `${top}px`, left: '420px' }}>
          <span className="w-10">{data[time]?.rank ?? '-'}</span>
          <span>{data[time]?.title ?? '-'}</span>
        </div>
      ))}

      {/* Novastro logosu */}
      <div className="absolute bottom-[100px] left-[100px]">
        <Image src="/novastro-logo.png" alt="Novastro Logo" width={60} height={60} />
      </div>

      {/* Kart altı yazı */}
      <div className="absolute bottom-[40px] w-full text-center text-xs text-gray-400 italic">
        Crafted by @traderibo123
      </div>

      {/* PNG İndir Butonu */}
      <button
        className="absolute bottom-[40px] right-[60px] px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold shadow"
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
    </div>
  )
}
