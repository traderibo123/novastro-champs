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
      <div className="absolute top-[35px] left-[240px] text-2xl font-bold text-white">
        @{username}
      </div>

      {/* Başlık */}
      <div className="absolute top-[85px] left-[190px] text-3xl font-extrabold text-white tracking-wide">
        NOVASTRO CHAMPION
      </div>

      {/* Zaman dilimlerine göre Rank + Title (pozisyonlanmış şekilde) */}
      {[
        { time: '7d', top: 140 },
        { time: '30d', top: 195 },
        { time: '3m', top: 250 },
        { time: '6m', top: 305 },
        { time: '12m', top: 360 },
      ].map(({ time, top }) => (
        <div key={time} className="absolute flex gap-6 text-[15px]" style={{ top: `${top}px`, left: '430px' }}>
          <span className="w-10 font-semibold">{data[time]?.rank ?? '-'}</span>
          <span className="w-56">{data[time]?.title ?? '-'}</span>
        </div>
      ))}

      {/* Novastro logosu */}
      <div className="absolute bottom-[120px] left-[95px]">
        <Image src="/novastro-logo.png" alt="Novastro Logo" width={60} height={60} />
      </div>

      {/* CHAMPION OF NOVASTRO yazısı */}
      <div className="absolute bottom-[120px] left-[180px] text-xl font-semibold text-white tracking-wide">
        CHAMPION OF NOVASTRO
      </div>

      {/* Download butonu */}
      <button
        className="absolute bottom-[50px] right-[60px] px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold shadow"
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
